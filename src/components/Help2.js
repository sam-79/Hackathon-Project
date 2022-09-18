


import React, { useRef, useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';


//import Contexts
import { AuthContext } from '../context/AuthContext';
import { HelpContext } from '../context/HelpContext'

import {CustomHelpCallout} from './CustomCallout';


function Help2() {

    const mapRef = useRef();

    // bottom sheet variable
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '30%'], []);

    const { getRequestData, allRequestData, getRequestDataById } = useContext(HelpContext);
    const { userToken, setUserToken } = useContext(AuthContext);

    const [markerData, setMarkerData] = useState(null)

    // useEffect(() => {
    //     if (userToken.token.access) {
    //         getRequestData(userToken.token.access);
    //     } else {
    //         Alert.alert("Logged Out", "Token expiry")
    //     }
    // }, [5000])


    useEffect(() => {
        if (allRequestData != null) {
            let coords = new Array();
            allRequestData.map((data) => {
                coords.push({ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) })
            })
            mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } })
        }
    }, [allRequestData])


    const getData = () => {
        userToken.token.access ? getRequestData(userToken.token.access)
            : (Alert.alert("Token Expired", 'User LogOut', [
                {
                    text: "Okay",
                    onPress: () => setUserToken(null)
                },
            ], { cancelable: false }))
    }




    return (
        <View>

            <MapView ref={mapRef} style={styles.map} initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25,
                longitudeDelta: 25
            }} provider={"google"} mapPadding={{ edgePadding: { top: 10, right: 10, bottom: 10, left: 10 } }}
                onMapReady={() => getData()}
            >
                {
                    allRequestData != null ?
                        allRequestData.map((data, index) => {

                            return (
                                <Marker
                                    key={String(data.id)} identifier={String(data.id)}
                                    coordinate={{
                                        latitude: parseFloat(data.latitude),
                                        longitude: parseFloat(data.longitude)
                                    }}
                                    onPress={async (e) => {
                                        //setCurrentMarkerData(await getCrowdDataById(userToken.token.access, e.nativeEvent.id))
                                        // swipeUpDownRef.current.showFull()
                                        setMarkerData(await getRequestDataById(userToken.token.access, e.nativeEvent.id))
                                        bottomSheetRef.current?.snapToIndex(0)
                                    }}
                                />
                            )
                        })
                        :
                        getData()
                }
            </MapView>


            <Pressable onPress={() => { getData() }} style={{ position: 'absolute', top: 20, right: 20 }}>
                <MaterialCommunityIcons name="refresh" color={"black"} size={26} />
            </Pressable>

            {/* bottom sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                style={{ margin: 5 }}
            >
                {/* <View style={styles.contentContainer}> */}
                    <CustomHelpCallout data={markerData} />
                {/* </View> */}
            </BottomSheet>

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