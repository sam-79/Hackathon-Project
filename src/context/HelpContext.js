import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { CrowdContext } from './CrowdSource';

export const HelpContext = createContext();


export const HelpProvider = ({ children }) => {

    const [userRequestData, setUserRequestData] = useState(null);
    const [allRequestData, setAllRequestData] = useState(null);


    // send Request
    const sendRequestData = (token, latitude, longitude, TypeOfEmergency) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "latitude": String(latitude),
            "longitude": String(longitude),
            "TypeOfEmergency": String(TypeOfEmergency)
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://floodmanagement.herokuapp.com/api/floodmanagement/help/", requestOptions)
            .then(response => response.text())
            .then(result => Alert.alert("resp", String(result)))
            .catch(error => console.log('error', error));
    }

    // Get all request data submitted by logged in user
    const getCurrentUserRequestData = (token) => {

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://floodmanagement.herokuapp.com/api/floodmanagement/helplist/", requestOptions)
            .then(response => response.json())
            .then(result => setUserRequestData(result))
            .catch(error => console.log('error', error));

    }

    // Get all request data submitted by all user
    const getRequestData = (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://floodmanagement.herokuapp.com/api/floodmanagement/help/", requestOptions)
            .then(response => response.json())
            .then(result => setAllRequestData(result))
            .catch(error => console.log('error', error));
    }


    const deleteRequestData = (token, id) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://floodmanagement.herokuapp.com/api/floodmanagement/helpdetails/${id}/`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if(result.length == 0){
                    Alert.alert("Deleted","Request Successfully Deleted")
                }else{
                    Alert.alert("Error","Request Not Deleted")
                }
            })
            .catch(error => console.log('error', error));
    }

    const getRequestDataById = async (token, id) => {

        let promise = new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://floodmanagement.herokuapp.com/api/floodmanagement/helpdetails/${id}/`, requestOptions)
                .then(response => response.json())
                .then(result => { resolve(result) })
                .catch(error => { reject(error) });
        })
        
        return promise;

    }

    return (
        <HelpContext.Provider value={{ sendRequestData, getCurrentUserRequestData, getRequestData, deleteRequestData,getRequestDataById , userRequestData, allRequestData }}>
            {children}
        </HelpContext.Provider>
    )

}