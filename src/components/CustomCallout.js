import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
// import { AuthContext } from '../context/AuthContext';




export function CustomCrowdCallout(props) {

    return (
        <View style={styles.container}>
            <View>
                {
                    props.data != null ?
                        <View>
                            <Text style={{ fontSize: 25, textAlign: 'left', marginBottom:5 }} >
                                Category: {props.data.category}
                            </Text>
                            <Text>
                                Owner: {props.data.owner}
                            </Text>
                            <Text>
                                Created At: {props.data.created_at}
                            </Text>
                            <Text>
                                Latitude: {props.data.latitude}
                            </Text>
                            <Text>
                                Longitude: {props.data.longitude}
                            </Text>
                            <Image
                                source={{ uri: props.data.image }}
                                style={{ height: 200, borderRadius:10, marginVertical:5 }}
                            />
                        </View>
                        :
                        <ActivityIndicator animating={true} size='large' />
                }
            </View>
        </View>
    )
}



export function CustomHelpCallout(props) {
    

    return (
        <View style={styles.container}>
            <View>
                {
                    props.data != null ?
                        <View>
                            <Text style={{ fontSize: 25, textAlign: 'left' }} >
                                Category: {props.data.TypeOfEmergency}
                            </Text>
                            <Text>
                                Owner: {props.data.owner}
                            </Text>
                            <Text>
                                Created At: {props.data.created_at}
                            </Text>
                            <Text>
                                Updated At: {props.data.updated_at}
                            </Text>
                            <Text>
                                Latitude: {props.data.latitude}
                            </Text>
                            <Text>
                                Longitude: {props.data.longitude}
                            </Text>
                            {/* <Image
                                source={{ uri: props.data.image }}
                                style={{ height: 200 }}
                            /> */}
                        </View>
                        :
                        <ActivityIndicator animating={true} size='large' />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});
