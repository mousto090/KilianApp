import React from 'react';
import { Appbar, Button } from 'react-native-paper';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux'
import { logoutAction } from 'store';

const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutAction());
    }

    const navigateTo = (screen: string) => {
        navigation.navigate(screen);
    }
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Shell"  />
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>
            <View style={styles.content}>
                <View style={styles.validteBtn}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('assets/images/debit.jpeg')}
                            style={{ height: 40, width: 50 }}
                            resizeMode="contain" />
                        <View style={{ flex: 1 }}>
                            <Button mode='contained' onPress={() => navigateTo('PointAccumulation')}>
                                Cumuler des points
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={styles.validteBtn}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('assets/images/customer_add.jpeg')}
                            style={{ height: 40, width: 50 }}
                            resizeMode="contain" />
                        <View style={{ flex: 1 }}>
                            <Button mode='contained' onPress={() => navigateTo('CreateUser')}>
                                Enregistrer client
                           </Button>
                        </View>
                    </View>
                </View>
                <View style={styles.validteBtn}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('assets/images/scan.jpeg')}
                            style={{ height: 40, width: 50 }}
                            resizeMode="contain" />
                        <View style={{ flex: 1 }}>
                            <Button mode='contained' onPress={() => navigateTo('Scan')}>
                                Débiter des points
                           </Button>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.logoContainer}>
                <Image source={require('assets/images/logo.png')}
                    style={{ height: 80, width: 150 }}
                    resizeMode="contain" />
            </View>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {},
    content: {
        marginHorizontal: 10,
        marginTop: 10,
        flex: 1
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    validteBtn: {
        marginTop: 30
    },
    logoContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
})