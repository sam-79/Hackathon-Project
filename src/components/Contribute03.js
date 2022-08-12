import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, Pressable } from 'react-native';

import { CrowdContext } from '../context/CrowdSource';
import { AuthContext } from '../context/AuthContext';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



function Contribute03() {

    const { userToken, setUserToken } = useContext(AuthContext);

    const { userCrowdData, getCurrentUserCrowdData, deleteCrowdData } = useContext(CrowdContext);

    const [isFetching, setIsFetching] = useState(false);


    // const [userData, setUserData] = useState(null);

    // const getCurrentUserData = (token) => {

    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", `Bearer ${token}`);

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch("https://floodmanagement.herokuapp.com/api/floodmanagement/crowdsourcelist/", requestOptions)
    //         .then(response => response.json())
    //         .then(result => setUserData(result))
    //         .catch(error => {
    //             console.log(error)
    //             Alert.alert('error', `${error}`)
    //         });

    // }

    useEffect(() => {
        if (userToken.token.access) {
            getCurrentUserCrowdData(userToken.token.access)
        } else {
            setUserToken(false)
            Alert.alert("Logged Out", "Token Expiry")
        }
    }, [])



    useEffect(() => {
        console.log(userToken.token.access)
        if (!userToken.token.access) {
            Alert.alert("Token Expiry", "User Log Out", [
                {
                    text: "Okay",
                    onPress: () => setUserToken(false),
                    style: "cancel",
                },
            ],
                {
                    cancelable: false
                }
            )
        }
    })



    //Component to render to display Crowd Info
    const InfoCard = (data) => {
        const id = data.item.id
        return (
            <View style={styles.card}>
                <Text>
                    Category: {data.item.category}
                </Text>
                <Text>
                    Created At : {data.item.created_at}
                </Text>
                <Text>
                    Description : {data.item.description}
                </Text>
                <Text>
                    ID : {data.item.id}
                </Text>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-end' }}>

                    <Pressable style={{
                        margin: 5,
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: "#d93636"
                    }}
                        onPress={() => {
                            setIsFetching(true)
                            deleteCrowdData(userToken.token.access, id)
                            setIsFetching(false)
                        }}
                    >
                        <View><Text style={{ color: "white", paddingHorizontal: 5, fontSize: 15 }}>Delete</Text></View>
                    </Pressable>


                </View>
            </View>
        )
    }



    return (
        <View style={styles.container}>

            {
                userCrowdData != null && typeof userCrowdData == "object" ?
                    <View style={{ width: "100%" }} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontSize: 18 }}>
                                CrowdSource Data Submitted By You
                            </Text>
                            <View>
                                <Pressable onPress={() => {
                                    userToken.token.access ? getCurrentUserCrowdData(userToken.token.access)
                                        :
                                        (
                                            Alert.alert("Token Expiry", "User Log Out", [
                                                {
                                                    text: "Okay",
                                                    onPress: () => setUserToken(false),
                                                    style: "cancel",
                                                },
                                            ],
                                                {
                                                    cancelable: false
                                                }
                                            )
                                        )
                                }}>
                                    <MaterialCommunityIcons name="refresh" color={"black"} size={26} />
                                </Pressable>
                            </View>
                        </View>
                        <FlatList
                            data={userCrowdData}
                            renderItem={InfoCard}
                            keyExtractor={item => item.id}
                            style={{ width: "100%" }}
                            refreshing={isFetching}
                            onRefresh={() => {
                                setIsFetching(true)
                                userToken.token.access ? getCurrentUserCrowdData(userToken.token.access)
                                    :
                                    (
                                        Alert.alert("Token Expiry", "User Log Out", [
                                            {
                                                text: "Okay",
                                                onPress: () => setUserToken(false),
                                                style: "cancel",
                                            },
                                        ],
                                            {
                                                cancelable: false
                                            }
                                        )
                                    )
                                setIsFetching(false)

                            }}
                        />
                    </View>
                    :
                    <View>
                        <Text>
                            No Data Added
                        </Text>
                    </View>
            }

        </View >

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
        borderRadius: 10,
        borderWidth: 1,
        borderEndColor: "black"
    },
    button: {

    }
});


export default Contribute03