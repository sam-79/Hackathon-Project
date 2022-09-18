
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, StatusBar, Alert, Text, Image, View, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Location from 'expo-location';



import First from './src/components/First';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';

import { AuthContext, AuthProvider } from './src/context/AuthContext';

import DrawerNavigation from './src/screens/Home';



const Stack = createStackNavigator();



function StackNavigator(params) {
  return (
    <Stack.Navigator initialRouteName="First"
      screenOptions={{ headerShown: false }} >
      {/* <Stack.Screen name='First' component={First} /> */}
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}


function MainNavigate(params) {

  //retrive userToken and userInfo from Context 
  const { userToken, userInfo } = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      {

        (userToken) ?
          <DrawerNavigation />
          :
          <StackNavigator />
      }
    </NavigationContainer>
  )
}



export default function App() {

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }
    })();
  }, []);


  return (
    <AuthProvider>
      <StatusBar style="light" barStyle="light-content"/>
      <MainNavigate />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});