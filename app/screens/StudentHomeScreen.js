import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import Header from '../../components/Header'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, icons, COLORS, FONTS, SIZES} from '../constants';
import ShuttleNumberScreen from './ShuttleNumberScreen(old)';
import StudentInfo from './StudentInfo';
import NotificationScreen from './NotificationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import Moment from 'moment';
import axios from 'axios';
import {BASE_URL} from '../config/index';
import {Loading} from '../components/Loading';
import Button from '../components/Button';
import LogoutButton from '../components/LogoutButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../colors';
import {useNavigation} from '@react-navigation/native';


const Tab = createMaterialBottomTabNavigator();

const StudentHomeScreen = ({route}) => {
  const navigation = useNavigation();
  // const registration_no = route.params;
  // Moment.locale('en');
  // const [notificationInfo, updateNotificationInfo] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   try {
  //     axios.get(`${BASE_URL}/student/get_notifications   /`).then((res) => {
  //       setLoading(false);
  //       let response = res.data;
  //       console.log('notification', res.data.length);
  //       let allNotificationInfo = [];
  //       if (response.length > 0) {
  //         if (res.data.length < 4) {
  //           //  console.log(response[i].createdAt)
  //           for (let i = 0; i < response.length; i++) {
  //             notificationInfo.push(
  //               <View style={styles.card} key={i + 1}>
  //                 <View style={styles.cardInfo}>
  //                   <Text style={styles.cardTitle}>{response[i].title}</Text>
  //                   <Text style={styles.cardDetails}>
  //                     {response[i].message}
  //                   </Text>
  //                   <Text style={styles.time}>
  //                     {' '}
  //                     {Moment(response[i].createdAt).format(
  //                       'DD/MM/YYYY hh:mm A',
  //                     )}{' '}
  //                   </Text>
  //                 </View>
  //               </View>,
  //             );
  //           }
  //           updateNotificationInfo([...notificationInfo, allNotificationInfo]);
  //         } else {
  //           for (let i = 0; i < 4; i++) {
  //             console.log(response[i].createdAt);
  //             notificationInfo.push(
  //               <View style={styles.card} key={i + 1}>
  //                 <View style={styles.cardInfo}>
  //                   <Text style={styles.cardTitle}>{response[i].title}</Text>

  //                   <Text style={styles.cardDetails}>
  //                     {response[i].message}
  //                   </Text>
  //                   <Text style={styles.time}>
  //                     {' '}
  //                     {Moment(response[i].createdAt).format(
  //                       'DD/MM/YYYY hh:mm A',
  //                     )}{' '}
  //                   </Text>
  //                 </View>
  //               </View>,
  //             );
  //           }
  //           updateNotificationInfo([...notificationInfo, allNotificationInfo]);
  //         }
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // console.log('props registration no.', registration_no)
  return (
    <View style={{backgroundColor: '#800'}}>

      <View style={styles.top}>
        
        <MaterialIcons
          name="menu"
          size={35}
          color="white"
          onPress={() =>
            navigation.navigate('StudentInfo', {
              title: 'StudentInfo',
              registration_no:  route.params.registration
            })
          }
        />
        <Text style={{color: 'white', fontSize: 20, marginTop: 5}}>HOME</Text>

        <MaterialIcons
          name="notifications"
          size={33}
          color="white"
          onPress={() =>
            navigation.navigate('NotificationScreen', {
              title: 'Notifications',
            })
          }
        />
      </View>
      <ScrollView contentContainerStyle={styles.bottomContainer}>
    <Text style={styles.UniLabel}>NED University of Engineering and Technology</Text>

        <TouchableOpacity
          style={{
            elevation: 13,
            marginTop: '10%',
            backgroundColor: 'white',
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: appColors.primary,
            padding: 30,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() =>
            navigation.navigate('ShuttleNumberScreen', {
              title: 'ShuttleNumberScreen',
            })
          }>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: appColors.primary,
            }}>
            SHUTTLE SCHEDULES
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            elevation: 13,
            marginTop: '5%',
            backgroundColor: 'white',
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: appColors.primary,
            padding: 30,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() =>
            navigation.navigate('ShuttleRouteScreen', {
              title: 'ShuttleRouteScreen',
            })
          }>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: appColors.primary,
            }}>
            LIVE SHUTTLE TRACKING
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            elevation: 13,
            marginTop: '5%',
            backgroundColor: 'white',
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: appColors.primary,
            padding: 30,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() =>
            navigation.navigate('NotificationScreen', {
              title: 'Notifications',
            })
          }>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: appColors.primary,
            }}>
            LATEST UPDATES
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            elevation: 13,
            marginTop: '5%',
            backgroundColor: 'white',
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: appColors.primary,
            padding: 30,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => navigation.navigate('About', {title: 'About'})}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: appColors.primary,
            }}>
            PAYMENT FOR SHUTTLE
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            elevation: 13,
            marginTop: '5%',
            backgroundColor: 'white',
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: appColors.primary,
            padding: 30,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() =>
            Linking.openURL(
              'https://www.neduet.edu.pk/sites/default/files/users/student_affairs/Shuttle_Route.pdf',
            )
          }>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: appColors.primary,
            }}>
            QUICK NAVIGATION
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    width: '200%',
  },
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 40,
    marginTop: '3%',
    backgroundColor: 'white',
    width: '100%',
    height: 700,
  },
  UniLabel:{
    color:'#800',
    textAlign:'center',

  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  categoryBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //flex: 1,
    width: '90%',
    //marginHorizontal: 0,
    //alignSelf: 'center',
  },

  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },

  categoryIcon: {
    borderWidth: 0,
    //alignItems: 'center',
    //justifyContent: 'center',
    //alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 25,
  },

  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#fff',
  },
});

export default StudentHomeScreen;
