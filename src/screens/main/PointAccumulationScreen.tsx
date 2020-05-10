import { Picker } from '@react-native-community/picker';
import React, { useState } from 'react';
import { Alert, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Checkbox, Colors, DataTable, TextInput, Title, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { createStructuredSelector } from 'reselect';
import { selectLoading } from 'store/global/selectors';

import base64 from 'react-native-base64';
import { recordSale } from 'store/users/actions';
import { hideNotification, showModal, showNotification } from 'store/global/actions';
import { selectAccount } from 'store/accounts/selectors';
import { getAccount } from 'store/accounts/actions';

import NumberFormat from 'react-number-format';

const data = [
    "Shell Super Exra",
    "Shell Diesel Extra",
    "Lubrifiants",
    "Vidange"
];

const PointAccumulationScreen = (props) => {
    const dispatch = useDispatch()
    const [controls, setControls] = useState({
        product: '',
        totalPrice: '',
        uuid: null,
        compte: '',
        pin: '',
        services: []
    });

    const { loading, account } = useSelector(createStructuredSelector({
        loading: selectLoading(),
        account: selectAccount(),
    }));

    const [checked, setChecked] = useState(false);

    const addNewService = () => {
        const { product, totalPrice } = controls;
        if (product && totalPrice) {
            const service = [{
                product,
                total_price: Number(totalPrice)
            }];
            setControls((prev: any )=> ({
                ...prev,
                services: prev.services.concat(service),
                product: '', 
                totalPrice: ''
            }))
            Keyboard.dismiss();
        }
    }

    const updateInputState = (key: string, value: string) => {
            setControls(prevState => ({
                ...prevState,
                [key]: value.replace(/[^0-9]/g, '')
            }))
    }

    const onSuccess = e => {
        const data = e.data.replace(/\s/g, '');
        const decoded: string = base64.decode(data.toString()).toString('base64');
        const UUID = decoded.split('=')[1].split('&')[0];
        const compte = decoded.split('=')[2];
        dispatch(getAccount({ uuid: UUID}))

        setControls((prevState: any) => ({
            ...prevState,
            uuid: UUID,
            compte: compte
        }))
    }

    const onValidate = () => {
        Keyboard.dismiss();
        const { pin, services, uuid } = controls;
        if(!pin && !services.length) {
            dispatch(showNotification({
                notificationType: 'error',
                props: {
                    message: 'Veuillez saisir un code PIN et ajouter au moins une entrée de produits vendus!'
                }
            }))
            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000);
            return;
        }
        if (!pin) {
            dispatch(showNotification({
                notificationType: 'error',
                props: {
                    message: 'Veuillez saisir un code PIN!'
                }
            }))
            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000);
            return;
        }
        if (!services.length) {
            dispatch(showNotification({
                notificationType: 'error',
                props: {
                    message: 'Veuillez ajouter au moins une entrée de produits vendus!'
                }
            }))
            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000);
            return;
        }
        if (pin && services.length && uuid) {
            dispatch(showModal({
                modalType: 'SPINNER',
                modalProps: {}
            }))
            const paymentMethod = checked ? '1' : '0';
            const data = {
                data: {
                    type: 'sales',
                    attributes: {
                      payment_method: paymentMethod,
                      pin,
                      lines: services
                    },
                    relationships: {
                      account: {
                        data: {
                          type: 'accounts',
                          id: uuid
                        }
                      },
                    }
                  }
            }
            dispatch(recordSale(data));
        }
    }

    const removeService = (item, index) => {
        Alert.alert(
            'Confirmer la suppression',
            'Voulez vous vraiment supprimer cet élément ?',
            [
             
              {
                text: 'Annuler',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'OK', onPress: () => {
                const newServices = [...controls.services];
                newServices.splice(index, 1);
                   
                setControls((prev: any )=> ({
                    ...prev,
                    services: newServices,
                    product: '', 
                    totalPrice: ''
                }))
              } }
            ],
            { cancelable: false }
          );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Cumul de points" 
                subtitle={
                    (controls.uuid && account.vehicle_model&&  account.vehicle_plate_number) ?
                    `${account.vehicle_model} / ${account.vehicle_plate_number.toString().toUpperCase()}`
                    : ''
                    } />
                {!loading && controls.uuid && <Appbar.Action icon="check"  onPress={onValidate}/> }
                {loading && <ActivityIndicator animating={true} color={Colors.white} />}
            </Appbar.Header>
            {!controls.uuid &&
                    <QRCodeScanner
                        onRead={onSuccess}
                        showMarker={true}
                    />}
            {controls.uuid &&
             <View style={styles.content}>
                
                <TextInput
                    label='Compte client'
                    mode='outlined'
                    value={controls.compte}
                    editable={false} />
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {setChecked(!checked)}}
                    />
                    <Text>
                        Paiement par carte
                    </Text>
                </View>
                <TextInput
                    label='Code PIN'
                    mode='outlined'
                    onChangeText={(value) => updateInputState('pin', value)}
                    keyboardType='numeric'
                    value={controls.pin} />

                <Title>Liste des services vendus:</Title>

                <View style={styles.row}>
                    <View style={styles.inputWrap}>
                        <TextInput
                            mode="outlined"
                            value={controls.product}
                            render={(props) => (
                                <Picker
                                    selectedValue={controls.product}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let code = itemValue as string;
                                        if (code !== '') {
                                            setControls(prev => ({
                                                ...prev,
                                                product: code
                                            }))
                                        }
                                    }}
                                    style={{ height: 47, marginTop: 2 }}
                                >
                                    <Picker.Item label="Liste des produits" value={''} />
                                    {data.map(code => (
                                        <Picker.Item label={code} value={code} key={code} />
                                    ))}
                                </Picker>
                            )}
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        {/* <TextInput 
                            label='Montant'
                            mode='outlined'
                            keyboardType='numeric'
                            value={controls.totalPrice}
                            onChangeText={(value) => updateInputState('totalPrice', value)}  /> */}
                        <NumberFormat
                            value={controls.totalPrice}
                            displayType={'text'}
                            thousandSeparator={' '}
                            renderText={value => (
                                <TextInput
                                    label='Montant'
                                    mode='outlined'
                                    keyboardType='numeric'
                                    value={value}
                                    onChangeText={(value) => updateInputState('totalPrice', value)} />
                            )}
                        />
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Button icon="check" mode='contained' onPress={addNewService}>
                        </Button>
                    </View>
                </View>

                <ScrollView style={{ flex: 1,  backgroundColor: 'white' }}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Libellé</DataTable.Title>
                            <DataTable.Title numeric>Montant</DataTable.Title>
                        </DataTable.Header>

                        {controls.services.map((service: { product: string, total_price: number }, index: number) => (
                            <TouchableRipple
                            key={`${service.product}-${service.total_price}-${index}`}
                            onPress={() => {}}
                            onLongPress={() => {
                                removeService(service, index)
                            }}>
                                <DataTable.Row key={`${service.product}-${service.total_price}-${index}`}>
                                <DataTable.Cell>{service.product}</DataTable.Cell>
                                <DataTable.Cell numeric>{formatNumber(Number(service.total_price))}</DataTable.Cell>
                            </DataTable.Row>
                            </TouchableRipple>
                        ))}

                    </DataTable>
                    
                </ScrollView>
              
            </View>
            }
            
        </View>
    );
}

export default PointAccumulationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {},
    content: {
        marginHorizontal: 10,
        marginTop: 10,
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    validteBtn: {
        marginTop: 30
    },
    row: {
        flexDirection: "row",
        marginBottom: 15,
      },
      inputWrap: {
        flex: 1,
        marginRight: 10
      },
      inputdate: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595"
      },
      inputcvv: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595"
      }
})

function formatNumber(num: number) {
    return num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').replace('.', ',');
}