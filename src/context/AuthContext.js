import React, { createContext, useState, useEffect } from 'react';
import { DJANGO_API_ENDPOINT } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// console.log(`${DJANGO_API_ENDPOINT}/api/user/login/`)



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);



    // function to register users
    const register = ({ email, name, password, password2, contact }) => {



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        setLoading(true);
        var raw = JSON.stringify({ email, name, password, password2, contact });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${DJANGO_API_ENDPOINT}/api/user/register/`, requestOptions)
            .then(response => response.json())
            .then(async (data) => {


                if (data.msg == "Registration Success!") {
                    try {
                        let jsonVal = JSON.stringify(data)
                        await AsyncStorage.setItem('userToken', jsonVal, () => {
                            setUserToken(data)
                            setLoading(false);

                        })

                    } catch (e) {
                        Alert.alert("Error", `Error at saving data ${e}`);
                        setLoading(false)

                    }

                } else {
                    Alert.alert("Error", "Enter Valid Data");
                    setLoading(false)

                }
            });
    }

    // function to login user
    const signin = ({ email, password }) => {

        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ email, password });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch(`${DJANGO_API_ENDPOINT}/api/user/login/`, requestOptions)
            .then(response => response.json())
            .then(async (data) => {

                if (data.msg == "Login Success!") {


                    try {
                        let jsonVal = JSON.stringify(data)
                        await AsyncStorage.setItem('userToken', jsonVal, () => {
                            setUserToken(data)
                            setLoading(false)

                        })

                    } catch (e) {
                        setLoading(false)
                        Alert.alert("Error", `Error at saving data ${e}`);
                    }

                } else {
                    setLoading(false)
                    Alert.alert("Error", "Enter Valid Data");
                }
            })
            .catch(err => {
                setLoading(false)
                Alert.alert("Error", `${err}`)
            })
            ;

        setLoading(!loading)
    }



    // function to check user is logged in or not

    const isLoggedIn = async () => {
        try {
            //   setSplashLoading(true);

            let tokenData = await AsyncStorage.getItem('userToken');
            tokenData = JSON.parse(tokenData);

            if (tokenData) {
                setUserToken(tokenData);

            }

            //   setSplashLoading(false);
        } catch (e) {
            // setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    }

    useEffect(() => {
        // AsyncStorage.getItem("userToken", (res) => console.log("pp", res))
        isLoggedIn();
    }, []);



    const getUserDetails = (tokenPass) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokenPass}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DJANGO_API_ENDPOINT}/api/user/profile/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // setUserInfo(data);
                if (data.name) {
                    setUserInfo(data);
                    AsyncStorage.setItem("userInfo", JSON.stringify(data)).catch(err => console.log("failed to ser userinfo", err))
                } else if (data.code == "token_not_valid") {
                    setUserToken(null);
                    setUserInfo(null);
                    AsyncStorage.multiRemove(['userToken', "userInfo"]).catch(err = console.log("Faisled to remove multitoken", err))
                    return "Token Expired or Network Issue 21";

                }
            })
            .catch((err) => {

                return `Token Expired or Network Issue or ${err}`;
            })

    }

    const logOut = () => {
        AsyncStorage.multiRemove(["userToken", "userInfo"], () => {
            setUserInfo(null);
            setUserToken(null);
        }).catch(err => {
            Alert.alert("Error", String(err))
        })
    }



    return (
        <AuthContext.Provider value={{ register, signin, isLoggedIn, getUserDetails, setUserToken, userToken, userInfo, loading, logOut }}>{children}</AuthContext.Provider>
    );
};
