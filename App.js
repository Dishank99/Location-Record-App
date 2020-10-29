import React from 'react';
import { StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen'
import RecordsScreen from './screens/RecordsScreens'
import DrawerNavigator from './routes/Drawer'

import { LogBox } from 'react-native';
import _ from 'lodash';


LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



export default function App() {
  return (

    <DrawerNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
