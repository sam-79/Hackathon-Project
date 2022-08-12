import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal, Pressable } from 'react-native';
import { HelpContext, HelpProvider } from '../context/HelpContext';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Help1 from '../components/Help1';
import Help2 from '../components/Help2';
import Help3 from '../components/Help3';


const TopTab = createMaterialTopTabNavigator();


export default function Help() {
    return (
        <HelpProvider>
            <TopTab.Navigator>
                <TopTab.Screen name="Add Data" component={Help1} />
                <TopTab.Screen name="Show Data" component={Help2} />
                <TopTab.Screen name="Your Data" component={Help3} />
            </TopTab.Navigator>
        </HelpProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        textAlign: 'center',
        width: '100%',
        height: '10%',
        fontSize: 25
    },
    form: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        borderRadius: 5,
        borderWidth: 1,
    },
    btn: {
        marginTop: 30,
        backgroundColor: '#acbcd2'
    },
    map: {
        height: '100%',
        width: '100%',
    }

});
