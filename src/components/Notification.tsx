import React from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNotification } from 'store/global/selectors';

const Notification = () => {

    const { notification } = useSelector(createStructuredSelector({
        notification: selectNotification(),
    }));
    const onDismissSnackBar = () => {
        console.log('onDismissSnackBar')
    }

    return (
        <View>
            <Snackbar
                visible={notification.type !== null}
                duration={1000}
                onDismiss={onDismissSnackBar}
                style={{
                    backgroundColor: notification.type && notification.type === 'error' ? '#ff1744' : 
                    notification.type && notification.type === 'success' ?  '#388e3c' : '' 
                }}
                >
                { notification && notification.props && notification.props.message }
            </Snackbar>
        </View>
    );
}

export default Notification;