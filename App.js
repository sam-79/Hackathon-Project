
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/screens/Home';
import Help from './src/screens/Help';
import Contribute from './src/screens/Contribute';
import Tips from './src/screens/Tips';



// creating Bottom navigation TAB object
const Tab = createMaterialBottomTabNavigator();


export default function App() {

  return (
      <NavigationContainer>
        <StatusBar barStyle={null} />
        <Tab.Navigator
        >

          <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }} />

          <Tab.Screen name="Help" component={Help} options={{
            tabBarLabel: 'Help',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            tabBarColor: '#b15bdd'

          }} />

          <Tab.Screen name="Contribute" component={Contribute} options={{
            tabBarLabel: 'Contribute',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            tabBarColor: '#5bdd6b'
          }} />

          <Tab.Screen name="Tips" component={Tips} options={{
            tabBarLabel: 'Tips',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }} />


        </Tab.Navigator>
      </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});