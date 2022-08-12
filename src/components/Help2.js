import React, { useContext, useEffect, useRef,useState } from 'react'
import { View, Text, StyleSheet, Alert,Pressable,ScrollView } from "react-native";

import MapView, { Marker, Callout } from 'react-native-maps';

import { AuthContext } from '../context/AuthContext';
import { HelpContext } from '../context/HelpContext'

import SwipeUpDown from "react-native-swipe-up-down";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Help2() {

    const { getRequestData, allRequestData, getRequestDataById } = useContext(HelpContext);
    const { userToken, setUserToken } = useContext(AuthContext);

    // useStates for Panel
    const swipeUpDownRef = useRef();
    const [currentMarker, setCurrentMarker] = useState(null);
    const [currentMarkerData, setCurrentMarkerData] = useState(null);

    const mapRef = useRef();

    useEffect(() => {
        if (userToken.token.access) {
            getRequestData(userToken.token.access);
        } else {
            Alert.alert("Logged Out", "Token expiry")
        }
    }, [5000])



    useEffect(() => {
        if (allRequestData != null) {
            let coords = new Array();
            allRequestData.map((data) => {
                coords.push({ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) })
            })
            mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } })
        }
    }, [allRequestData])




    return (
        <View>

            <MapView ref={mapRef} style={styles.map} initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25,
                longitudeDelta: 25
            }}>
                {
                    allRequestData != null ?
                        allRequestData.map((data, index) => {

                            return (
                                <Marker key={String(data.id)} identifier={String(data.id)} coordinate={{
                                    latitude: parseFloat(data.latitude),
                                    longitude: parseFloat(data.longitude)
                                }}
                                onPress={async (e) => {
                                    setCurrentMarkerData(await getRequestDataById(userToken.token.access, e.nativeEvent.id))
                                    swipeUpDownRef.current.showFull()
                                }} />
                            )
                        })
                        :
                        getRequestData(userToken.token.access)
                }
            </MapView>

            <Pressable onPress={() => {
                userToken.token.access ? getRequestData(userToken.token.access)
                    :
                    (
                        Alert.alert("Token Expiry", "User Log Out", [
                            {
                                text: "Okay",
                                onPress: () => setUserToken(false),
                                style: "cancel",
                            },
                        ],
                            {
                                cancelable: false
                            }
                        )
                    )
            }} style={{ position: 'absolute', top: 20, right: 20 }}>
                <MaterialCommunityIcons name="refresh" color={"black"} size={26} />
            </Pressable>

            <SwipeUpDown
                ref={swipeUpDownRef}
                itemFull={(close) => (
                    <ScrollView>
                        {/** To use scrollview please add TouchableWithoutFeedback */}

                        <View style={styles.container}>
                            <Pressable onPress={close}>
                                <Text>Close</Text>
                            </Pressable>
                            <View>
                                {
                                    currentMarkerData != null ?
                                        <View style={{ paddingVertical: 50, paddingHorizontal: 20 }}>
                                            <Text>
                                                Owner: {currentMarkerData.owner}
                                            </Text>
                                            <Text>
                                                Category: {currentMarkerData.category}
                                            </Text>
                                            <Text>
                                                Created At: {currentMarkerData.created_at}
                                            </Text>
                                            <Text>
                                                Latitude: {currentMarkerData.latitude}
                                            </Text>
                                            <Text>
                                                Longitude: {currentMarkerData.longitude}
                                            </Text>
                                            {/* <Image
                                                source={{ uri: currentMarkerData.image }}
                                                style={{ height: 200 }}
                                            /> */}
                                        </View>
                                        : console.log("no data")
                                }
                            </View>
                        </View>
                    </ScrollView>
                )}
                // onShowFull={async() => console.log(await getCrowdDataById(userToken.token.access, "4"))}
                animation="linear"
                extraMarginTop={200}
                disablePressToShow={true}
                style={{ backgroundColor: "gray", borderWidth: 1 }}
            />

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
    map: {
        height: '100%',
        width: '100%',
    },
    card: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#fff",
        // position: "absolute"
    },

});

export default Help2