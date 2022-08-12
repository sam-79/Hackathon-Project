import React, { useContext } from "react";
import { StyleSheet, Dimensions, View, Text, FlatList, Pressable, Button } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../context/AuthContext";





const numColumns = 3;
const size = (Dimensions.get('screen').width / numColumns);



export default function Dashboard({ navigation }) {
    const data = [
        { id: 'a', value: 'Live Weather', icon: 'weather-partly-cloudy', component: 'LiveWeather' },
        { id: 'b', value: 'IMD Forecast', icon: 'weather-partly-rainy', component: 'IMDForecast' },
        { id: 'c', value: 'Flood Forecast', icon: 'chart-waterfall', component: 'FloodForecast' },
        { id: 'd', value: 'Safety Tips', icon: 'shield-plus', component: 'SafetyTips' },
        { id: 'e', value: 'Emergency Contact', icon: 'contacts', component: 'EmergencyContacts' },
    ];

    const { userInfo } = useContext(AuthContext);
    console.log('dash',userInfo);
    


    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 35, borderBottomWidth: 1, alignSelf: 'flex-start', marginTop: 100,marginLeft:15 }}>DASHBOARD</Text>

            <Text style={{fontSize:20,alignSelf:"flex-start", marginLeft:15}}>
                Hello, {userInfo? (userInfo.name): ''}
            </Text>
            <View>
                <FlatList style={styles.listContainer}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => navigation.navigate(item.component)}>
                                <View style={styles.item}>
                                    <MaterialCommunityIcons name={item.icon} size={40} color={'black'} />
                                    <Text>{item.value}</Text>
                                </View>
                            </Pressable>
                        )
                    }}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                />

            </View>


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
        height: '100%',
        width: '95%',
    },
    itemContainer: {
    },
    item: {
        width: size - 10,
        height: size - 10,
        flex: 1,
        justifyContent: 'center',
        margin: 2,
        marginVertical: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 4, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 2

    }
})