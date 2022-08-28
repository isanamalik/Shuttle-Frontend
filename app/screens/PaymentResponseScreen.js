import React, { useContext } from 'react';

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../colors';
import { easypaisa, ned } from '../constants/images';
import { AuthContext } from '../contexts/AuthContext';

const WINDOW_WIDTH = Dimensions.get('window').width;

const PaymentResponseScreen = ({navigation}) => {

    const { user } = useContext(AuthContext);

    const Card = ({status, studentName, date, paymentMethod, Time}) => {
        return(
            <View style={{width: WINDOW_WIDTH*0.9, paddingVertical: 10, flexDirection:'row', marginVertical: 15, backgroundColor:'#fff', elevation: 2,}}>

                <View style={{width:'12%', paddingVertical: 10, alignItems: 'flex-end'}}>
                    <View style={{height: 10, width: 10, backgroundColor:appColors.yellow, borderRadius: 10}} />
                </View>

                <View style={{width: '88%'}}>
                    <Text style={{fontSize: 14, paddingVertical: 6, paddingLeft: 5, color: appColors.primary}}>{status}</Text>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 14, paddingVertical: 6, color: appColors.primary, paddingLeft: 5, paddingRight: 20}}>{studentName}</Text>
                        <Text style={{fontSize: 14, paddingVertical: 6, color: appColors.primary, paddingLeft: 5, paddingRight: 20}}>{date}</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 14, paddingVertical: 6, color: appColors.primary, paddingLeft: 5, paddingRight: 20}}>{paymentMethod}</Text>
                        <Text style={{fontSize: 14, paddingVertical: 6, color: appColors.primary, paddingLeft: 5, paddingRight: 20}}>{Time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
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
                        PaymentScreen
                    </Text>

                    <View style={{ height: 33, width: 33 }} />
                </View>
                <View style={styles.bottomContainer}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff1f1', paddingVertical: 10, paddingHorizontal: 12, width: '100%' }}>
                        <Image source={easypaisa} style={{ height: 60, width: 60 }} resizeMode="contain" />

                        <Text style={{ fontSize: 16, paddingLeft: 10, color: appColors.primary, }}>Easy Paisa</Text>
                    </View>


                    <Card
                    date={new Date().getDate().toLocaleString() +"-"+ new Date().getMonth().toLocaleString() +"-"+ new Date().getFullYear().toLocaleString()}
                    // Time={"8:02"}
                    studentName={user?.st_name}
                    status={"Success"}
                    paymentMethod="EasyPaisa"
                    />

                </View>
            </View>
    )
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
})

export default PaymentResponseScreen;