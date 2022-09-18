import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Switch, StatusBar, SafeAreaView, Alert } from 'react-native';
import { DJANGO_API_ENDPOINT } from "@env";


import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';

import MapView, { Marker, Callout } from 'react-native-maps';


// const { width, height } = Dimensions.get('window');

const INDIA_STATES = [{
    "abbreviation": "AN",
    "name": "Andaman and Nicobar Islands"
},
{
    "abbreviation": "AP",
    "name": "Andhra Pradesh"
},
{
    "abbreviation": "AR",
    "name": "Arunachal Pradesh"
},
{
    "abbreviation": "AS",
    "name": "Assam"
},
{
    "abbreviation": "BR",
    "name": "Bihar"
},
{
    "abbreviation": "CG",
    "name": "Chandigarh"
},
{
    "abbreviation": "CH",
    "name": "Chhattisgarh"
},
{
    "abbreviation": "DH",
    "name": "Dadra and Nagar Haveli"
},
{
    "abbreviation": "DD",
    "name": "Daman and Diu"
},
{
    "abbreviation": "DL",
    "name": "Delhi"
},
{
    "abbreviation": "GA",
    "name": "Goa"
},
{
    "abbreviation": "GJ",
    "name": "Gujarat"
},
{
    "abbreviation": "HR",
    "name": "Haryana"
},
{
    "abbreviation": "HP",
    "name": "Himachal Pradesh"
},
{
    "abbreviation": "JK",
    "name": "Jammu and Kashmir"
},
{
    "abbreviation": "JH",
    "name": "Jharkhand"
},
{
    "abbreviation": "KA",
    "name": "Karnataka"
},
{
    "abbreviation": "KL",
    "name": "Kerala"
},
{
    "abbreviation": "LD",
    "name": "Lakshadweep"
},
{
    "abbreviation": "MP",
    "name": "Madhya Pradesh"
},
{
    "abbreviation": "MH",
    "name": "Maharashtra"
},
{
    "abbreviation": "MN",
    "name": "Manipur"
},
{
    "abbreviation": "ML",
    "name": "Meghalaya"
},
{
    "abbreviation": "MZ",
    "name": "Mizoram"
},
{
    "abbreviation": "NL",
    "name": "Nagaland"
},
{
    "abbreviation": "OR",
    "name": "Odisha"
},
{
    "abbreviation": "PY",
    "name": "Puducherry"
},
{
    "abbreviation": "PB",
    "name": "Punjab"
},
{
    "abbreviation": "RJ",
    "name": "Rajasthan"
},
{
    "abbreviation": "SK",
    "name": "Sikkim"
},
{
    "abbreviation": "TN",
    "name": "Tamil Nadu"
},
{
    "abbreviation": "TS",
    "name": "Telangana"
},
{
    "abbreviation": "TR",
    "name": "Tripura"
},
{
    "abbreviation": "UP",
    "name": "Uttar Pradesh"
},
{
    "abbreviation": "UK",
    "name": "Uttarakhand"
},
{
    "abbreviation": "WB",
    "name": "West Bengal"
}
]

function FloodForecast() {

    const mapRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(INDIA_STATES.flatMap((val) => { return { label: val.name, value: val.name } }));


    const fetchData = (state) => {

        setServerResp(null);
        setLoading(true);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${DJANGO_API_ENDPOINT}/api/floodmanagement/${switchIsOn ? "forcastmap" : "forcast"}/?search=${state}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setServerResp(result)
                setLoading(false);
                if (serverResp != null && switchIsOn) {
                    let coords = new Array();
                    serverResp.map((data) => {
                        coords.push({ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) })
                    })
                    mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 10, right: 100, bottom: 10, left: 100 } })
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('error', String(error))
            });
    };

    const [serverResp, setServerResp] = useState(null);

    //Switch Variables
    const [switchIsOn, setSwitchIsOn] = useState(false);

    useEffect(() => {
        fetchData()
    }, [switchIsOn])





    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={{ width: '100%', padding: 10, position: 'relative', top: 0, zIndex: 15 }}>

                <View style={{ flexDirection: 'row', backgroundColor: '#ffffff', justifyContent: 'space-between', borderWidth: 1, borderRadius: 10, marginVertical: 5, paddingHorizontal: 5 }}>
                    <Text style={{ fontSize: 25 }}>MapView</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={switchIsOn ? "#4f36e9" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setSwitchIsOn(previousState => !previousState)}
                        value={switchIsOn}
                        disabled={loading}
                    />
                </View>

                <View>
                    <DropDownPicker
                        // style={{ backgroundColor: '#ffffff', borderRadius: 10, zIndex: 15, marginVertical: 5 }}
                        // dropDownContainerStyle={{ backgroundColor: '#ffffff', borderRadius: 10, zIndex: 15, marginVertical: 5 }}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={fetchData}
                        placeholder="Select an State"
                        listMode="FLATLIST"

                    />
                </View>
            </View>

            {
                switchIsOn ?
                    <View style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>

                        <MapView ref={mapRef} style={styles.map} initialRegion={{
                            latitude: 20.5937,
                            longitude: 78.9629,
                            latitudeDelta: 25,
                            longitudeDelta: 25
                        }} >

                            {
                                serverResp != null && switchIsOn ?
                                    serverResp.map((data, index) => {
                                        if (data.latitude != "0.0000000000000000" && data.longitude != "0.0000000000000000" && index < 10) {
                                            return (
                                                <Marker key={String(index)} coordinate={{
                                                    latitude: parseFloat(data.latitude),
                                                    longitude: parseFloat(data.longitude)
                                                }}
                                                    pinColor={data.Flood_Condition1 == "Severe" ?
                                                        "#ef4960" :
                                                        data.Flood_Condition1 == "Above Normal" ?
                                                            "#e6ff00" : "#3c54ff"}
                                                >
                                                    <Callout>
                                                        <View>
                                                            <Text>
                                                                Site Name : {data.Site_Name}
                                                            </Text>
                                                            <Text>
                                                                River : {data.River}
                                                            </Text>
                                                            <Text>
                                                                District : {data.District}
                                                            </Text>
                                                            <Text>
                                                                State : {data.State}
                                                            </Text>
                                                            <Text>
                                                                Day : {data.Day1}
                                                            </Text>
                                                            <Text>
                                                                Flood Condition : {data.Flood_Condition1}
                                                            </Text>
                                                        </View>
                                                    </Callout>
                                                </Marker>
                                            )
                                        }
                                    })
                                    :
                                    console.log("hello")
                            }
                        </MapView>
                    </View>
                    :
                    <View style={{ width: '100%', padding: 10 }}>
                        {/* {fetchData()} */}
                        <ActivityIndicator animating={loading} size="large" />
                        <View style={styles.tableView}>
                            <ScrollView>
                                <ScrollView horizontal={true}>

                                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                        <Row
                                            data={[
                                                'Site Name',
                                                "River",
                                                'District',
                                                'Day',
                                                'Flood Condition',
                                                'Max WL',
                                                'Day',
                                                'Flood Condition',
                                                'Max WL',
                                                'Day',
                                                'Flood Condition',
                                                'Max WL',
                                                'Day',
                                                'Flood Condition',
                                                'Max WL',
                                                'Day',
                                                'Flood Condition',
                                                'Max WL',
                                            ]}
                                            style={styles.head}
                                            widthArr={[150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]}
                                        />
                                        {serverResp != null ? (
                                            serverResp.map((resp, index) => {
                                                return (
                                                    <Row key={index}
                                                        data={[
                                                            resp.Site_Name,
                                                            resp.River,
                                                            resp.District,
                                                            resp.Day1,
                                                            resp.Flood_Condition1,
                                                            resp.Max_WL1,
                                                            resp.Day2,
                                                            resp.Flood_Condition2,
                                                            resp.Max_WL2,
                                                            resp.Day3,
                                                            resp.Flood_Condition3,
                                                            resp.Max_WL3,
                                                            resp.Day4,
                                                            resp.Flood_Condition4,
                                                            resp.Max_WL4,
                                                            resp.Day5,
                                                            resp.Flood_Condition5,
                                                            resp.Max_WL5,
                                                        ]}
                                                        style={{
                                                            backgroundColor: resp.Flood_Condition1 == "Severe" || resp.Flood_Condition2 == "Severe" || resp.Flood_Condition3 == "Severe" || resp.Flood_Condition4 == "Severe" || resp.Flood_Condition5 == "Severe"
                                                                ?
                                                                "#ef4960b8" :
                                                                resp.Flood_Condition1 == "Above Normal" || resp.Flood_Condition2 == "Above Normal" || resp.Flood_Condition3 == "Above Normal" || resp.Flood_Condition4 == "Above Normal" || resp.Flood_Condition5 == "Above Normal"
                                                                    ?
                                                                    "#e6ff007a" : "#3c54ff70",
                                                        }}
                                                        widthArr={[
                                                            150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150
                                                        ]}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <Row data={[
                                                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
                                            ]} />
                                        )
                                        }
                                    </Table>
                                </ScrollView>
                            </ScrollView>
                        </View>
                    </View>
            }


            <View style={{ position: 'absolute', bottom: 1, paddingVertical: 5, marginHorizontal: 5 }}>
                <View style={styles.colorBoxView}>
                    <View style={[styles.colorBox, { backgroundColor: '#ef4960' }]}></View>
                    <Text>Flood Condition : Severe</Text>
                </View>
                <View style={styles.colorBoxView}>
                    <View style={[styles.colorBox, { backgroundColor: '#eb9f9f' }]}></View>
                    <Text>Flood Condition : Above Normal</Text>
                </View>
            </View>


        </SafeAreaView>
    );
}

export default FloodForecast;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    tableView: {
        maxHeight: "70%",
        borderColor: "#c8e1ff",
        borderWidth: 1,
        borderRadius: 5,
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    colorBoxView: {
        flexDirection: 'row',
        margin: 3,
    },
    colorBox: {
        height: 20,
        width: 20,
        marginHorizontal: 5
    },
    map: {
        height: '100%',
        width: '100%',
    }
});



