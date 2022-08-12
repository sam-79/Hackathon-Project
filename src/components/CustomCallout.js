import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';




function CustomCallout(props) {


    const { getCrowdDataById } = useContext(AuthContext);

    // useEffect(async () => {
    //     if (props.token || props.data) {
    //         setMarkerData(await getCrowdDataById(props.token, props.data))
    //     }
    // }, [])

    return (

        <View style={styles.container}>
            <View>
                {
                    props.data != null ?
                        <View>
                            <Text style={{ fontSize: 25, textAlign: 'left' }} >
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
                                style={{ height: 200 }}
                            />
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
        backgroundColor: '#fff000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

export default CustomCallout