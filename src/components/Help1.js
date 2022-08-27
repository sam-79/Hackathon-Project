import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, Modal, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

import { HelpContext } from '../context/HelpContext';
import { AuthContext } from '../context/AuthContext';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Help1() {

    //using HelpContext functions
    const {sendRequestData} = useContext(HelpContext);
    //using AuthContext functions
    const {userToken, setUserToken} = useContext(AuthContext);



    const [open, setOpen] = useState(false);
    const [TypeOfEmergency, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Flood', value: 'Flood' },
        { label: 'Medical Help', value: 'Medical Help' },
        { label: 'Food and Shelter', value: 'Food and Shelter' }
    ]);

    //variable to store location coordinates
    const [location, setLocation] = useState(null);

    async function getCurrentLocation(params) {
        await Location.getCurrentPositionAsync({}).then((value) => {
            setLocation(value);
        }).catch(e => console.log(e));
    }

    //Mpaview Reference
    const mapRef = useRef(null);

    useEffect(() => {
        getCurrentLocation()
    }, [])

    return (
        <View style={styles.container}>
            
            <MapView ref={mapRef} style={styles.map} initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25,
                longitudeDelta: 25
            }}>
                {location != null ? (<Marker key={'myLocation'} identifier={'myLocation'} coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 250,
                    longitudeDelta: 250
                }} draggable>
                    {
                        mapRef.current.fitToCoordinates([{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }], { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } })
                    }
                </Marker>) : console.log("location: null")
                }
            </MapView>

            <Pressable style={[styles.form, {
                top: 10,
                left: 50,
                right: 50,
                height: 40,
                borderRadius: 10
            }]}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                    <MaterialCommunityIcons name='map-marker' color={"red"} size={30} />

                    {location ?
                        <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
                            {location.coords.latitude},{location.coords.longitude}
                        </Text>
                        : <Text style={{ fontSize: 20, marginHorizontal: 20 }}>Current Location</Text>
                    }
                </View>
            </Pressable>



            <View style={[styles.form, {
                bottom: 70,
                left: 10,
                right: 10,
                padding: 20
            }]}>
                <DropDownPicker
                    placeholder="Select type of Emergency"
                    open={open}
                    value={TypeOfEmergency}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode="FLATLIST"
                    style={{ elevation: 5 }}

                />
            </View>

            <Pressable style={[styles.form, {
                bottom: 20,
                left: 50,
                right: 50,
                height: 40,
                backgroundColor: "red",
                borderRadius: 10
            }]} onPress={()=>sendRequestData(userToken.token.access, location.coords.latitude,location.coords.longitude,TypeOfEmergency)}>
                <View>
                    <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
                </View>
            </Pressable>

        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        textAlign: 'center',
        width: '100%',
        height: '10%',
        fontSize: 25
    },
    form: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        borderRadius: 5,
        borderWidth: 1,
    },
    btn: {
        marginTop: 30,
        backgroundColor: '#acbcd2'
    },
    map: {
        height: '100%',
        width: '100%',
    }

});

export default Help1