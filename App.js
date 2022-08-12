
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, StatusBar, Alert, Text, Image, View, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Location from 'expo-location';

import Home from './src/screens/Home';
import Help from './src/screens/Help';
import Contribute from './src/screens/Contribute';
import Tips from './src/screens/Tips';

import First from './src/components/First';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';

import { AuthContext, AuthProvider } from './src/context/AuthContext';

import CustomDrawer from './src/components/CustomDrawer';

// creating Drawer navigation TAB object
const DrawerTab = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();


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

// function TopNavigation(params) {
//   return (

//     <TopTab.Navigator screenOptions={{
//       tabBarLabelStyle: {
//         flex: 1,
//         fontSize: 20,
//         textAlign: 'center',
//         height: '100%',
//         textAlignVertical: 'center',
//       },
//       tabBarStyle: {
//         backgroundColor: '#039be5',
//         height: '10%',
//         borderBottomLeftRadius: 30,
//         borderBottomRightRadius: 30,
//       },
//       tabBarIndicatorContainerStyle: {
//         flex: 1,
//         width: '50%',
//         color: 'red',
//         alignItems: 'center',
//         height: 10,
//       },
//     }}>
//       <TopTab.Screen name="SignUp" component={SignUp} />
//       <TopTab.Screen name="SignIn" component={SignIn} />

//     </TopTab.Navigator>
//   )
// }


function BottomNavigation(params) {
  const { getUserDetails, userInfo, userToken } = useContext(AuthContext);
  {
    if (!userInfo) {
      try {
        let resp = getUserDetails(userToken.token.access);
        console.log("resp", resp)
      } catch (e) { Alert.alert('Error', String(e)) }
    }
  }


  return (
    <DrawerTab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4f36e9',
          borderColor: '#fff',

        },
        headerTitleStyle: {
          color: "white"
        }
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}

    //   headerStyle={{
    //   backgroundColor: '#1f65ff',
    //   borderRadius: 20,
    //   marginBottom: 20,
    //   marginTop: 5,
    //   paddingHorizontal: 12,
    //   paddingTop: 12,
    //   height: 70,
    //   borderColor: '#fff',
    //   marginHorizontal: 5,
    //   position: "absolute",
    // }}
    >
      <DrawerTab.Screen name="HOME" component={Home} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }} />

      <DrawerTab.Screen name="SIH HELP REQUEST" component={Help} options={{
        tabBarLabel: 'Help',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-question" color={color} size={26} />
        ),
      }} />

      <DrawerTab.Screen name="CROWDSOURCE" component={Contribute} options={{
        tabBarLabel: 'Contribute',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./src/images/ConIcon.png')}
            style={{
              width: 26,
              height: 26, tintColor: tintColor
            }}
          />
        ),
        //COLOR #69BDEC
        //f7f9fc
        // tabBarIcon: ({color}) => (
        //   <MaterialCommunityIcons name="home" color={color} size={26} />
        // ),
        // tabBarColor: '#5bdd6b'
      }} />

      <DrawerTab.Screen name="TIPS" component={Tips} options={{
        tabBarLabel: 'Tips',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="lightbulb-on" color={color} size={26} />
        ),
      }} />
    </DrawerTab.Navigator >
  )
}

function MainNavigate(params) {

  //retrive userToken and userInfo from Context 
  const { userToken, userInfo } = useContext(AuthContext);
  console.log('token', userToken)
  console.log('info', userInfo)

  return (
    <NavigationContainer>
      {

        (userToken) ?
          <BottomNavigation />
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
      <StatusBar style="auto" />
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