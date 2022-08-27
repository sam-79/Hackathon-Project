import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Dimensions, View, Text, FlatList, Pressable, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../context/AuthContext";
import * as Location from 'expo-location';

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';




const numColumns = 2;
const size = (Dimensions.get('screen').width / numColumns);



export default function Dashboard({ navigation }) {
    const data = [
        { id: 'a', value: 'Live Weather', icon: 'weather-partly-cloudy', component: 'LiveWeather' },
        { id: 'b', value: 'Inundation', icon: 'weather-partly-rainy', component: 'Inundation' },
        { id: 'c', value: 'Flood Forecast', icon: 'home-flood', component: 'FloodForecast' },
        { id: 'd', value: 'Help', icon: 'handshake', component: 'SIH HELP REQUEST' },
        { id: 'e', value: 'Contribute', icon: 'hand-coin', component: 'CROWDSOURCE' },
        { id: 'g', value: 'Safety Tips', icon: 'shield-plus', component: 'Safety Tips' },
        { id: 'h', value: 'Emergency Contact', icon: 'phone', component: 'EmergencyContacts' },
        { id: 'i', value: 'SOS', icon: 'contacts', component: 'SOS' },

    ];

    const { userInfo } = useContext(AuthContext);

    // const getWeather
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    // ref
    const bottomSheetRef = useRef(null);

    // variables

    const snapPoints = useMemo(() => ['50%', '80%', '100%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);



    async function getLocation() {
        let value = await Location.getCurrentPositionAsync({})

        if (value) {

            // setWeatherData({ "coord": { "lon": 79, "lat": 21 }, "weather": [{ "id": 721, "main": "Haze", "description": "haze", "icon": "50n" }], "base": "stations", "main": { "temp": 26.21, "feels_like": 26.21, "temp_min": 26.21, "temp_max": 26.21, "pressure": 1004, "humidity": 83 }, "visibility": 4000, "wind": { "speed": 2.57, "deg": 290 }, "clouds": { "all": 75 }, "dt": 1661013132, "sys": { "type": 1, "id": 9069, "country": "IN", "sunrise": 1660955065, "sunset": 1661001054 }, "timezone": 19800, "id": 1266991, "name": "Khāpri", "cod": 200 })


            let data = { 'lat': value.coords.latitude, 'lon': value.coords.longitude };



            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=ff78ba3dd77bfeb9345ba49644842507`);

            console.log(response.status); // 200
            console.log(response.statusText); // OK

            if (response.status === 200) {
                let data = await response.json();
                // console.log(data);
                setWeatherData(data);
                setLoading(false);
                return !loading;

            } else {
                console.log(`${response}`)
            }
        }
    }

    useEffect(() => {
        getLocation()
    }, [])




    return (

        <View style={{ flex: 1, backgroundColor: '#6FD1F9', }}>
            {
                weatherData ?
                    <View>

                        <View style={{
                            // backgroundColor: 'red',
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20
                        }}>
                            <View style={{}}>
                                <Text style={{ fontSize: 50, textAlign: 'center', color: 'black' }}>
                                    {parseInt(weatherData.main.temp)}°C
                                </Text>
                            </View>
                            <View>
                                <View style={{
                                    flex: 1, backgroundColor: '#fff', borderRadius: 50, width: 100, height: 100,
                                    shadowColor: 'black',
                                    elevation: 10
                                }}>
                                    <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
                                        style={{ width: 100, flex: 1, }} />
                                </View>
                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 15 }}>{weatherData.weather[0].description}</Text>
                            </View>
                        </View>

                        <View style={{
                            // backgroundColor: 'red',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 25, color: 'black' }}>
                                {weatherData.name}
                            </Text>

                        </View>

                        {/* Horizontal Rule */}
                        <View style={{
                            borderWidth: 0.5,
                            borderColor: 'black',
                            margin: 10,
                        }} />

                        <View style={{ marginTop: 10 }} >

                            <View style={styles.weatherDataField}>
                                <View style={styles.weatherDataFieldText}>
                                    <MaterialCommunityIcons name={'thermometer'} size={30} color='black' />
                                    <Text style={{ color: 'black' }}>Min {weatherData.main.temp_min}°C</Text>
                                </View>

                                <View style={styles.weatherDataFieldText}>
                                    <MaterialCommunityIcons name={'thermometer'} size={30} color='black' />
                                    <Text style={{ color: 'black' }}>Max {weatherData.main.temp_max}°C</Text>
                                </View>
                            </View>

                            <View style={styles.weatherDataField}>
                                <View style={styles.weatherDataFieldText}>
                                    <MaterialCommunityIcons name={'speedometer-medium'} size={30} color='black' />
                                    <Text style={{ color: 'black' }}>Pressure {weatherData.main.pressure}hPa</Text>
                                </View>
                                <View style={styles.weatherDataFieldText}>
                                    <MaterialCommunityIcons name={'waves-arrow-up'} size={30} color='black' />
                                    <Text style={{ color: 'black' }}>Humidity {weatherData.main.humidity}%</Text>
                                </View>
                                <View style={styles.weatherDataFieldText}>
                                    <MaterialCommunityIcons name={'weather-windy'} size={30} color='black' />
                                    <Text style={{ color: 'black' }}>Wind {weatherData.wind.speed}m/s</Text>
                                </View>
                            </View>


                        </View>
                    </View>

                    :
                    // <SkeletonContent
                    //     containerStyle={{ flex: 1, width: 300 }}
                    //     isLoading={loading}
                    //     layout={[
                    //         { key: 'someId', width: 220, height: 20, marginBottom: 6 },
                    //         { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
                    //     ]}
                    // >
                    //     <Text style={styles.normalText}>Your content</Text>
                    //     <Text style={styles.bigText}>Other content</Text>
                    // </SkeletonContent>
                    console.log(`${loading}`)

            }

            {/* bottom sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={false}
                backgroundStyle={styles.contentContainer}>
                <BottomSheetFlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => navigation.navigate(item.component)} >
                                <View style={styles.item}>
                                    <MaterialCommunityIcons name={item.icon} size={40} color={'black'} />
                                    <Text>{item.value}</Text>
                                </View>
                            </Pressable>
                        )
                    }}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            </BottomSheet>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    listContainer: {
        // flex: 3,
        alignItems: 'center',
        width: '100%',
    },
    item: {
        width: size - 50,
        height: size - 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginVertical: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#4f36e9',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5

    },
    weatherDataField: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
        // backgroundColor:'red'

    },
    weatherDataFieldText: {
        minWidth: '30%',
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'yellow',
    }
})