import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { DJANGO_API_ENDPOINT } from "@env";




function SafetyTips() {

    //variables for drop down Picker
    const [open, setOpen] = useState(false);
    const [category, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'All', value: '' },
        { label: 'Before Flood', value: 'Before Flood' },
        { label: 'During Flood', value: 'During Flood' },
        { label: 'After Flood', value: 'After Flood' },
    ]);

    const [tipsResp, setTipsResp] = useState(null);
    const [isloading, setIsLoading] = useState(false);

    const getTipsData = async () => {
        setIsLoading
        
        (true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        // console.log(`${DJANGO_API_ENDPOINT}/api/floodmanagement/tips/?search=${(category) ? category : ''}`)

        fetch(`${DJANGO_API_ENDPOINT}/api/floodmanagement/tips/?search=${(category) ? category : ''}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setTipsResp(result)
                setIsLoading(false)

                // console.log(result)
            })
            .catch(error => {
                setIsLoading(false)

                Alert.alert('Error', `${error}`)
            });
    }


    useEffect(() => {
        getTipsData()
    }, [])





    const InfoCard = ({ item }) => {
        return (

            // <View style={{ borderWidth: 1, marginVertical: 10, height: 250, justifyContent: 'center', alignItems: 'center', borderRadius: 20,  }}>

            // <LinearGradient
            //     // Background Linear Gradient
            //     colors={['#ffffff', '#6DD5FA', '#2980b9']}
            //     style={[styles.container, { width: "100%", borderWidth: 1, marginVertical: 10, height: 250, justifyContent: 'center', alignItems: 'center', borderRadius: 20, }]}
            // >
            //     <Text>{data.tips_category}</Text>
            //     {/* {console.log(data.item.image)} */}
            //     <Image resizeMode={"contain"} source={{ uri: data.item.image }} style={{ height: 200, width: "100%" }} />


            //     <Text>Do's and Don't Description</Text>
            // </LinearGradient>

            <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center', }}>
                <Image resizeMode={"contain"} source={{ uri: item.image }} style={{width: "100%",height:300, borderRadius:25 ,borderWidth:1,borderColor:'black' }} />
            </View >
        )
    }


    return (
        <View style={styles.container}>


            <View style={{ marginVertical: 10, }}>
                <DropDownPicker
                    placeholder="Choose Category"
                    open={open}
                    value={category}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode="FLATLIST"
                    onChangeValue={data => getTipsData()}

                />

            </View>

            <View>
                <ActivityIndicator size={30} animating={isloading} />
            </View>

            <View style={{marginBottom:100}}>

                <FlatList
                    data={tipsResp}
                    renderItem={InfoCard}
                    keyExtractor={item => { item.id }}
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    }
})

export default SafetyTips;
