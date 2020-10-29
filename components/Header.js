import React from 'react';
import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header(props) {
    return (
        <View style={styles.container}>
            <MaterialIcons name='menu' size={28} style={{ marginHorizontal: 10 }} onPress={() => props.navigation.openDrawer()} />
            <Text style={styles.title} >{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'flex-end',
        elevation: 3,
        backgroundColor: '#eee',
        // height: StatusBar.currentHeight + 40,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // borderWidth: 1,
        // borderColor: 'black',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
})