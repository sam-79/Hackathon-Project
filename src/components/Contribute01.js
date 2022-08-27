import React, { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Image, Alert, Modal, ActivityIndicator, ImageBackground } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { CrowdContext } from '../context/CrowdSource';
import { AuthContext } from '../context/AuthContext';

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { Camera, CameraType } from 'expo-camera';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CameraModel from './CameraModel';


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
    useEffect(() => {
        getCurrentLocation()
    }, [])




    // // Getting Permission to access Camera 
    // useEffect(() => {
    //     (async () => {
    //         const { status } = await Camera.requestCameraPermissionsAsync();
    //         setHasCameraPermission(status === 'granted');
    //     })();
    // }, []);

    // if (hasCameraPermission === null) {
    //     return <View />;
    // }
    // if (hasCameraPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }


    // for camera usage
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    // const [cameraType, setCameraType] = useState(CameraType.back);
    // const [capturedImage, setCapturedImage] = useState(null);
    const [image, setImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false)
    const cameraRef = useRef(null);
    const [captureSize, setCaptureSize] = useState(60)


    const startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setHasCameraPermission(true)
            setCaptureSize(60)
        } else {
            Alert.alert('Access denied')
        }
    }

    const takePicture = async () => {
        if (!cameraRef) return

        setCaptureSize(0);
        await cameraRef.current.takePictureAsync({ quality: 0.5, skipProcessing: true })
            .then((photo) => {
                setCaptureSize(50);
                setPreviewVisible(true)
                setImage(photo)
            })
            .catch((err) => Alert.alert("Error", `${err}`))
    }

    const CameraPreview = ({ photo }) => {
        console.log('sdsfds', photo)
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <ImageBackground source={{ uri: photo.uri }} resizeMode="cover" style={{
                    flex: 1,
                    justifyContent: "center"
                }}>


                    <View style={{
                        position: 'absolute',
                        bottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        backgroundColor: '#979595',
                        width: '100%'
                    }}>
                        <Pressable onPress={() => {
                            setPreviewVisible(false);
                            setImage(null);
                        }}>
                            <Text style={{ fontSize: 25 }}>Retake</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            setModalVisible(false);
                        }}>
                            <Text style={{ fontSize: 25 }}>Save</Text>
                        </Pressable>
                    </View>
                </ImageBackground>


            </View>
        )
    }



    return (
        <View style={{ flex: 1 }}>

            {/* Modal for getting Camera Picture */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                onShow={() => startCamera()}
            >

                <View style={styles.container}>
                    <Pressable onPress={() => {
                        setPreviewVisible(false);
                        setImage(null);
                        setModalVisible(false);
                    }} >
                        <View>
                            <MaterialCommunityIcons name='close-thick' size={40} />
                        </View>
                    </Pressable>

                    {
                        hasCameraPermission ?
                            (previewVisible && image) ? (
                                <CameraPreview photo={image} />
                            ) :
                                (
                                    <Camera ref={cameraRef} style={{ width: '100%', flex: 1 }}>
                                        <Pressable style={{
                                            position: 'absolute',
                                            bottom: 20,
                                            width: "100%",
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }} onPress={() => takePicture()}>
                                            <MaterialCommunityIcons name='circle-slice-8' size={captureSize} color="white" />
                                        </Pressable>
                                    </Camera>
                                )
                            :
                            <View>
                                <Text>Camera Permission Not Allowed</Text>
                            </View>

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
                    placeholder="Select Data Category"
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
                                    <Text style={{ textAlign: "center" }}>Capture Image <MaterialCommunityIcons name="camera" size={20} /> </Text>
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



            {
                isLoading ?
                    <View>
                        <ActivityIndicator animating={isLoading} size="large" />
                    </View>
                    :
                    <Pressable style={[styles.form, {
                        bottom: 20,
                        left: 50,
                        right: 50,
                        height: 40,
                        backgroundColor: "#f93154",
                        borderRadius: 10
                    }]} onPress={() => sendCrowdData(userToken.token.access, longitude, latitude, category, description, image)}>
                        <View>
                            <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
                        </View>
                    </Pressable>
            }


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