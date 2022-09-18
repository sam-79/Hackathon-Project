import { View, Text, StyleSheet, Pressable, FlatList, Modal, TextInput, Button, Alert, SafeAreaView, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

// import { selectContactPhone } from 'react-native-select-contact';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SOS = () => {

    const [sosContacts, setSosContacts] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    useEffect(() => {
        getSavedContacts()
    }, [])



    const renderItem = ({ item }) => {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                margin: 10,
                justifyContent: 'center',
            }}>

                <View style={{
                    elevation: 2,
                    shadowColor: '#000',
                    shadowRadius: 5,
                    shadowOpacity: 0.3,
                    padding: 10,
                    backgroundColor: "#fff",
                    borderRadius: 5,
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
        val.push({ 'name': name, 'number': contactNumber, 'id': `${contactNumber}?${name}` })

        setName('');
        setContactNumber('');

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

    async function getLocation() {
        let value = await Location.getCurrentPositionAsync({})

        if (value) {
            // let data = { 'lat': value.coords.latitude, 'lon': value.coords.longitude };
            return `I am in emergency, please help me.\n Location: https://www.google.com/maps/dir//${value.coords.latitude},${value.coords.longitude}`
        }else{
            return "Location Denied"
        }
    }

    const sendMessage = async () => {
        let sosValue;
        let mobileNumbers = '';
        try {
            const jsonValue = await AsyncStorage.getItem('sosContact');
            sosValue = (jsonValue != null) ? JSON.parse(jsonValue) : null;

            for (let i of sosValue) {
                mobileNumbers+=`;${i.number}`
            }
            let msgBody = await getLocation();
            console.log(msgBody)

            let url = `sms:${mobileNumbers}?&body=${msgBody}`;
            console.log(url)
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(`Error`, 'Unable perform the operation.');
            }


        } catch (e) {
            Alert.alert('Error', `${e}`)
        }

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
                onShow={() => {
                    setName('')
                    setContactNumber('')
                }}


            >
                <View style={{
                }}>
                    <View style={{
                        marginVertical: 50,
                        marginHorizontal: 10,
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





            <View style={{ width: '100%' }}>

                <FlatList
                    data={sosContacts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

            </View>

            <View style={{ position: 'absolute', bottom: 1, width: '90%', }}>

                <Pressable style={{ backgroundColor: "blue", padding: 10, borderRadius: 10, marginVertical: 5 }}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ textAlign: 'center', color: "white", fontSize: 20 }}>
                        Add Contact
                    </Text>
                </Pressable>

                <Pressable style={{ backgroundColor: "red", padding: 10, borderRadius: 10, marginVertical: 5 }}
                    onPress={sendMessage}
                >
                    <Text style={{ textAlign: 'center', color: "white", fontSize: 30 }}>
                        Send message
                    </Text>
                </Pressable>

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