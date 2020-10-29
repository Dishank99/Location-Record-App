import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import Header from '../components/Header'
import Loader from '../components/Loader'
import db from '../firebase'

const ListCard = ({ item }) => {
    let dateTimeReceived = item.timestamp.toDate().toString()
    dateTimeReceived = dateTimeReceived.slice(0, dateTimeReceived.lastIndexOf('GMT'))
    // console.log(dateTimeReceived)

    return (
        <View style={styles.list__card}>
            <Text style={{ fontSize: 16 }} multiline adjustsFontSizeToFit >{item.displayAddress}</Text>
            <Text style={{ color: 'grey', fontStyle: 'italic', marginTop: 5 }}>{dateTimeReceived}</Text>
            {
                (item.locationAccessTime || item.addressAccessTime) && 
                <Text style={{ color: 'grey', fontStyle: 'italic', marginTop: 5 }}>
                    Coords: {item.locationAccessTime}s Add: {item.addressAccessTime}s
                </Text>
            }
        </View>
    )
}

export default function RecordsScreen(props) {

    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('fired')
        const unsubscribe = db.collection('records').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            let data = []
            // console.log(snapshot)
            snapshot.forEach(doc => {
                console.log(doc.data())
                data.push({
                    ...doc.data(),
                    key: doc.id,
                })
            })
            console.log(data)
            setRecords(data)
            setLoading(false)
            // console.log(records)
        }, (err) => {
            console.error(err)
            setLoading(false)
        })
        console.log(unsubscribe)

        // alway cleanup with unsubscribe or there will be a memory leak
        return () => unsubscribe && unsubscribe()
    }, [])

    // if (loading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size='large' color='rgb(21,115,186)' />
    //         </View>
    //     )
    // }
    // else {
    return (
        <View style={styles.container}>
            <Header title='Records' navigation={props.navigation} />

            <View style={styles.list__content}>
                {
                    loading ? <Loader /> :
                        <FlatList
                            data={records}
                            renderItem={ListCard}
                            ItemSeparatorComponent={() => (
                                <View
                                    style={{
                                        width: '80%',
                                        height: 1,
                                        backgroundColor: 'lightgrey',
                                        alignSelf: 'center'
                                    }}></View>
                            )}
                        />

                }



            </View>
            <StatusBar style="auto" />
        </View>
    );
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list__content: {
        marginVertical: '2%',
        marginHorizontal: '3.5%',//15,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
        flex: 1,
        // elevation: 2,
        // borderBottomEndRadius: 10,
        // borderBottomStartRadius: 10,
        // borderTopStartRadius: 10,
        // borderTopEndRadius: 10,
        margin: 5,
        // paddingHorizontal: 20,
    },
    list__card: {
        // margin: 5,
        padding: 10,
        // borderBottomRightRadius: ,
    },
});
