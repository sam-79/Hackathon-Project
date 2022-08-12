import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Background from './Background';


export default function SignUp({ navigation }) {
    const [name, setName] = useState(null);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [contact, setContact] = useState(null);

    const { register } = useContext(AuthContext);
    const { loading } = useContext(AuthContext);


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false} style={{ flex: 1, }}>
            <View style={styles.container}>



                <Text style={{ fontSize: 40, top: 0, marginBottom: 20 }}>
                    Register
                </Text>

                {/* For name */}
                <View style={styles.textFieldArea}>
                    <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Name</Text>
                    </View>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.textField}
                    />
                </View>

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
                        secureTextEntry={true}
                        style={styles.textField}
                    />
                </View>

                <View style={styles.textFieldArea}>
                    <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Retype Password</Text>
                    </View>
                    <TextInput
                        value={password2}
                        onChangeText={setPassword2}
                        style={styles.textField}
                    />
                </View>

                {password !== password2 && password2 != null ? (
                    <Text style={{ color: '#fff', margin: 5 }}>Password not match</Text>
                ) : (
                    <></>
                )}

                <View style={styles.textFieldArea}>
                    <View>
                        <Text style={{ textAlign: 'left', fontSize: 20 }}>Mobile Number</Text>
                    </View>
                    <TextInput
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="numeric"
                        style={styles.textField}
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
                                padding: 5,
                                paddingHorizontal: 50,
                                borderRadius: 10,
                                marginVertical: 10
                            }}
                            onPress={() => {
                                register({ name, email, password, password2, contact });

                            }}>
                            <Text style={{ textAlign: 'center', fontSize: 25, color: '#fff' }}>Register</Text>

                        </Pressable>
                }


                <View>
                    {/* <Text style={{ fontSize: 15 }}>Don't have account?</Text> */}
                    <Pressable onPress={() => { navigation.navigate("SignIn") }}>
                        <Text style={{ fontSize: 15 }}>Already have Account SignIn</Text>
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
        padding: 10
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
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 5,
        borderRadius: 5,
        padding: 10
    },

});

