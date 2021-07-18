import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image, TouchableOpacity, ScrollView,Linking } from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import Header from '../../components/Header'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import ShuttleNumberScreen from "./ShuttleNumberScreen";
import StudentInfo from "./StudentInfo";
import NotificationScreen from "./NotificationScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header'
import LogoutButton from '../components/LogoutButton';

const Tab = createMaterialBottomTabNavigator();

const AdminHomeScreen = ({ route, navigation }) => {
const registration_no = route.params.registration;
  console.log('props registration no.', registration_no)
// const { registration_no } = route.params;
    return (
        <View style={styles.container}>
        <LogoutButton logout={() => navigation.navigate('LoginScreen')} />
            {/* Banner */}
            <Header title="Welcome Wheels Admin"/>
   
           <View style={styles.categoryContainer2}>
           <TouchableOpacity onPress={() => navigation.navigate('AdminUpdateFeeScreen')}
          style={styles.categoryBtn}>
          <View style={styles.categoryIcon}>
            <Ionicons
              name="cash-outline"
              size={35}
              color="#FFF"
            />
            <Text style={styles.categoryBtnTxt}>Update Fee Status</Text>
          </View>
    
        </TouchableOpacity>

      </View>
            <View style={styles.categoryContainer2}>
         <TouchableOpacity onPress={() => navigation.navigate('AdminGetFeeScreen')} style={styles.categoryBtn} >
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="card-account-details" size={35} color="#FFF"/>
             <Text style={styles.categoryBtnTxt}>Check Fee Status</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer2}>
         <TouchableOpacity onPress={() => navigation.navigate('AdminNotificationScreen')} style={styles.categoryBtn} >
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="bell-alert-outline" size={35} color="#FFF"/>
             <Text style={styles.categoryBtnTxt}>Update Notifications</Text>
          </View>
        </TouchableOpacity>
      </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        marginBottom: 40,
         
    },
  wrapper: {},
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
    // marginBottom: 10,
  },
    categoryContainer2: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 40,
    // marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 140,
    height: 140,
    backgroundColor: COLORS.darkblue, 
    borderRadius: 25,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#fff',
  },
  cardsWrapper: {
    marginTop: 25,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 105

  },
  card: {
    height: 100,
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // marginBottom: 105
  },
    scrollView: {
    height: 320,
    // marginBottom: 25
    // marginVertical: 5,
    // flexDirection: 'row',
 
  },
//   cardImgWrapper: {
//     flex: 1,
//   },
//   cardImg: {
//     height: '100%',
//     width: '100%',
//     alignSelf: 'center',
//     borderRadius: 8,
//     borderBottomRightRadius: 0,
//     borderTopRightRadius: 0,
//   },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#0d47a1',
    borderWidth: 1,
  borderRadius: 8,
    backgroundColor: '#fff',
    
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#0d47a1',
     textDecorationLine: 'underline'
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
    
  },
   time: {
    fontSize: 12,
    color: '#444',
    textAlign: 'right',
    marginTop: 30
    
  },
});

export default AdminHomeScreen;
