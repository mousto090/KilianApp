import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';

const codes = ['code 1', 'code 2']

const SignUpScreen = () => {
    const [state, setState] = useState({
        code: ''
    })

    return (
        <View style={styles.container}>
            <TextInput label="Nom" mode='outlined' placeholder="Entrez votre nom" />
            <TextInput label="Prénom" mode='outlined' />
            <TextInput label="Numéro de téléphone" mode='outlined' />
            <TextInput
                mode="outlined"
                value={state.code}
                render={(props) => (
                    <Picker
                        selectedValue={state.code}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log('itemValue: ', itemValue);
                            let code = itemValue as string;
                            setState({ code });
                        }}
                        style={{ height: 54, marginTop: 10 }}
                    >
                        <Picker.Item label="Selectionner le Code compte" value={''} />
                        {codes.map(code => (
                            <Picker.Item  label={code} value={code} key={code} />
                        ))}
                    </Picker>
                )}
            />
            <View style={styles.validteBtn}>
                <Button mode='contained'>
                    Valider
                </Button>
            </View>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 30
    },
    validteBtn: {
        marginTop: 30
    }
})