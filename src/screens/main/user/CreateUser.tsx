import React, { useState } from 'react';
import { Appbar, Button } from 'react-native-paper';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from 'store/users/actions';
import StepIndicator from 'react-native-step-indicator';
import { Text as PaperText } from 'react-native-paper';
import { createStructuredSelector } from 'reselect';
import { selectLoading } from 'store/global/selectors';

import base64 from 'react-native-base64';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Vehicule from './Vehicule';
import UserDetail from './UserDetail';

const REGEX_PLATE_NUMBER = /^[a-zA-Z]{2}[-][0-9]{4}[-][a-zA-Z]{1}[a-zA-Z0-9]{0,1}$/;
const REGEX_PHONE = /^\d{9}$/;

const firstIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    separatorFinishedColor: '#4aae4f',
    separatorUnFinishedColor: '#a4d4a5',
    stepIndicatorFinishedColor: '#4aae4f',
    stepIndicatorUnFinishedColor: '#a4d4a5',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f',
};

const CreateUser = () => {
    const [controls, setControls] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        uuid: null,
        vehiculeModel: null,
        vehiculePlateNumber: '',
        vehiculeTankSize: null,
        compte: null
    });
    const dispatch = useDispatch();
    const { loading } = useSelector(createStructuredSelector({
        loading: selectLoading()
    }));

    const updateInputState = (key: string, value: string) => {
        setControls(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const onCreate = () => {
        Keyboard.dismiss();
        const { first_name, last_name, phone, vehiculeModel, vehiculePlateNumber, vehiculeTankSize } = controls;
        const data = {
            type: "users",
            attributes: {
                first_name,
                last_name,
                phone: '+224' + phone,
                additional_info: {
                    vehicle_model: vehiculeModel,
                    vehicle_plate_number: vehiculePlateNumber,
                    vehicle_tank_size: Number(vehiculeTankSize),
                }
            },
            relationships: {
                accounts: {
                    data: [{
                        type: "accounts",
                        id: controls.uuid
                    }]
                }
            }
        }
       
        if (first_name && last_name && phone && vehiculeModel && vehiculePlateNumber && vehiculeTankSize) {
            dispatch(createUserAction({ data }));
        }
    }

    const [currentPage, setCurrentPage] = React.useState<number>(0);

    const onStepPress = (position: number) => {
        // setCurrentPage(position);
    };

    const renderLabel = ({
        position,
        label,
        currentPosition,
    }: {
        position: number;
        stepStatus: string;
        label: string;
        currentPosition: number;
    }) => {
        return (
            <Text
                style={
                    position === currentPosition
                        ? styles.stepLabelSelected
                        : styles.stepLabel
                }
            >
                {label}
            </Text>
        );
    };

    const onSuccess = e => {
        const data = e.data.replace(/\s/g, '');
        const decoded: string = base64.decode(data.toString()).toString('base64');
        const UUID = decoded.split('=')[1].split('&')[0];
        const compte = decoded.split('=')[2];

        setControls((prevState: any) => ({
            ...prevState,
            uuid: UUID,
            compte: compte
        }))
        setCurrentPage(currentPage + 1);
    }

    const next = () => {
        setCurrentPage(currentPage + 1);
    }
    const goBackToScan = () => {
        setControls((prevState: any) => ({
            ...prevState,
            uuid: null,
            compte: null
        }))
        setCurrentPage(currentPage - 1);
    }
    const goBackToAccount = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Activation Compte Client" titleStyle={{ textAlign: 'center' }}
                subtitle={controls.compte ? `Compte client: ${controls.compte}` : ''} 
                subtitleStyle={{ textAlign: 'center'}} />
            </Appbar.Header>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={firstIndicatorStyles}
                    currentPosition={currentPage}
                    labels={['Scan', 'Account', 'Vehicule']}
                    renderLabel={renderLabel}
                    onPress={onStepPress}
                    stepCount={3}
                />
            </View>
            { currentPage === 0 &&
                <QRCodeScanner
                    onRead={onSuccess}
                    showMarker={true}
                />}
            { currentPage === 1 &&
                <View style={styles.content}>
                    <UserDetail onChangeText={(key, value) => updateInputState(key, value)}
                        phone={controls.phone}
                        firstName={controls.first_name}
                        lastName={controls.last_name} />
                    <View style={styles.btnContainer}>
                        <Button
                            icon="arrow-left" 
                            style={styles.btn} 
                            mode='contained' 
                            onPress={goBackToScan}>
                            <PaperText>Retour</PaperText>
                        </Button>
                        <Button  style={styles.btn} mode='contained' onPress={next}
                         disabled={
                             !controls.last_name ||
                             !controls.first_name ||
                             !controls.phone ||
                             !REGEX_PHONE.test(controls.phone)
                         }>
                            <PaperText>Suivant</PaperText>
                        </Button>
                    </View>
                </View>}
            { currentPage === 2 &&
                <View style={styles.content}>
                    <Vehicule onChangeText={(key, value) => updateInputState(key, value)}
                        vehiculeTankSize={controls.vehiculeTankSize}
                        vehiculePlateNumber={controls.vehiculePlateNumber}
                        vahiculeModel={controls.vehiculeModel} />
                    <View style={styles.btnContainer}>
                        <Button
                            icon="arrow-left" 
                            style={styles.btn} 
                            mode='contained' 
                            onPress={goBackToAccount}
                            disabled={loading}>
                            <PaperText>Retour</PaperText>
                        </Button>
                        <Button style={styles.btn} mode='contained' onPress={onCreate}
                         disabled={
                             !controls.vehiculeModel ||
                             !controls.vehiculePlateNumber ||
                             !controls.vehiculeTankSize ||
                             !REGEX_PLATE_NUMBER.test(controls.vehiculePlateNumber) ||
                             loading
                             
                         }
                         loading={loading}
                        >
                            <PaperText>Valider</PaperText>
                        </Button>
                    </View>
                </View>}
        </View>
    )
}

export default CreateUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
    },
    validteBtn: {
        
        width: '45%'
    },
    stepIndicator: {
        marginTop: 10,
        marginBottom: 5
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#999999',
    },
    stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4aae4f',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    btn: {
        width: '45%'
    }
})