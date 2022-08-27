import React, { useRef, useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';


//import Contexts
import { CrowdContext } from '../context/CrowdSource';
import { AuthContext } from '../context/AuthContext';

import {CustomCrowdCallout} from './CustomCallout';

function Contribute04() {
    //Refenence to MapView Component
    const mapRef = useRef(null);

    // bottom sheet variable
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '60%'], []);


    const { getCrowdData, crowdData, getCrowdDataById } = useContext(CrowdContext);
    const { userToken, setUserToken } = useContext(AuthContext);

    
    const [markerData, setMarkerData] = useState(null)


    useEffect(() => {
        if (crowdData != null) {
            let coords = new Array();
            crowdData.map((data) => {
                coords.push({ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) })
            })
            mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } })
        }
    }, [crowdData])

    const getData = () => {
        userToken.token.access ? getCrowdData(userToken.token.access)
            : (Alert.alert("Token Expired", 'User LogOut', [
                {
                    text: "Okay",
                    onPress: () => setUserToken(null)
                },
            ], { cancelable: false }))
    }

    // const handleSheetChanges = async (index) => {
    //     if (userToken.token.access || selectedMarker) {
    //         console.log(userToken.token.access, selectedMarker)

    //         await getCrowdDataById(userToken.token.access, selectedMarker).then(
    //             (data) => { setMarkerData(data) }
    //         ).catch((e) => Alert.alert('Error', String(e)))
    //     }
    //     console.log("asas", index)
    // }

    return (
        <View style={styles.container}>

            <MapView ref={mapRef} style={styles.map} initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25,
                longitudeDelta: 25
            }} provider={"google"} mapPadding={{ edgePadding: { top: 10, right: 10, bottom: 10, left: 10 } }}
                onMapReady={() => getData()}
            >

                {
                    crowdData ?
                        crowdData.map((data, index) => {
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
                                        setMarkerData(await getCrowdDataById(userToken.token.access, e.nativeEvent.id))
                                        bottomSheetRef.current?.snapToIndex(0)
                                    }}
                                />
                            )
                        })
                        : getData()
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
                backgroundStyle={styles.contentContainer}
                style={{ margin: 5 }}
            >
                {/* <View style={styles.contentContainer}> */}
                    <CustomCrowdCallout data={markerData} />
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

});


export default Contribute04