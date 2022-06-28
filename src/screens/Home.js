import React, { useState } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';



var flood_data = {
    ADILABAD: {
        Flood_Condition: 'Normal',
        Max_WL: 151.04,
        State: 'TELANGANA',
        chords: { latitude: 19.5, longitude: 78.5 }
    },
    AHMEDNAGAR: {
        Flood_Condition: 'Normal',
        Max_WL: 489.33,
        State: 'MAHARASHTRA',
        chords: { latitude: 19.162772500000003, longitude: 74.85802430085195 }
    },
    Agra: {
        Flood_Condition: 'Normal',
        Max_WL: 145.98,
        State: 'Uttar_Pradesh',
        chords: { latitude: 27.1752554, longitude: 78.0098161 }
    },
    Ahmadabad: {
        Flood_Condition: 'Normal',
        Max_WL: 41.16,
        State: 'Gujarat',
        chords: { latitude: 23.0216238, longitude: 72.5797068 }
    },
    Allahabad: {
        Flood_Condition: 'Normal',
        Max_WL: 76.12,
        State: 'Uttar_Pradesh',
        chords: { latitude: 25.4381302, longitude: 81.8338005 }
    },
    Anantnag: {
        Flood_Condition: 'Normal',
        Max_WL: 1586.83,
        State: 'Jammu & Kashmir',
        chords: { latitude: 33.7368773, longitude: 75.1455138 }
    },
    Araria: {
        Flood_Condition: 'Normal',
        Max_WL: 45.87,
        State: 'Bihar',
        chords: { latitude: 26.26498795, longitude: 87.37162648106798 }
    },
    BASTAR: {
        Flood_Condition: 'Normal',
        Max_WL: 535.07,
        State: 'CHHATTISGARH',
        chords: { latitude: 19.11912825, longitude: 81.82918648971713 }
    },
    BHADRADRI_KOTHAGUDEM: {
        Flood_Condition: 'Normal',
        Max_WL: 44.04,
        State: 'TELANGANA',
        chords: { latitude: 17.71534525, longitude: 80.57149761778712 }
    },

}


export default function Home() {


    var markersArray = [];

    const mapCircle = () => {
        for (let i in flood_data) {
            const district = i;
            const location = `${district} ${flood_data[i].State}`
            const condition = flood_data[i].Flood_Condition
            const latlon = flood_data[i].chords
            markersArray.push({ place: location, chords: latlon, condition: condition })
            // console.log(markersArray)
        }
    }

    return (
        <MapView style={styles.map} region={{
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: 10,
            longitudeDelta: 10,
        }}>

            {/* <MapView.Circle
          center={{
            latitude: 20.5937,
            longitude: 78.9629,
          }}
          radius={20000}
          fillColor={"red"}
        /> */}

            {mapCircle()}


            {markersArray.map((marker, index) => {
                
                return (
                    <Circle key={index} center={{ latitude: marker.chords.latitude, longitude: marker.chords.longitude }} radius={20000} fillColor={"#d320208a"}>
                        {/* <Marker key={index} coordinate={{ latitude: marker.chords.latitude, longitude: marker.chords.longitude }} fillColor={"red"}>


                        <Callout>
                            <View>
                                <Text>City: {marker.place}</Text>
                                <Text>Condition: {marker.condition}</Text>
                            </View>
                        </Callout>


                        </Marker> */}
                    </Circle>
                )
            })}


        </MapView>
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
