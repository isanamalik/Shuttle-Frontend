import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView,Linking } from 'react-native';
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
import Moment from 'moment';
import axios from "axios";
import { BASE_URL } from '../config/index';
import { Loading } from '../components/Loading';
import Button from '../components/Button';
import LogoutButton from '../components/LogoutButton';

const Tab = createMaterialBottomTabNavigator();

const StudentHomeScreen = ({ route, navigation }) => {
const registration_no = route.params.registration;
Moment.locale('en');
const [notificationInfo, updateNotificationInfo] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true)
   try {
    axios.get(`${BASE_URL}/student/get_notifications/`)
      .then((res) => {
        setLoading(false)
        let response = res.data
        console.log('noti length',res.data.length)
           let allNotificationInfo = [];
         if(response.length > 0 ){
             if((res.data.length < 4 )){
              //  console.log(response[i].createdAt)
      for(let i=0;i<response.length; i++){
          notificationInfo.push(
            <View style={styles.card} key={i+1}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{response[i].title}</Text>
              <Text style={styles.cardDetails}>
              {response[i].message}
              </Text>
                <Text style={styles.time}> {Moment(response[i].createdAt).format('DD/MM/YYYY hh:mm A')} </Text>
            </View>
          </View>
          )
           }
           updateNotificationInfo([...notificationInfo, allNotificationInfo])
        }
        else {
             for(let i=0;i<4; i++){
               console.log(response[i].createdAt)
          notificationInfo.push(
            <View style={styles.card} key={i+1}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{response[i].title}</Text>
              
              <Text style={styles.cardDetails}>
              {response[i].message}
              </Text>
                <Text style={styles.time}> {Moment(response[i].createdAt).format('DD/MM/YYYY hh:mm A')} </Text>
            </View>
          </View>
          )
           }
 updateNotificationInfo([...notificationInfo, allNotificationInfo])
        }
          
         }
   
      })
  }
  catch (err) { console.log(err)}
}, [])

  // console.log('props registration no.', registration_no)
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Header title="Welcome Wheels"/>
            <LogoutButton logout={() => navigation.navigate('LoginScreen')} />
         <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('ShuttleNumberScreen', {title: 'ShuttleNumberScreen'})
          }>
          <View style={styles.categoryIcon}>
            <Ionicons name="bus" size={35} color="#FFF" />
             <Text style={styles.categoryBtnTxt}>Shuttle Routes</Text>
          </View>
         
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('StudentInfo', {reg_no: registration_no})
          }>
          <View style={styles.categoryIcon}>
            <Ionicons
              name="person"
              size={35}
              color="#FFF"
            />
                  <Text style={styles.categoryBtnTxt}>Student Info</Text>
          </View>
    
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('NotificationScreen', {title: 'Notifications'})
          }
         >
          <View style={styles.categoryIcon}>
            <Ionicons name="notifications" size={35} color="#FFF"/>
             <Text style={styles.categoryBtnTxt}>Notifications</Text>
          </View>
        </TouchableOpacity>
      </View>
           <View style={styles.categoryContainer2}>

           <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('About', {title: 'About'})
          }>
          <View style={styles.categoryIcon}>
            <Ionicons
              name="information-circle-outline"
              size={35}
              color="#FFF"
            />
                  <Text style={styles.categoryBtnTxt}>About</Text>
          </View>
    
        </TouchableOpacity>

         <TouchableOpacity style={styles.categoryBtn}    onPress={() => Linking.openURL('https://www.neduet.edu.pk/sites/default/files/users/student_affairs/Shuttle_Route.pdf')}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="map-marker-path" size={35} color="#FFF"/>
             <Text style={styles.categoryBtnTxt}>Quick Routes</Text>
          </View>
        </TouchableOpacity>
      </View>
       <View style={styles.cardsWrapper}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.darkblue,
            marginBottom: 10
          }}>
          Recent Updates..
        </Text>
         {/* <View  style={styles.scrollView}> */}
        
        {notificationInfo}
     

      {/* </View> */}
        </View>
        </ScrollView>
        <Loading loading={loading} />
        </SafeAreaView>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
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
    width: '60%',
    alignSelf: 'center',
    marginTop: 25,
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
    width: 100,
    height: 100,
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
    // height: 100,
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
    // height: 320,
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

export default StudentHomeScreen;
