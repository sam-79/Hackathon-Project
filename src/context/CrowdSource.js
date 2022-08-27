import React, { createContext, useState, useEffect } from 'react';
import {DJANGO_API_ENDPOINT} from "@env";

import { Alert, Platform } from 'react-native';

export const CrowdContext = createContext();

export const CrowdProvider = ({ children }) => {

    const [crowdData, setCrowdData] = useState(null);
    const [userCrowdData, setUserCrowdData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    const getCrowdData = (token) => {


        // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU4NzY0MTA5LCJpYXQiOjE2NTg3NjI5MDksImp0aSI6IjcyOWRjZWRmYWMxMTQ2Y2E5ZmMzZjZlZmVlNGQzYWM1IiwidXNlcl9pZCI6MX0.z877kvgmyhXMwPM2VcCh2G3FHKw9UVe-jUMlO6Gwf0Y"
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DJANGO_API_ENDPOINT}/api/floodmanagement/crowdsource/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("server resp", data);
                setCrowdData(data);
            })
            .catch(error => console.log('error', error));
    }
    const sendCrowdData = async (token, longitude, latitude, category, description, image) => {
        // console.log("sendCrowdData", token)

        setIsLoading(true);

        var fileName = `${Math.floor(Date.now() / 1000)}_${latitude}_${longitude}.jpg`

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        myHeaders.append('Content-Type', 'multipart/form-data');

        var formdata = new FormData();
        formdata.append("latitude", String(latitude));
        formdata.append("longitude", String(longitude));
        formdata.append("description", description);
        formdata.append("category", category);
        formdata.append("image", {
            uri: image.uri,
            type: "image/jpg",
            name: `${fileName}.jpg`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${DJANGO_API_ENDPOINT}/api/floodmanagement/crowdsource/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                Alert.alert("Submitted", `Data submitted \nid : ${result.id} \nCreated at : ${result.created_at}`)
            })
            .catch(error => {
                setIsLoading(false);
                Alert.alert('error', String(error))
            });
    }

    const getCurrentUserCrowdData = (token) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DJANGO_API_ENDPOINT}/api/floodmanagement/crowdsourcelist/`, requestOptions)
            .then(response => response.json())
            .then(result => setUserCrowdData(result))
            .catch(error => {
                console.log(error)
                Alert.alert('error', `${error}`)
            });

    }

    const updateCrowdData = () => {
        console.log("updateCrowdData")
    }

    const deleteCrowdData = (token, id) => {
        console.log("deleteCrowdData ")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DJANGO_API_ENDPOINT}/api/floodmanagement/crowdsourcedetails/${id}/`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result.length == 0) {
                    Alert.alert("Deleted", "Data Successfully Deleted")
                } else {
                    Alert.alert("Error", "Data Not Deleted")
                }
            })
            .catch(error => console.log('error', error));


    }

    const getCrowdDataById = async (token, id) => {

        let promise = new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${DJANGO_API_ENDPOINT}/api/floodmanagement/crowdsourcedetails/${id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    resolve(result)
                })
                .catch(error => { reject(error) });
        })

        return promise;

    }


    return (
        <CrowdContext.Provider value={{ crowdData, getCrowdData, sendCrowdData, updateCrowdData, deleteCrowdData, getCrowdDataById, getCurrentUserCrowdData, userCrowdData, isLoading }}>{children}</CrowdContext.Provider>
    );
};
