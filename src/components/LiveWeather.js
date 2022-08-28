import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Image } from 'react-native';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { weatherAPIKey } from "@env";


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


            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=${weatherAPIKey}`);

            console.log(response.status); // 200
            console.log(response.statusText); // OK

            if (response.status === 200) {
                let data = await response.json();
                // console.log(data);
                setWeatherData(data);
                setLoading(false);
                return !loading;

            } else {
                return !loading;
            }
        }
    }


    async function getWeatherData() {

        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${weatherAPIKey}`);

        // console.log(response.status); // 200
        // console.log(response.statusText); // OK

        if (response.status === 200) {
            let data = await response.json();
            setWeatherData(data);
            setLoading(false);
            return !loading;

        } else {
            return !loading;
        }
    }


    const WeatherDataCard = (props) => {
        return (
            <View style={styles.weatherCard} >

                <Text style={{ fontSize: 50, textAlign: 'center', color: '#fff' }}>
                    {parseInt(props.data.main.temp)}°C
                </Text>


                <View style={{
                    // backgroundColor: 'red',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 20
                }}>
                    <View style={{}}>
                        <Text>
                            Feels like {props.data.main.feels_like}
                        </Text>
                        <Text>
                            Humidity {props.data.main.humidity}
                        </Text>
                    </View>
                    <View style={{}}>

                        <Image source={{ uri: `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png` }}
                            style={{ width: 100, flex: 1 }} />
                    </View>

                </View>




            </View>
        )
    }

    return (
        <View>
            <Pressable onPress={getWeatherData}>

                {!loading ? <Text style={styles.Heading}>{weatherData.name} </Text> : <Text style={styles.Heading}>LiveWeather </Text>}

            </Pressable>

            <ActivityIndicator size="large" animating={loading} />
            {weatherData ?
                <WeatherDataCard data={weatherData} />
                :
                console.log('loading')}


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
    },
    weatherCard: {
        backgroundColor: '#4f36e990',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

