import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@screens/auth/LoginScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNavigator;