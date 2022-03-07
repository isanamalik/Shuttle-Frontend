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
import appColors from '../colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Tab = createMaterialBottomTabNavigator();

const AdminHomeScreen = ({ route, navigation }) => {
const registration_no = route.params.registration;
  console.log('props registration no.', registration_no)
// const { registration_no } = route.params;
    return (
      <View style={{backgroundColor: '#800'}}>
        <View style={styles.top}>
          <Text style={{color: 'white', fontSize: 20, marginTop: 5}}>
            ADMIN
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          {/* Banner */}

          <View style={styles.categoryContainer2}>
            <TouchableOpacity
              style={{
                elevation: 13,
                marginTop: '15%',
                backgroundColor: 'white',
                borderRadius: 14,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: appColors.primary,
                padding: 30,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => navigation.navigate('AdminUpdateFeeScreen')}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: appColors.primary,
                }}>
                UPDATE FEE STATUS
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer2}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdminGetFeeScreen')}
              style={{
                elevation: 13,
                marginTop: '5%',
                backgroundColor: 'white',
                borderRadius: 14,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: appColors.primary,
                padding: 30,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: appColors.primary,
                }}>
                CHECK FEE STATUS
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer2}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdminNotificationScreen')}
              style={{
                elevation: 13,
                marginTop: '5%',
                backgroundColor: 'white',
                borderRadius: 14,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: appColors.primary,
                padding: 30,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: appColors.primary,
                }}>
                UPDATE NOTIFICATIONS
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LoginScreen', {
                title: 'LoginScreen',
              })
            }>
            <View style={styles.menu}>
              <MaterialIcons name="logout" color="#800" size={33} />
              <Text style={styles.menu_detail}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 40,
    marginTop: '3%',
    backgroundColor: 'white',
    width: '100%',
    height: 700,
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
    width: '90%',
    alignSelf: 'center',
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
    marginBottom: 105,
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
  menu: {
    marginTop: 230,
    flexDirection: 'row',
    marginBottom: 10,
  },
  menu_detail: {
    color: '#800',
    marginLeft: 15,
    fontSize: 25,
    fontWeight: 'bold',
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
    textDecorationLine: 'underline',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  time: {
    fontSize: 12,
    color: '#444',
    textAlign: 'right',
    marginTop: 30,
  },
});

export default AdminHomeScreen;
