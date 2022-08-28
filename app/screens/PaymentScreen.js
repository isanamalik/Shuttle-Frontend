import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import appColors from '../colors';
import { easypaisa, ned } from '../constants/images';
import DropDown from '../components/DropDown';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const monthsList = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
]

const yearsList = [
    { label: "First", value: "First" },
    { label: "Second", value: "Second" },
    { label: "Third", value: "Third" },
    { label: "Fourth", value: "Fourth" }
]



const PaymentScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);


    const [month, setMonth] = React.useState(undefined);
    const [monthOpen, setMonthOpen] = React.useState(false);

    const onMonthOpen = React.useCallback(() => { }, []);

    const [year, setYear] = React.useState(undefined);
    const [yearOpen, setYearOpen] = React.useState(false);

    const onYearOpen = React.useCallback(() => { }, []);

    const { user } = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            axios.get(`${BASE_URL}/payment/get/${user.st_reg_number}`).then(res => {
                if (res.status === 200) {
                    setLoading(false);
                    setData(res.data);
                }
            }).catch(err => console.log(err.messsage));
        }, [])
    )

    if(loading){
        return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color={appColors.primary} size={'large'} />
        </View>
    } else {
        return (
            <View style={{ flex: 1, backgroundColor: '#800' }}>
                <View style={styles.top}>
                    <MaterialIcons
                        name="arrow-back"
                        size={35}
                        color="white"
                        onPress={() =>
                            navigation.navigate('StudentHomeScreen', {
                                title: 'StudentHomeScreen',
                            })
                        }
                    />
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 5 }}>
                        Shuttle Payment
                    </Text>
    
                    <View style={{ height: 33, width: 33 }} />
                </View>
                <View style={styles.bottomContainer}>
    
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff1f1', paddingVertical: 10, paddingHorizontal: 12, width: '100%' }}>
                        <Image source={easypaisa} style={{ height: 60, width: 60 }} resizeMode="contain" />
    
                        <Text style={{ fontSize: 16, paddingLeft: 10, color: appColors.primary, }}>Easy Paisa</Text>
                    </View>
    
    
                    <View style={{ marginTop: 20, width: '100%', }}>
                        <Text style={styles.detailsStyle}>Payment ID: {data?.payment_id}</Text>
                        <Text style={styles.detailsStyle}>Receiver: NED-UET Shuttle Service</Text>
                        <Text style={styles.detailsStyle}>Payment Method: {data?.payment_type}</Text>
                        <Text style={styles.detailsStyle}>Amount: Rs {data?.total_cost}</Text>
                    </View>
    
                    <DropDown
                        zIndex={3000}
                        zIndexInverse={3000}
                        placeholder="SELECT MONTH"
                        open={monthOpen}
                        value={month}
                        items={monthsList}
                        setOpen={setMonthOpen}
                        onOpen={onMonthOpen}
                        setValue={setMonth}
                    />
    
                    <DropDown
                        zIndex={20}
                        zIndexInverse={20}
                        placeholder="SELECT YEAR"
                        open={yearOpen}
                        value={year}
                        items={yearsList}
                        setOpen={setYearOpen}
                        onOpen={onYearOpen}
                        setValue={setYear}
                    />
    
                    <Text style={styles.detailsStyle}>Easy Paisa account no.</Text>
    
                    <TextInput
                        style={styles.input}
                        value={"03363567408"}
                    />
    
                    <Button
                        onPress={() => navigation.replace("PaymentOtpScreen", { data: data})}
                        style={styles.buttonStyle}>
                        <Text style={{ color: '#fff', fontSize: 14 }}>Submit</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomContainer: {
        flexGrow: 1,
        alignItems: 'center',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        paddingVertical: '6%',
        paddingHorizontal: '5%',
        backgroundColor: 'white',
        width: '100%',
    },
    top: {
        backgroundColor: '#800',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    inputContainer: {
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: appColors.lightGray,
        fontSize: 16,
        paddingLeft: 10,
        color: appColors.primary,
        marginBottom: 10,
        marginTop: 5,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 19,
    },
    detailsStyle: {
        fontSize: 16,
        color: appColors.primary,
        alignSelf: 'flex-start',
        padding: 2
    },
    buttonStyle: {
        height: 40,
        backgroundColor: '#800',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});

export default PaymentScreen;