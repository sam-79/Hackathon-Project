import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { CrowdContext, CrowdProvider } from '../context/CrowdSource';

import Contribute01 from '../components/Contribute01';
import Contribute04 from '../components/Contribute04';
import Contribute03 from '../components/Contribute03';


const TopTab = createMaterialTopTabNavigator();


export default function Contribute() {
  return (
    <CrowdProvider>

      <TopTab.Navigator>
        <TopTab.Screen name="Add Data" component={Contribute01} />
        <TopTab.Screen name="Show Data" component={Contribute04} />
        <TopTab.Screen name="Your Data" component={Contribute03} />
      </TopTab.Navigator>
    </CrowdProvider>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  inputArea: {
    width: '100%'
  },
  textinput: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  map: {
    height: '100%',
    width: '100%',

    elevation: 5,
  }
});
