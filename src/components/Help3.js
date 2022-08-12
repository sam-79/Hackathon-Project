import React, { useContext, useEffect , useState} from 'react';

import { StyleSheet, View, Text, FlatList, Alert, Pressable } from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { HelpContext } from '../context/HelpContext';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




function Help3() {

    //using HelpContext functions
    const { getCurrentUserRequestData, userRequestData, deleteRequestData } = useContext(HelpContext);
    //using AuthContext functions
    const { userToken, setUserToken } = useContext(AuthContext);

    const [isFetching, setIsFetching] = useState(false);
    

    useEffect(() => {
        if (userToken.token.access) {
            getCurrentUserRequestData(userToken.token.access)
        } else {
            setUserToken(false)
            Alert.alert("Logged Out", "Token Expiry")
        }
    }, [])

    useEffect(() => {

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
                    Type Of Emergency: {data.item.TypeOfEmergency}
                </Text>
                <Text>
                    Created At : {data.item.created_at}
                </Text>
                <Text>
                    Request Status : {data.item.RequestStatus}
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
                            deleteRequestData(userToken.token.access, id) 
                            setIsFetching(true)
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
                userRequestData != null && typeof userRequestData == "object" ?
                    <View style={{ width: "100%" }} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontSize: 18 }}>
                                Help Request Raised By You
                            </Text>
                            <View>
                                <Pressable onPress={() => {
                                    userToken.token.access ? getCurrentUserRequestData(userToken.token.access)
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
                            data={userRequestData}
                            renderItem={InfoCard}
                            keyExtractor={item => item.id}
                            style={{ width: "100%" }}
                            refreshing={isFetching}
                            onRefresh={() => {
                                setIsFetching(true)
                                userToken.token.access ? getCurrentUserRequestData(userToken.token.access)
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



export default Help3