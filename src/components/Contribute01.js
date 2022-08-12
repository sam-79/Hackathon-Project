import React, { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Image, Alert, Modal, ActivityIndicator } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { CrowdContext } from '../context/CrowdSource';
import { AuthContext } from '../context/AuthContext';

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { Camera, CameraType } from 'expo-camera';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import * as ImagePicker from 'expo-image-picker';
function Contribute01() {
    //contexts for getting userToken and sending CrowdSource Post request
    const { userToken } = useContext(AuthContext);
    const { sendCrowdData, isLoading } = useContext(CrowdContext);

    //variables for drop down Picker
    const [open, setOpen] = useState(false);
    const [category, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Flood', value: 'Flood' },
        { label: 'Roads', value: 'Roads' },
        { label: 'Landslide', value: 'Landslide' },
        { label: 'Safehouse', value: 'Safehouse' }
    ]);
    //variables for storing user entered data 
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [description, setDescription] = useState(null);



    //   variables for MOdal Visibility and loaction
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);

    // for camera usage
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [capturedImage, setCapturedImage] = useState(null);
    const cameraRef = useRef(null);


    //function to get User current location coordinates
    async function getCurrentLocation(params) {
        await Location.getCurrentPositionAsync({}).then((value) => {
            setLocation(value);

            mapRef.current.fitToCoordinates([{ latitude: value.coords.latitude, longitude: value.coords.longitude }],
                { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } });

            setLongitude(String(value.coords.longitude))
            setLatitude(String(value.coords.latitude))

        }).catch(e => console.log(e));
    }


    const [image, setImage] = useState(null);

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //         exif: true,
    //     });

    //     //console.log(result);

    //     // if (!result.cancelled) {
    //     //     setImage(result);
    //     // }

    //     if (result.didCancel) {
    //         Alert.alert("Error", "User Cancel Image Picker");
    //     } else if (result.error) {
    //         Alert.alert("Error", `Image Picker Error ${result.error}`);
    //     } else if (result.customButton) {
    //         console.log("custombtn")
    //     } else if (!result.cancelled) {
    //         setImage(result);
    //     }


    // };

    useEffect(() => {
        getCurrentLocation()
    }, [])

    // Getting Permission to access Camera 
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }



    return (
        <View style={{ flex: 1 }}>

            {/* Modal for getting userLocation */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                onShow={getCurrentLocation}
            >

                <View style={[styles.container, { margin: 10 }]}>
                    <Pressable onPress={() => { setModalVisible(false) }} >
                        <View>
                            <MaterialCommunityIcons name='close-thick' size={40} />
                        </View>
                    </Pressable>
                    {
                        capturedImage !== null ?
                            (
                                <View style={{ flex: 1, justifyContent:'center',alignItems:'center'}}>
                                    <Image style={{ justifyContent: 'center', height: 300, width: 300 }}
                                        source={{ uri: capturedImage.uri }} />
                                    <View style={
                                        {
                                            height: 30, width: '100%', justifyContent: 'space-around', backgroundColor: 'yellow',
                                            flexDirection: 'row',margin:50
                                        }
                                    }>

                                        <Pressable onPress={() => {
                                            setCapturedImage(null);
                                        }} style={{ backgroundColor: "red", height: 20 }}>
                                            <Text>Retake</Text>
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            setImage(capturedImage)
                                            setModalVisible(false)
                                            setCapturedImage(null)
                                        }} style={{ backgroundColor: "red", height: 20 }}>
                                            <Text>Save</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )
                            : (
                                <Camera ref={cameraRef} style={{ flex: 1, height: "100%", width: "100%" }} type={cameraType}>
                                    <View style={
                                        {
                                            height: 30, width: '100%', position: 'absolute', bottom: 50, justifyContent: 'space-around', backgroundColor: 'yellow',
                                            flexDirection: 'row'
                                        }
                                    }>
                                        {/* <MaterialCommunityIcons name='refresh' color='#fff' size={30} /> */}
                                        <Pressable onPress={async () => {
                                            cameraRef.current.takePictureAsync({ base64: true })
                                                .then((img) => {
                                                    // cameraRef.current.pausePreview()
                                                    console.log("img cap")
                                                    console.log(img.uri)
                                                    setCapturedImage(img);

                                                }).catch(err => Alert.alert("error", `${err}`))
                                        }}>
                                            <Text>Capture</Text>
                                        </Pressable>

                                        <Pressable onPress={() => {
                                            setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back);
                                        }}>
                                            <Text>Flip</Text>
                                        </Pressable>

                                    </View>
                                </Camera>
                            )
                    }


                </View>

            </Modal>


            <MapView ref={mapRef} style={styles.map} initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25,
                longitudeDelta: 25
            }}>
                {location ? (<Marker key={'myLocation'} identifier={'myLocation'} coordinate={{
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
                padding: 20,
                backgroundColor: '#ffffff',
            }]}>
                <DropDownPicker
                    placeholder="Select Category"
                    open={open}
                    value={category}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode="FLATLIST"
                    style={{ elevation: 5, textAlign: "center" }}

                />

                <View style={{ elevation: 5, marginHorizontal: 20, marginTop: 20, width: "100%" }}>
                    <TextInput style={[styles.textinput, { textAlign: "center" }]} value={description} placeholder="Description" onChangeText={setDescription} />

                </View>

                <View style={{ elevation: 5, marginHorizontal: 20, width: "100%" }}>
                    {
                        image === null ?
                            <Pressable onPress={() => setModalVisible(true)} style={styles.textinput}>
                                <View>
                                    <Text style={{ textAlign: "center" }}>Capture Image</Text>
                                </View>
                            </Pressable>
                            :
                            <Pressable onPress={() => setModalVisible(true)} style={styles.textinput}>
                                <View>
                                    <Text style={{ textAlign: "center" }}>Recapture Image</Text>
                                </View>
                            </Pressable>
                    }
                </View>
            </View>

            <Pressable style={[styles.form, {
                bottom: 20,
                left: 50,
                right: 50,
                height: 40,
                backgroundColor: "red",
                borderRadius: 10
            }]} onPress={() => sendCrowdData(userToken.token.access, longitude, latitude, category, description, image)}>
                <View>
                    {
                        isLoading ?
                            <ActivityIndicator animating={isLoading} size="large" />
                            :
                            <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
                    }
                </View>
            </Pressable>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    inputArea: {
        width: '100%',
        marginVertical: 5
    },
    textinput: {
        height: 50,
        width: "100%",
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    form: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '##ffffff6e',
        position: 'absolute',
        borderRadius: 5,
        borderWidth: 1,
    },
    map: {
        height: '100%',
        width: '100%',
    }
});


export default Contribute01