import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

const Vehicule = (props) => {
    const { onChangeText, vehiculePlateNumber, vahiculeModel } = props;

    return (
        <View>
            <TextInput
                label="Modèle"
                mode='outlined'
                placeholder="Modèle du véhicule"
                onChangeText={(value) => onChangeText('vehiculeModel', value)}
                style={styles.input}
                value={vahiculeModel} />
            <TextInput
                label="Immatriculation"
                mode='outlined'
                placeholder="Numéro d'immatriculation du véhicule"
                style={styles.input}
                value={vehiculePlateNumber.toUpperCase()}
                render={props => (
                    <TextInputMask {...props} 
                    mask="[AA]-[0000]-[A][_]"
                    onChangeText={(formatted, extracted) => onChangeText('vehiculePlateNumber', formatted)} 
                    value={vehiculePlateNumber.toUpperCase()}
                    />
                  )} />
            <TextInput
                label="Réservoir"
                mode='outlined'
                placeholder='Taille du réservoir du véhicule'
                value={props.vehiculeTankSize}
                onChangeText={(value) => onChangeText('vehiculeTankSize', value.replace(/[^0-9]/g, ''))
                }
                keyboardType='numeric' />
        </View>
    );
}

export default Vehicule;

const styles = StyleSheet.create({
    input: {
        marginBottom: 10
    }
})