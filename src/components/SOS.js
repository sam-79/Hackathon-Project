import { View, Text, StyleSheet, Pressable, FlatList, Modal, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { selectContactPhone } from 'react-native-select-contact';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SOS = () => {

    const [sosContacts, setSosContacts] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    useEffect(()=>{
        getSavedContacts()
    },[])



    // const [savedContacts, setSavedContact] = useState(null);


    const renderItem = ({ item }) => {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                margin: 10,
                justifyContent:'center',
            }}>

                <View style={{
                    elevation: 2,
                    shadowColor: '#000',
                    shadowRadius: 5,
                    shadowOpacity: 0.3,
                    padding: 10,
                    backgroundColor: "#fff",
                    borderRadius:5,
                    borderWidth: 1,
                }}>
                    <Text>{item.name}</Text>
                    <Text>{item.number}</Text>

                </View>
            </View>
        )
    }





    const getSavedContacts = async () => {

        try {
            let sosContacts = await AsyncStorage.getItem("sosContact");
            sosContacts = JSON.parse(sosContacts);

            if (sosContacts) {
                setSosContacts(sosContacts);
            }

        } catch (e) {
            console.log(`error ${e}`);

        }
    }

    const addContact = async () => {
        let val = sosContacts;
        val.push({ 'name': name, 'number': contactNumber, 'id': `${contactNumber}=${name}` })
        
        try {
            let jsonVal = JSON.stringify(val)
            await AsyncStorage.setItem('sosContact', jsonVal, () => {
                setSosContacts(val);
            })

        } catch (e) {
            Alert.alert("Error", `Error at saving data ${e}`);
        }

        setModalVisible(false)
    }


    return (
        <SafeAreaView style={styles.container}>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
                onShow={()=>{
                    setName('')
                    setContactNumber('')
                }}


            >
                <View style={{
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>



                        <Pressable onPress={() => {
                            setModalVisible(false);
                        }} >
                            <View>
                                <MaterialCommunityIcons name='close-thick' size={40} />
                            </View>
                        </Pressable>


                        <TextInput
                            style={{
                                color: "black",
                                fontWeight: "bold",
                                textAlign: "center",
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                width: '100%',
                                margin: 5
                            }}
                            onChangeText={(text) => { setName(text) }}
                            value={name}
                            placeholder="Name"
                        />

                        <TextInput
                            style={{
                                color: "black",
                                fontWeight: "bold",
                                textAlign: "center",
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                width: '100%',
                                margin: 5
                            }}
                            onChangeText={(text) => { setContactNumber(text) }}

                            value={contactNumber}
                            placeholder="Contact Number"
                            keyboardType="numeric"
                        />


                        <Button title='Save Contact' onPress={() => {
                            addContact()
                        }} />
                    </View>
                </View>
            </Modal>



            <Pressable style={{ backgroundColor: "blue", marginVertical: 10, padding: 10, width: '90%', borderRadius: 10 }}
                onPress={() => setModalVisible(true)}
            >
                <Text style={{ textAlign: 'center', color: "white", fontSize: 20 }}>
                    Add Contact
                </Text>
            </Pressable>

            <Pressable style={{ backgroundColor: "red", marginVertical: 10, padding: 10, width: '90%', borderRadius: 10 }}
                onPress={() => { return (Alert.alert('Success', "Alert message is send")) }}
            >
                <Text style={{ textAlign: 'center', color: "white", fontSize: 30}}>
                    Send message
                </Text>
            </Pressable>

            <View style={{width:'100%' }}>

                <FlatList
                    data={sosContacts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',

    },
})
export default SOS