import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Pressable, FlatList, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function Notifications({ navigation }) {

    const [isFetching, setIsFetching] = useState(false);
    const [userNotification, setUserNotification] = useState([]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getNotification();

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    async function getNotification() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://floodmanagement.herokuapp.com/api/floodmanagement/broadcast/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserNotification(result)
            })
            .catch(error => Alert.alert('Error', `${error}`));


    }


    //Component to render to display Crowd Info
    const InfoCard = (data) => {
        return (
            <View style={styles.card}>
                <Text style={{fontSize:18}}>
                    {data.item.msg}
                </Text>
                <Text>
                    Created at: {data.item.created_at}
                </Text>
            </View>
        )
    }


    return (
        <View>
            {
                userNotification != null && typeof userNotification == "object" ?
                    <View style={{ width: "100%" }} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontSize: 18 }}>
                                New Notifications
                            </Text>
                            <View>
                                <Pressable onPress={() => {
                                    getNotification()
                                }}>
                                    <MaterialCommunityIcons name="refresh" color={"black"} size={26} />
                                </Pressable>
                            </View>
                        </View>
                        <FlatList
                            data={userNotification}
                            renderItem={InfoCard}
                            keyExtractor={item => item.id}
                            style={{ width: "100%" }}
                            refreshing={isFetching}
                            onRefresh={() => {
                                setIsFetching(true)
                                getNotification()
                                setIsFetching(false)
                            }}
                        />
                    </View>
                    :
                    <View>
                        <Text>
                            No Notification
                        </Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', margin: 10,
    },
    card: {
        // padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        width: "100%",
        padding: 10,
        marginVertical: 20,
        backgroundColor: "#fff",
    },
    button: {

    }
});

export default Notifications