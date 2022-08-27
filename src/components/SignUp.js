import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Background from './Background';


export default function SignUp({ navigation }) {
    const [name, setName] = useState(null);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [contact, setContact] = useState(null);

    const { register } = useContext(AuthContext);
    const { loading } = useContext(AuthContext);

    const pswdRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;



    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false} style={{ flex: 1, }}>
            <ImageBackground source={require('../images/signup_signin_bg_img.jpg')} resizeMode="cover" style={{
                flex: 1,
                justifyContent: "center"
            }}>
                <View style={styles.contentView}>

                    {/* <Text style={{ fontSize: 40, top: 0, marginBottom: 20 }}>
                    Register
                </Text> */}

                    {/* For name */}
                    <View style={styles.textFieldArea}>
                        {/* <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Name</Text>
                    </View> */}
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={styles.textField}
                            placeholder="Name"
                        />
                    </View>

                    <View style={styles.textFieldArea} >
                        {/* <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Email</Text>
                    </View> */}
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            autoComplete={'email'}
                            style={styles.textField}
                            placeholder="Email"
                        />
                    </View>

                    <View style={styles.textFieldArea} >
                        {/* <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Password</Text>
                    </View> */}
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            style={styles.textField}
                            placeholder="Password"

                        />
                    </View>

                    {/* password validation message */}
                    {!pswdRegEx.test(password) && password.length > 0 ? (
                        <Text style={{ color: 'red', margin: 5 }}>Password should have min one Symbol, one Digit and length 8 to 16</Text>
                    ) : (
                        <></>
                    )}

                    <View style={styles.textFieldArea}>
                        {/* <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Retype Password</Text>
                    </View> */}
                        <TextInput
                            value={password2}
                            onChangeText={setPassword2}
                            style={styles.textField}
                            placeholder="Password"
                        />
                    </View>

                    {/* to check both password matches */}
                    {password !== password2 && password2.length > 0 ? (
                        <Text style={{ color: 'red', margin: 5 }}>Password not match</Text>
                    ) : (
                        <></>
                    )}

                    <View style={styles.textFieldArea}>
                        {/* <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Mobile Number</Text>
                    </View> */}
                        <TextInput
                            value={contact}
                            onChangeText={setContact}
                            keyboardType="numeric"
                            style={styles.textField}
                            placeholder="Mobile"

                        />
                    </View>


                    {
                        loading ?
                            <View>
                                <ActivityIndicator animating={loading} size="large" />
                            </View>
                            :
                            < Pressable
                                style={{
                                    backgroundColor: "#000",
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 30
                                }}
                                onPress={() => {
                                    register({ name, email, password, password2, contact });

                                }}>
                                <Text style={{ textAlign: 'center', fontSize: 25, color: '#fff' }}>Register</Text>

                            </Pressable>
                    }


                    <View style={{ marginTop: 60, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15 }}>Already have an account? </Text>
                        <Pressable onPress={() => { navigation.navigate("SignIn") }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>SignIn</Text>
                        </Pressable>
                    </View>
                </View >
            </ImageBackground >
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentView: {
        position: 'relative',
        top: 200,
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 50,
        alignItems: 'center'
    },
    textFieldArea: {
        padding: 10,
        margin: 2,
        borderRadius: 10,
        width: '100%',
        color: 'black',
        display: 'flex',
        marginVertical: 5,
        borderBottomWidth: 1,
    },
    textField: {
        width: '100%',
        backgroundColor: '#fff0',
        fontSize: 20,
        color: '#000',
        marginHorizontal: 5,
        borderRadius: 5,
        padding: 10
    },

});

