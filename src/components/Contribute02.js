import React, { useState, useRef, useContext, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Button, Image, Modal, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';


import { CrowdContext } from '../context/CrowdSource';
import { AuthContext } from '../context/AuthContext';

import MapView, { Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import BottomSheet from '@gorhom/bottom-sheet';
import CustomCallout from './CustomCallout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Contribute02() {
    const { getCrowdData, crowdData, getCrowdDataById } = useContext(CrowdContext);
    const { userToken } = useContext(AuthContext);

    //use State for Panel
    const [currentMarker, setCurrentMarker] = useState(null);
    const [currentMarkerData, setCurrentMarkerData] = useState(null);


    // var resp = new Array();
    const mapRef = useRef(null);

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);


    // const animateMapToMarker = () => {
    //     if (crowdData != null) {
    //         let coords = new Array();
    //         crowdData.map((data) => {
    //             coords.push({ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) })
    //         })
    //         mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } })
    //     }
    // }

    useEffect(() => {
        if (crowdData != null) {
            let coords = new Array();
            crowdData.map((data) => {
                coords.push({ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) })
            })
            mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } })
        }
    }, [crowdData,''])



    return (
        <View style={styles.container}>

            <MapView ref={mapRef} style={styles.map} initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25,
                longitudeDelta: 25
            }}>
                {
                    crowdData ?
                        crowdData.map((data, index) => {
                            return (
                                <Marker key={String(data.id)} identifier={String(data.id)} coordinate={{
                                    latitude: parseFloat(data.latitude),
                                    longitude: parseFloat(data.longitude)
                                }}
                                    onPress={async (e) => {
                                        //setCurrentMarkerData(await getCrowdDataById(userToken.token.access, e.nativeEvent.id))
                                        // swipeUpDownRef.current.showFull()
                                        setSelectedMarker(e.nativeEvent.id)
                                        bottomSheetRef.current?.snapToIndex(0)
                                    }} />
                            )
                        })
                        : getCrowdData(userToken.token.access)
                }

            </MapView>
            {/* < title="Refresh" onPress={() => getCrowdData(userToken.token.access)} style={{}} /> */}
            <Pressable onPress={() => {
                userToken.token.access ? getCrowdData(userToken.token.access)
                    :
                    getCrowdData()
            }} style={{ position: 'absolute', top: 20, right: 20 }}>
                <MaterialCommunityIcons name="refresh" color={"black"} size={26} />
            </Pressable>


            {/* bottom sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                backgroundStyle={styles.contentContainer}
            >
                <View style={styles.contentContainer}>
                    <CustomCallout data={currentMarkerData} />
                </View>
            </BottomSheet>


        </View >
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
        width:'100%'
    },

});

export default Contribute02
