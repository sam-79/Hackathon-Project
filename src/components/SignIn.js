
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Background from './Background';



export default function SignIn({ navigation }) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [hidePassword, setHidePassword] = useState(true);

    const { signin, loading } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false} style={{ flex: 1, }}>
            <View style={styles.container}>

                <Text style={{fontSize:40,top:0,marginBottom:20}}>
                    Login
                </Text>



                <View style={styles.textFieldArea} >
                    <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Email</Text>
                    </View>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        autoComplete={'email'}
                        style={styles.textField}
                    />
                </View>


                <View style={styles.textFieldArea} >
                    <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Password</Text>
                    </View>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={hidePassword}
                        style={styles.textField}
                    />
                </View>

                {
                    loading ?
                        <View >
                            <ActivityIndicator animating={loading} size="large" />
                        </View>
                        :
                        < Pressable
                            style={{
                                backgroundColor: "#000",
                                padding: 5,
                                paddingHorizontal: 50,
                                borderRadius: 10,
                                marginVertical: 10
                            }}
                            onPress={() => {
                                signin({ email, password })
                            }}>
                            <Text style={{ textAlign: 'center', fontSize: 25, color: '#fff' }}>Login</Text>
                            {/* <MaterialCommunityIcons name="chevron-right" color="white" size={45} /> */}


                            {/*loading?<ActivityIndicator animating={true} size='large' />:<Text style={{ textAlign: 'center', fontSize: 20 }}>Sign In</Text>*/}
                        </Pressable>
                }
                <View>
                    {/* <Text style={{ fontSize: 15 }}>Don't have account?</Text> */}
                    <Pressable onPress={() => { navigation.navigate("SignUp") }}>
                        <Text style={{ fontSize: 15 }}>Don't have account? Register</Text>
                    </Pressable>
                </View>
            </View >
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "#fff"
    },
    textFieldArea: {
        padding: 10,
        margin: 2,
        borderRadius: 10,
        width: '100%',
        color: 'black',
        display: 'flex',
        marginVertical: 5
    },
    textField: {
        width: '100%',
        backgroundColor: '#959595',
        fontSize:20,
        color: '#fff',
        marginHorizontal: 5,
        borderRadius: 5,
        padding: 10
    },

});

