
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Background from './Background';

// import { LinearGradient } from 'expo-linear-gradient';



export default function SignIn({ navigation }) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [hidePassword, setHidePassword] = useState(true);

    const { signin, loading } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false} style={{ flex: 1 }}>
            <ImageBackground source={require('../images/signup_signin_bg_img.jpg')} resizeMode="cover" style={{
                flex: 1,
                justifyContent: "center"
            }}>


                <View style={styles.contentView}>



                    {/* <Text style={{ fontSize: 40, top: 0, marginBottom: 20 }}>
                        Login
                    </Text> */}



                    <View style={styles.textFieldArea} >
                        {/* <View>
                            <Text style={{ textAlign: 'left', fontSize: 20 }}>Email</Text>
                        </View> */}
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            autoComplete={'email'}
                            placeholder="Email"
                            style={styles.textField}
                        />
                    </View>


                    <View style={[styles.textFieldArea, { flexDirection: 'row', justifyContent: 'space-between' }]} >
                        {/* <View>
                            <Text style={{ textAlign: 'left', fontSize: 20 }}>Password</Text>
                        </View> */}
                        <TextInput

                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={hidePassword}
                            placeholder="Password"
                            style={[styles.textField, { width: '80%' }]}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key == 'Enter') {
                                    signin({ email, password })
                                }
                            }}
                        />
                        <Pressable onPress={() => { setHidePassword(!hidePassword) }} style={{ justifyContent: 'center' }}>
                            <MaterialCommunityIcons name={hidePassword ? "eye-off" : "eye"} color={"black"} size={26} />
                        </Pressable>
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
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 30
                                }}
                                onPress={() => {
                                    signin({ email, password })
                                }}>
                                <Text style={{ textAlign: 'center', fontSize: 25, color: '#fff' }}>Login</Text>
                                {/* <MaterialCommunityIcons name="chevron-right" color="white" size={45} /> */}
                                {/*loading?<ActivityIndicator animating={true} size='large' />:<Text style={{ textAlign: 'center', fontSize: 20 }}>Sign In</Text>*/}
                            </Pressable>
                    }
                    <View style={{ marginTop: 60, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15 }}>Don't have account? </Text>
                        <Pressable onPress={() => { navigation.navigate("SignUp") }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground >
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)"
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
        alignItems: 'center',
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
        backgroundColor: '#fff',
        fontSize: 20,
        color: '#000',
        padding: 10
    },

});

