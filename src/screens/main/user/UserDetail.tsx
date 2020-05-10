import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

const UserDetail = (props) => {
    const { onChangeText, phone } = props;
    
    return (
        <View>
            <TextInput 
                label="Nom" 
                mode='outlined' 
                placeholder="Entrez votre nom"
                onChangeText={(value) => onChangeText('last_name', value)}
                style={styles.input}
                value={props.lastName} />
            <TextInput 
                label="Prénom" 
                mode='outlined'
                placeholder='Entrez votre prénom'
                onChangeText={(value) => onChangeText('first_name', value)}
                style={styles.input}
                value={props.firstName} />
            <TextInput 
                label="Numéro de téléphone" 
                mode='outlined'
                placeholder='666 12 34 56'
                keyboardType='numeric'
                value={props.phone}
                render={props => (
                    <TextInputMask {...props} mask="[000] [00] [00] [00]"
                    onChangeText={(formatted, extracted) => onChangeText('phone', extracted)} 
                    value={phone}/>
                  )}
                 />
        </View>
    );
}

export default UserDetail;

const styles = StyleSheet.create({
    input: {
        marginBottom: 10
    }
})