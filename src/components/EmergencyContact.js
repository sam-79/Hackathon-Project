import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Alert, Linking } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';



const CONTACTS = [
    { itemId: '1', title: "NATIONAL EMERGENCY NUMBER", number: 112 },
    { itemId: '2', title: "POLICE", number: 100 },
    { itemId: '3', title: "FIRE", number: 101 },
    { itemId: '4', title: "AMBULANCE", number: 102 },
    { itemId: '5', title: "Disaster Management Services", number: 108 },
    { itemId: '6', title: "Women Helpline", number: 1091 },
    { itemId: '7', title: "Women Helpline - Domestic Abuse", number: 181 },
    { itemId: '8', title: "Air Ambulance", number: 9540161344 },
    { itemId: '9', title: "Aids Helpline", number: 1097 },
    { itemId: '10', title: "Anti Poison New Delhi", number: [{ number: 1066 }, { number: 111066 }] },
    { itemId: '11', title: "Disaster Management N.D.M.A", number: 1123263260 },
    { itemId: '12', title: "EARTHQUAKE / FLOOD / DISASTER N.D.R.F", number: 1124363260 },
    { itemId: '13', title: "Deputy Commissioner Of Police - Missing Child And Women", number: 1094 },
    { itemId: '14', title: "Railway Enquiry", number: 139 },
    { itemId: '15', title: "Senior Citizen Helpline", number: [{ number: 1091 }, { number: 1291 }] },
    { itemId: '16', title: "Medical Helpline in Andhra Pradesh, Gujarat, Uttarakhand, Goa, Tamil Nadu, Rajasthan, Karnataka, Assam, Meghalaya, MP and UP", number: 108 },
    { itemId: '17', title: "Railway Accident Emergency Service", number: 1072 },
    { itemId: '18', title: "Road Accident Emergency Service", number: 1073 },
    { itemId: '19', title: "Road Accident Emergency Service On National Highway For Private Operators", number: 1033 },
    { itemId: '20', title: "ORBO Centre, AIIMS (For Donation Of Organ) Delhi", number: 1060 },
    { itemId: '21', title: "Call Centre", number: 1551 },
    { itemId: '22', title: "Relief Commissioner For Natural Calamities", number: 1070 },
    { itemId: '23', title: "Children In Difficult Situation", number: 1098 },
    { itemId: '24', title: "Central Vigilance Commission", number: 1964 },
    { itemId: '25', title: "Tourist Helpline", number: [{ number: 1363 }, { number: 1800111363 }] },
    { itemId: '26', title: "LPG Leak Helpline", number: 1906 },
]




function EmergencyContacts() {



    const NumberView = (prop) => {
        return (
            <View style={{ backgroundColor: '#fff', flexDirection: 'row', margin: 5 }}>
                <Text style={{ fontSize: 15, padding: 2, paddingHorizontal: 5, }}>Phone Number: {prop.number}</Text>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-end' }}>

                    <Pressable onPress={async () => {
                        let url = '';
                        Platform.OS === 'android' ? url = `tel:${prop.number}` : url = `telprompt:${prop.number}`
                        const supported = await Linking.canOpenURL(url);
                        if (supported) {
                            Linking.openURL(url);
                        } else {
                            Alert.alert(`Error`,'Unable perform the operation.');
                        }
                    }}
                        style={{
                            borderRadius: 5,
                            padding: 5,
                            backgroundColor: "#f71414"
                        }}
                    >

                        <Text style={{ color: "white", paddingHorizontal: 5, fontSize: 15 }}>Call</Text>

                    </Pressable>
                </View>
            </View>
        )
    }


    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* {console.log(item)} */}
            <Text style={{ fontSize: 20, fontWeight:'bold' }}>
                
                {'->'} {item.title}</Text>
            <View>
                {
                    typeof item.number == 'object' ?
                        (item.number).map((data, index) => {
                            return (
                                < NumberView number={data.number} key={index} />
                            )
                        })
                        :
                        <NumberView number={item.number} />
                }
            </View>


        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={CONTACTS}
                renderItem={renderItem}
                keyExtractor={index => index.itemId}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        // padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderEndColor: "black"
    },
})


export default EmergencyContacts;