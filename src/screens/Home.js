import React, { useContext, } from 'react';
import { StyleSheet,Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Notifications from '../components/Notifications';
import Dashboard from '../components/Dashboard';
import LiveWeather from '../components/LiveWeather';
import Inundation from "../components/Inundation";
import FloodForecast from "../components/FloodForecast";
import SafetyTips from "../components/SafetyTips";
import EmergencyContacts from "../components/EmergencyContact";

import Help from './Help';
import Contribute from './Contribute';
import Tips from './Tips';
import SOS from '../components/SOS';

import CustomDrawer from '../components/CustomDrawer';


import { AuthContext } from '../context/AuthContext';



// creating Drawer navigation TAB object
const DrawerTab = createDrawerNavigator();

export default function DrawerNavigation(params) {
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
            initialRouteName="Dashboard"
            backBehavior='history'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6FD1F9',
                    elevation: 0,
                },
                headerTitleStyle: {
                    color: "white"
                },
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}

        >

            <DrawerTab.Screen name="SIH HELP REQUEST" component={Help} />

            <DrawerTab.Screen name="CROWDSOURCE" component={Contribute} />

            <DrawerTab.Screen name="TIPS" component={Tips} />

            <DrawerTab.Screen
                name="Dashboard"
                component={Dashboard}
            />

            <DrawerTab.Screen name='Notifications'
                component={Notifications}
            />

            <DrawerTab.Screen name='LiveWeather'
                component={LiveWeather}
            />
            <DrawerTab.Screen name='SOS'
                component={SOS}
            />

            <DrawerTab.Screen name='Inundation'
                component={Inundation}
            />

            <DrawerTab.Screen name='FloodForecast'
                component={FloodForecast}
            />

            <DrawerTab.Screen name='Safety Tips'
                component={SafetyTips}
            />

            <DrawerTab.Screen name='EmergencyContacts'
                component={EmergencyContacts}
            />
        </DrawerTab.Navigator >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        width: "100%",
        height: "100%",
    },
});
