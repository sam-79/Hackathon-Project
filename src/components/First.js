import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import {Background1} from './Background';
import SignIn from './SignIn';

function First({ navigation }) {
    return (

        <View style={styles.container}>

            <View style={[styles.container, { position: "absolute" }]}>
                <Background1 />

            </View>

            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 40, fontWeight: '700', marginTop: 30 }}>
                SIH Project
            </Text>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 40, fontWeight: '700', marginBottom: 30 }}>Flood Management
            </Text>


            <Pressable style={styles.btn} onPress={() => { navigation.navigate("SignIn") }}>
                <View>
                    <Text style={{ color: '#3521b5', fontSize: 15, fontWeight: '300' }}>Sign in to your Account </Text>
                </View>
            </Pressable>
            <Pressable style={styles.btn} onPress={() => { navigation.navigate("SignUp") }}>
                <View>
                    <Text style={{ color: '#3521b5', fontSize: 15, fontWeight: '300' }}>Create New Account </Text>
                </View>
            </Pressable>


        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    btn: {
        margin: 5,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 30
    }
});



export default First