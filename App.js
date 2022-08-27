
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

// function BottomNavigation(params) {
//   const { getUserDetails, userInfo, userToken } = useContext(AuthContext);
//   {
//     if (!userInfo) {
//       try {
//         let resp = getUserDetails(userToken.token.access);
//         console.log("resp", resp)
//       } catch (e) { Alert.alert('Error', String(e)) }
//     }
//   }


//   return (
//     <DrawerTab.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#4f36e9',
//           elevation:0,


//         },
//         headerTitleStyle: {
//           color: "white"
//         }
//       }}
//       drawerContent={(props) => <CustomDrawer {...props} />}

//     >
//       <DrawerTab.Screen name="HOME" component={Home}/>

//       <DrawerTab.Screen name="SIH HELP REQUEST" component={Help} />

//       <DrawerTab.Screen name="CROWDSOURCE" component={Contribute} />

//       <DrawerTab.Screen name="TIPS" component={Tips}/>
//     </DrawerTab.Navigator >
//   )
// }

function MainNavigate(params) {

  //retrive userToken and userInfo from Context 
  const { userToken, userInfo } = useContext(AuthContext);
  
  // console.log('token', userToken)
  // console.log('info', userInfo)

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