import { AppLoading } from 'expo';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Button, Alert, ActivityIndicator } from 'react-native';
import Header from '../components/Header'
import Loader from '../components/Loader'
import * as Location from 'expo-location'
import db from '../firebase'
import firebase from 'firebase'
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default function HomeScreen(props) {

    const [loading, setLoading] = useState(true)
    const [location, setLocation] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [accessTime, setAccessTime] = useState()

    const getLocation = async () => {
        // try {
        !loading && setLoading(true)

        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
        }
        else {
            // navigator.geolocation.getCurrentPosition(position=>{var location = position},err=>console.error(err),{enableHighAccuracy:true})
            let start = Date.now()
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation,
            });
            console.log('location got')
            const diff1 = Date.now() - start

            // setLocation(location);
            start = Date.now()
            fetch(
                'https://us1.locationiq.com/v1/reverse.php?key=pk.fe79f972a1fb5316b6b3e42607d6ff7d&format=json&lat=' + location.coords.latitude + '&lon=' + location.coords.longitude
            )
                .then(response => {
                    console.log('response got')
                    if (!response.ok) {
                        throw Error(response.statusText)
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data.display_name)
                    const diff2 = Date.now() - start
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        displayAddress: data.display_name,
                    })
                    setLoading(false)
                    setAccessTime({locationAccessTime: diff1/1000,
                        addressAccessTime: diff2/1000,})
                })
                .catch(error => { setErrorMsg(error), setLoading(false) })
            // setLocation(geolocation);
            // if (geolocation[0].street !== null) {
            //   setLocation([...geolocation]);
            // }
        }
        // } catch (error) {
        //     console.log(error)
        //     setErrorMsg(error.message)
        // }
    }

    const handleSend = () => {
        if (location) {
            setLoading(true)
            db.collection('records').add({
                ...location, timestamp: firebase.firestore.FieldValue.serverTimestamp(), ...accessTime
            }).then((res) => {
                setLoading(false)
                res && Alert.alert('Success', 'Location Recorded')
            }).catch(err => {
                console.error(err)
                setLoading(false)
                // getLocation();
            })
        }
    }

    useEffect(() => {
        getLocation();
        
    }, [])

    useEffect(() => {
        if (errorMsg) {
            console.log(errorMsg)
            console.log(typeof errorMsg)

            Alert.alert('Warning', errorMsg)
            setLoading(false)
        }
    }, [errorMsg])

    useEffect(()=>{
        accessTime && Alert.alert('Info', `Coords Time: ${accessTime.locationAccessTime}\nAddress Time: ${accessTime.addressAccessTime}`)
    },[accessTime])

    const LocationForm = () => (
        <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>

            <Text style={{ fontSize: 18 }}>You are at,</Text>
            <View style={styles.addressForm}>
                <Text style={styles.addressText} multiline onPress={getLocation}>
                    {location.displayAddress}
                </Text>
                <Button title='Send' onPress={handleSend} />
            </View>
            <Text>Click on the Address above to Refresh</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Header title='Home' navigation={props.navigation} />
            {loading ? <Loader /> : <LocationForm />}
            <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    addressForm: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    addressText: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 15,
        borderStyle: 'dashed',
        height: 'auto',
        width: '70%',
        marginHorizontal: 10,
        fontSize: 16,
        lineHeight: 25,
    },
});
