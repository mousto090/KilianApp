import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Card, List, Subheading, Title } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import base64 from 'react-native-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAccount } from 'store/accounts/selectors';
import { getPrograms } from 'store/programs/actions';
import { selectProgram } from 'store/programs/selectors';
import { consume, getAccount } from 'store/accounts/actions';
import { selectLoading } from 'store/global/selectors';
import { showModal } from '@store/global/actions';

const ScanScreen = () => {
    const dispatch = useDispatch()
    const [controls, setControls] = useState({
        uuid: null,
        compte: null
    });

    const { account, program, loading } = useSelector(createStructuredSelector({
        account: selectAccount(),
        program: selectProgram(),
        loading: selectLoading()
    }));

    const onSuccess = e => {
        const data = e.data.replace(/\s/g, '');
        const decoded: string = base64.decode(data.toString()).toString('base64');
        const UUID = decoded.split('=')[1].split('&')[0];
        const compte = decoded.split('=')[2];

        dispatch(getAccount({ uuid: UUID}))
        dispatch(getPrograms());

        setControls((prevState: any) => ({
            ...prevState,
            uuid: UUID,
            compte: compte
        }))
    }

    const onProgramPress = (item) => {
        console.log('item: ', item);
        dispatch(showModal({
            modalType: 'SPINNER',
            modalProps: {}
        }))

        const data = {
            type: "account",
            id: controls.uuid,
            relationship: {
                program: {
                    type: "programs",
                    id: item.uuid
                }
            }
        }
        dispatch(consume(data));
        
    }

    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              backgroundColor: "#CED0CE",
            }}
          />
        );
    };

    const RightContent = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <View style={styles.badge}>
                    <Text style={{ color: 'white' }} >
                        {Number(account.balance_plus) + Number(account.balance_standard)}
                    </Text>
                </View>
            </View>
        )
    }

    const VehiculeInfo = () => {
        if (account && account.vehicle_model && account.vehicle_plate_number) {
            return (
                <View>
                    <Text>
                        {`Modèle: ${account.vehicle_model}`}
                    </Text>
                    <Text>
                        {`Immatriculation: ${account.vehicle_plate_number.toString().toUpperCase()}`}
                    </Text>
                </View>
            )
        }
        return (
            <Text>
                Aucun vehicule associé à ce compte!
            </Text>
        )
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Scan Code" titleStyle={{ textAlign: 'center'}}
                    subtitle={controls.compte ? `Compte client: ${controls.compte}` : ''} 
                    subtitleStyle={{ textAlign: 'center'}} />
            </Appbar.Header>
            {!controls.uuid && <QRCodeScanner onRead={onSuccess} showMarker={true} />}
            { loading && (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
                    <ActivityIndicator color='#fbc02d' />
                </View>
            )}
            {controls.uuid && !loading &&
                <View style={styles.content}>
                
                <Card style={{}}>
                    <Card.Title title="Points cumulés" subtitle="Total des points cumulés"
                     right={RightContent}
                    />
                </Card>
                <Card style={{}}>
                    <Card.Title title="Informations sur le véhicule"/>
                    <Card.Content>
                        {VehiculeInfo()}
                    </Card.Content>
                </Card>
                <View style={styles.program}>
                   <Title>Liste des programmes</Title>
                   <Text style={styles.hint}>
                       Appuyez sur un programme pour débiter les points
                    </Text>
                    <FlatList
                        data={program}
                        renderItem={({ item }) => (
                            // <List.Item
                            //     title={`${item.label}`}
                            //     onPress={() => onProgramPress(item)}
                            // />
                            <Button 
                                key={item.uuid}
                                style={styles.item} 
                                mode='contained' 
                                onPress={() => onProgramPress(item)}>
                              {item.label}
                            </Button>
                        )}
                        keyExtractor={item => item.uuid}
                        ItemSeparatorComponent={renderSeparator}
                    />
                </View>
                </View>
            }
        </View>
    );
}

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
    },
    badge: {
        width: 90,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'green',
        alignItems: 'center',  
        justifyContent: 'center'
    },
    program: {
        flex: 1,
        marginHorizontal: 5
    },
    item: {
        margin: 5
    },
    hint: {
        fontSize: 12,
        fontStyle: 'italic'
    }
})