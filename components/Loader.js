import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loader(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='rgb(21,115,186)' />
        </View>
    );
}

