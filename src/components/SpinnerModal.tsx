import React from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';

const SpinnerModal = ({ close }) => {
    return (
        <Modal transparent={true} visible={true} onRequestClose={close}>
            <View style={styles.container}>
                <ActivityIndicator size='large' color={'#fff263'} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .7)'
    },
});
export default SpinnerModal;