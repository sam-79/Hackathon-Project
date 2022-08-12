import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Notifications from '../components/Notifications';
import Dashboard from '../components/Dashboard';
import LiveWeather from '../components/LiveWeather';
import IMDForecast from "../components/IMDForecast";
import FloodForecast from "../components/FloodForecast";
import SafetyTips from "../components/SafetyTips";
import EmergencyContacts from "../components/EmergencyContact";


const Stack = createStackNavigator();


export default function Home() {


    // var markersArray = [];

    // const mapCircle = () => {
    //     for (let i in flood_data) {
    //         const district = i;
    //         const location = `${district} ${flood_data[i].State}`
    //         const condition = flood_data[i].Flood_Condition
    //         const latlon = flood_data[i].chords
    //         markersArray.push({ place: location, chords: latlon, condition: condition })
    //         // console.log(markersArray)
    //     }
    // }

    return (
        // <MapView style={styles.map} region={{
        //     latitude: 20.5937,
        //longitude: 78.9629,
        //     latitudeDelta: 25,
        //     longitudeDelta: 25,
        // }}>

        //     <MapView.Circle
        //   center={{
        //     latitude: 20.5937,
        //     longitude: 78.9629,
        //   }}
        //   radius={20000}
        //   fillColor={"red"}
        // />

        //     {mapCircle()}


        //     {markersArray.map((marker, index) => {

        //         return (
        //             <Circle key={index} center={{ latitude: marker.chords.latitude, longitude: marker.chords.longitude,
        //                 latitudeDelta: 5,
        //                 longitudeDelta: 5, }} radius={20000} fillColor={"#d320208a"}>
        //                 <Marker key={index} coordinate={{ latitude: marker.chords.latitude, longitude: marker.chords.longitude }} fillColor={"red"}>


        //                 <Callout>
        //                     <View>
        //                         <Text>City: {marker.place}</Text>
        //                         <Text>Condition: {marker.condition}</Text>
        //                     </View>
        //                 </Callout>


        //                 </Marker>
        //             </Circle>
        //         )
        //     })}


        // </MapView>




        <Stack.Navigator
            initialRouteName="Dashboard"

            screenOptions={{
                headerShown: false,
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#007aff', borderBottomStartRadius: 30, borderBottomEndRadius: 30 },
                headerTitleAlign: 'center',
                headerStatusBarHeight: 0,
                headerRight: (prop) => { return (<Pressable onPress={(prop) => console.log(prop)} style={{ marginRight: 15 }} ><View><MaterialCommunityIcons name="bell-outline" color={'white'} size={25} /></View></Pressable>) },
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: 'SIH',
                }}
            />

            <Stack.Screen name='Notifications'
                component={Notifications}
            />

            <Stack.Screen name='LiveWeather'
                component={LiveWeather}
            />

            <Stack.Screen name='IMDForecast'
                component={IMDForecast}
            />

            <Stack.Screen name='FloodForecast'
                component={FloodForecast}
            />

            <Stack.Screen name='SafetyTips'
                component={SafetyTips}
            />

            <Stack.Screen name='EmergencyContacts'
                component={EmergencyContacts}
            />
        </Stack.Navigator>
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
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        width: "100%",
        height: "100%",
    },
});
