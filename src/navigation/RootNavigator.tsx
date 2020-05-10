import React from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../store/auth/selectors';


const RootNavigator = () => {
    const { user } = useSelector(createStructuredSelector({
        user: selectUser()
    }));

    if (!user.isLoggedIn) return <MainNavigator />
    return <AuthNavigator />
}

export default RootNavigator;