import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';

const { width, height } = Dimensions.get('window');

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

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(INDIA_STATES.flatMap((val) => { return { label: val.name, value: val.name } }));

    const fetchData = (state) => {
        console.log('Cakkedd');
        setServerResp(null);
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        fetch(
            `https://floodmanagement.herokuapp.com/api/floodmanagement/forcast/?search=${state}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setServerResp(result);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
    };

    const [serverResp, setServerResp] = useState(null);



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.paragraph}>Select State</Text>

                <DropDownPicker
                    style={styles.dropDown}
                    containerStyle={{}}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={fetchData}
                />
            </View>
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
                                widthArr={[150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,]}
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
                                                        "#eb9f9f7a" : "#ffffff00",
                                            }}
                                            widthArr={[
                                                150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
                                            ]}
                                        />
                                    );
                                })
                            ) : (
                                <Row data={['No data']} />
                            )}
                        </Table>
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
}



export default FloodForecast;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableView: {
        maxHeight: "70%",
        borderColor: "#c8e1ff",
        borderWidth: 1,
        borderRadius: 5,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
    },
    dropDown: {
        width: 300,
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
});
