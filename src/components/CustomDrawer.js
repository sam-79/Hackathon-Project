import React from 'react'
import { View, Text, Linking, Image } from 'react-native'
import { AuthContext } from '../context/AuthContext';


import {
    DrawerContentScrollView, DrawerItem, DrawerView
} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function CustomDrawer(props) {


    const { logOut } = React.useContext(AuthContext);

    return (
        <View style={{backgroundColor: '#3521b5',}}>
            <View
                style={{
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <Image
                    source={require('../images/SIHicon.png')}
                    style={{ height: 100, width: 100 }}
                />
            </View>

            <View style={{
                borderTopStartRadius:20,
                borderTopEndRadius:20,
                backgroundColor: '#fff',
                paddingTop:10
            }}>

                <DrawerItem
                    label="Home"
                    onPress={() => props.navigation.navigate("HOME")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='home' size={25} />
                    )}
                />
                <DrawerItem
                    label="Help"
                    onPress={() => props.navigation.navigate("SIH HELP REQUEST")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='handshake' size={25} />
                    )}
                />
                <DrawerItem
                    label="Contribute"
                    onPress={() => props.navigation.navigate("CROWDSOURCE")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='hand-coin' size={25} />

                    )} />
                <DrawerItem
                    label="Do's And Dont's"
                    onPress={() => props.navigation.navigate("TIPS")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='thumbs-up-down' size={25} />
                    )} />


                <DrawerItem
                    label="Helpline Number"
                    onPress={() => Linking.openURL('https://floodmanagement.herokuapp.com/')}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='phone' size={25} />
                    )}
                />

                <DrawerItem
                    label="FAQ"
                    onPress={() => Linking.openURL('https://floodmanagement.herokuapp.com/')}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='help-box' size={25} />
                    )}
                />

                <DrawerItem
                    label="Log Out"
                    onPress={() => logOut()}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='logout' size={25} />
                    )}
                />
            </View>

        </View>

    );
}

export default CustomDrawer