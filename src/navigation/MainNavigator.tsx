import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '@screens/main/MainScreen';
import ScanScreen from '@screens/main/ScanScreen';
import CreateUser from '@screens/main/user/CreateUser';
import PointAccumulationScreen from '@screens/main/PointAccumulationScreen';

import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();


const MainNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Scan" component={ScanScreen} />
                <Stack.Screen name="CreateUser" component={CreateUser} />
                <Stack.Screen name="PointAccumulation" component={PointAccumulationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;