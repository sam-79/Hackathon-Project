import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';


function LiveWeather({ navigation }) {

    useFocusEffect(
        useCallback(() => {
            console.log('Screen was focused');
            // Do something when the screen is focused
            getLocation();

            return () => {
                console.log('Screen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, []));

    const [coordinates, setCoordinates] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);


    async function getLocation() {
        let value = await Location.getCurrentPositionAsync({})

        if (value) {

            let data = { 'lat': value.coords.latitude, 'lon': value.coords.longitude };
            setCoordinates(data);
            
            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=ff78ba3dd77bfeb9345ba49644842507`);

            console.log(response.status); // 200
            console.log(response.statusText); // OK

            if (response.status === 200) {
                let data = await response.json();
                console.log(data);
                setWeatherData(data);
                setLoading(false);
                return !loading;

            } else {
                return !loading;
            }
        }
    }


    async function getWeatherData() {

        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=ff78ba3dd77bfeb9345ba49644842507`);

        console.log(response.status); // 200
        console.log(response.statusText); // OK

        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            setWeatherData(data);
            setLoading(false);
            return !loading;

        } else {
            return !loading;
        }
    }


    return (
        <View>
            <Pressable onPress={getWeatherData}>

                {!loading ? <Text style={styles.Heading}>{weatherData.name} </Text> : <Text style={styles.Heading}>LiveWeather </Text>}

            </Pressable>

            <ActivityIndicator size="large" animating={loading} />
            {!loading ? <View>
                <Text style={styles.subheading}>Latitude: {weatherData.coord.lat}</Text>
                <Text style={styles.subheading}>Longitude: {weatherData.coord.lon},</Text>
                <Text style={styles.subheading}>Place: {weatherData.name},</Text>
                <Text style={styles.subheading}>Temp:  {weatherData.main.temp} C</Text>

            </View> : console.log('loading')}

        </View>
    )
}
export default LiveWeather;

const styles = StyleSheet.create({
    Heading: {
        fontSize: 25,
        textAlign: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10

    },
    subheading: {
        fontSize: 20,
        textAlign: 'center'
    }
})

