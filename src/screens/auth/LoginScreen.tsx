import React, { useState } from 'react';
import { Image, ImageBackground, Keyboard, StyleSheet, View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from 'store';
import { createStructuredSelector } from 'reselect';
import { selectLoading } from 'store/global/selectors';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [controls, setControls] = useState({
        username: '',
        password: ''
    });

    const [state, setState]= useState({
        textSecureEntry: true
    })

    const { loading } = useSelector(createStructuredSelector({
        loading: selectLoading()
    }));

    const onLogin = () => {
        Keyboard.dismiss();
        const { username, password } = controls;
        dispatch(authenticate({ username, password }))
    }

    const updateInputState = (key: string, value: string) => {
        setControls(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../assets/images/auth.jpeg')}
                style={styles.backgroundImage}>
                <View style={styles.logoContainer}>
                    <Image source={require('assets/images/logo.png')}
                        style={{ height: 40, width: 150 }}
                        resizeMode="contain" />
                </View>
            <View style={styles.content}>

                <Card>
                    <Card.Content>
                        <TextInput
                            label="Nom d'utilisateur"
                            onChangeText={(value) => updateInputState('username', value)}
                            value={controls.username}
                            style={styles.input}
                            autoCapitalize={'none'}
                        />
                        <TextInput
                            label='Mot de passe'
                            secureTextEntry={state.textSecureEntry}
                            onChangeText={(value) => updateInputState('password', value)}
                            value={controls.password}
                            style={styles.input}
                            right={
                                <TextInput.Icon
                                    name={state.textSecureEntry ? 'eye' : 'eye-off'}
                                    onPress={() =>
                                        setState({
                                            textSecureEntry: !state.textSecureEntry,
                                        })
                                    }
                                    forceTextInputFocus={false}
                                />
                            } />
                    <View style={styles.loginBtn}>
                        <Button mode="contained"
                                onPress={onLogin}
                                loading={loading}
                                disabled={loading}
                                >
                                Se Connecter
                                
                        </Button>
                    </View>
                    </Card.Content>
                </Card>
            </View>
            </ImageBackground>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
        marginTop: 30
    },
    loginBtn: {
        marginTop: 30
    },
    signupBtn: {
        alignItems: 'flex-end'
    },
    input: {
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        width: '100%', 
        height: '100%',
        resizeMode: 'cover',
    },
    logoContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    
})