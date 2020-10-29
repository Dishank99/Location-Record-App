import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import RecordsScreen from '../screens/RecordsScreens'

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
    Records: {
        screen: RecordsScreen,
    }
}, {
    itemStyle: { textAlign: 'center' }
})

export default createAppContainer(DrawerNavigator);
