import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import OtpInput from '../components/OtpInput';
import { BASE_URL } from '../config';

const PaymentOtpScreen = ({ navigation, route }) => {

    const [code, setCode] = useState("");

    const insertPayment = () => {
        const requestData = route?.params?.data;
        delete requestData['_id'];
        axios.post(`${BASE_URL}/payment/insert`, requestData).then(res => {
            navigation.replace("PaymentResponseScreen");
        }).catch(err => console.log(err.messsage));
    }

    useEffect(() => {
        if (code?.length === 4) insertPayment();
    }, [code])

    return (
        <View style={{ flex: 1, backgroundColor: '#57b894', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ paddingHorizontal: 10, paddingVertical: 20, backgroundColor: '#fff', borderRadius: 10, }}>

                <Text style={{ fontSize: 18, color: '#57b894', fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, }}>VERIFICATION CODE</Text>

                <OtpInput
                    code={code}
                    onChangeText={(val) => setCode(val)}
                />
            </View>
        </View>
    )
}

export default PaymentOtpScreen;