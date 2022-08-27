import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import * as Location from 'expo-location';
import { CrowdContext } from '../context/CrowdSource';
import { AuthContext } from '../context/AuthContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import MapView, { Marker , Circle} from 'react-native-maps';

const RESPONSE = [
    {
        "id": 10,
        "created_at": "2022-08-15T16:03:38.412700Z",
        "latitude": "13.0728973000000000",
        "longitude": "80.2744058000000000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/flood1.jpeg",
        "description": "Whole Road is flooded .",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 11,
        "created_at": "2022-08-15T16:05:36.264295Z",
        "latitude": "13.0682274000000000",
        "longitude": "80.2684724000000000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/flood2.jpg",
        "description": "High Water level , so please stay in your houses .",
        "owner": "sameer.borkar.cs@ghrietn.raisoni.net"
    },
    {
        "id": 12,
        "created_at": "2022-08-15T16:07:09.063120Z",
        "latitude": "13.0671028000000000",
        "longitude": "80.2531579000000000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/flood3.jpg",
        "description": "Advised to stay inside your houses.",
        "owner": "pawan.sharnagate.cs@ghrietn.raisoni.net"
    },
    {
        "id": 13,
        "created_at": "2022-08-15T16:08:23.145522Z",
        "latitude": "13.1009829000000000",
        "longitude": "80.1498089000000000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/flood4.jpg",
        "description": "floods floods everywhere .",
        "owner": "shraddha@gmail.com"
    },
    {
        "id": 14,
        "created_at": "2022-08-15T16:15:18.932001Z",
        "latitude": "31.4339937000000000",
        "longitude": "76.8471347000000000",
        "category": "Landslide",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/landslide1.jpg",
        "description": "landslide is occured !!!!",
        "owner": "sameer.borkar.cs@ghrietn.raisoni.net"
    },
    {
        "id": 15,
        "created_at": "2022-08-15T16:16:11.872371Z",
        "latitude": "31.2808583000000000",
        "longitude": "76.7374468000000000",
        "category": "Landslide",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/landslide.jpg",
        "description": "landslice",
        "owner": "shraddha@gmail.com"
    },
    {
        "id": 16,
        "created_at": "2022-08-25T10:23:54.391941Z",
        "latitude": "19.0251146000000000",
        "longitude": "72.8505197000000000",
        "category": "Landslide",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/1661423028_19.0251146_72.8505197.jpg.jpg",
        "description": "Landslide",
        "owner": "sameer.borkar.cs@ghrietn.raisoni.net"
    },
    {
        "id": 19,
        "created_at": "2022-08-26T09:03:54.409160Z",
        "latitude": "72.8640619000000000",
        "longitude": "19.0550609000000000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/flood4_sKXPLMt.jpg",
        "description": "floods",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 20,
        "created_at": "2022-08-26T09:04:56.190206Z",
        "latitude": "19.0561262000000000",
        "longitude": "72.8654565000000000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst.JPG",
        "description": "test",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 21,
        "created_at": "2022-08-26T09:07:30.622339Z",
        "latitude": "19.0581945209909000",
        "longitude": "72.8653713406250000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_InUDl5l.JPG",
        "description": ",",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 22,
        "created_at": "2022-08-26T09:08:09.578295Z",
        "latitude": "19.0581482932697000",
        "longitude": "72.8660267150379000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_yFfOfVx.JPG",
        "description": "",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 23,
        "created_at": "2022-08-26T09:10:54.317575Z",
        "latitude": "19.0581945210118000",
        "longitude": "72.8669559772859000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_hRnJBfh.JPG",
        "description": ".",
        "owner": "pawan.sharnagate.cs@ghrietn.raisoni.net"
    },
    {
        "id": 24,
        "created_at": "2022-08-26T09:15:10.646946Z",
        "latitude": "19.0565857880095000",
        "longitude": "72.8645594588568000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_FF3nHKC.JPG",
        "description": "19.056585788009475, 72.86455945885676",
        "owner": "shraddha@gmail.com"
    },
    {
        "id": 25,
        "created_at": "2022-08-26T09:23:51.762269Z",
        "latitude": "19.0575011035276000",
        "longitude": "72.8651267979135000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_kNbhB5G.JPG",
        "description": "",
        "owner": "sameer.borkar.cs@ghrietn.raisoni.net"
    },
    {
        "id": 26,
        "created_at": "2022-08-26T09:27:15.879329Z",
        "latitude": "19.0590173726822000",
        "longitude": "72.8678265493070000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_EiayB0i.JPG",
        "description": "19.0590173726822, 72.86782654930698",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 27,
        "created_at": "2022-08-26T09:30:15.998772Z",
        "latitude": "19.0594334197169000",
        "longitude": "72.8678656761385000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_xXl4AzD.JPG",
        "description": "19.059433419716893, 72.86786567613848",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 28,
        "created_at": "2022-08-26T09:32:21.773761Z",
        "latitude": "19.0585735880281000",
        "longitude": "72.8668190333959000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_bjv1Sy3.JPG",
        "description": "19.058573588028118, 72.86681903339594",
        "owner": "shantanunimkar19@gmail.com"
    },
    {
        "id": 29,
        "created_at": "2022-08-26T09:35:11.933349Z",
        "latitude": "19.0578339442991000",
        "longitude": "72.8652050515967000",
        "category": "Flood",
        "image": "http://192.168.137.29:8000/media/crowdsourcing/single_ngp-cst_FGAmSV8.JPG",
        "description": "",
        "owner": "sameer.borkar.cs@ghrietn.raisoni.net"
    }
]

function Inundation({ navigation }) {

    //variables for storing user entered data 
    // const [longitude, setLongitude] = useState(null);
    // const [latitude, setLatitude] = useState(null);
    const [location, setLocation] = useState(null);
    // const [elevation, setElevation] = useState(null);
    const mapRef = useRef()


    // const { getCrowdData, crowdData, } = useContext(CrowdContext);
    // const { userToken } = useContext(AuthContext);

    // async function getElevation() {
    //     if (location) {
    //         await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${location.coords.latitude},${location.coords.longitude}`)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 setElevation(data);
    //                 // console.log(elevation)
    //             })
    //             .catch(err => Alert.alert("Error", `${err}`))
    //     }
    // }

    async function getCurrentLocation(params) {
        await Location.getCurrentPositionAsync({}).then((value) => {
            setLocation(value);
            // getElevation();
            // setLongitude(String(value.coords.longitude))
            // setLatitude(String(value.coords.latitude))

        }).catch(e => console.log(e));
    }



    useEffect(() => {
        getCurrentLocation()
    }, [])



    return (
        <View style={styles.container}>



            {/*

            <View style={{ margin: 10 }}>
                {
                    elevation
                        ?
                        <Text>Elevation: {elevation.results[0].elevation} metres</Text>
                        :
                        <Text>Waiting for location</Text>
                }
            </View>



            {
                true
                    ?
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10, backgroundColor: "#3aa84d", width: "100%", height: 150, marginTop: 50 }}>
                        <Text style={{ color: 'white', fontSize: 30 }}>
                            You are safe
                        </Text>

                        <MaterialCommunityIcons name='refresh' size={30} />
                    </View>
                    :
                    <View style={{ backgroundColor: "#c13232", width: "100%", height: 150, marginTop: 50 }}>
                        <Text style={{ color: 'white', fontSize: 30 }}>
                            You are not safe !
                        </Text>
                    </View>
            }

            <Pressable style={{ flexDirection: 'row', justifyContent: "space-around", width: "80%", borderWidth: 1, marginVertical: 10, padding: 5, paddingVertical: 20, borderRadius: 10, }}
                onPress={() => navigation.navigate("Safety Tips")} >
                <View>
                    <Text style={{ fontSize: 20 }}>Things to do next</Text>
                </View>
                <MaterialCommunityIcons name="arrow-right-bold-circle" size={30} />
            </Pressable>
        */}

            <MapView ref={mapRef} style={styles.map} initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25,
                longitudeDelta: 25
            }} >
                {
                    RESPONSE.map((data, index) => {
                        return (

                            <Circle radius={50} fillColor={'#edd528a3'} key={String(data.id)} identifier={String(data.id)} center={{
                                latitude: parseFloat(data.latitude),
                                longitude: parseFloat(data.longitude)
                            }} />
                        )
                    })
                }

            </MapView>


            <Pressable style={[styles.form, {
                position: 'absolute',
                height: 40,
                borderRadius: 10,
                borderWidth: 1,
                margin: 10,
                backgroundColor: '#ffffff90'
            }]} onPress={() => { getCurrentLocation() }}>
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
        </View>
    )
}

export default Inundation;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    map: {
        height: '100%',
        width: '100%',
    }
}
)