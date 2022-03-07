import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Item, Button, Image, TouchableOpacity, SectionList, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { images } from '../constants';
import { Loading } from '../components/Loading';
import axios from "axios";
import { BASE_URL } from '../config/index';
import appColors from '../colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LogoutButton from '../components/LogoutButton';

const StudentInfo = ({ route,navigation }) => {
  const [loading, setLoading] = useState(false);
  const [studentInformation, updateStudentInformation] = React.useState([]);
    const [responseError, setResponseError] = useState('');
  const [feeStatus, setFeeStatus] = useState([]);

  const registration_no = route.params.reg_no
   useEffect(() => {
    setLoading(true)
     try {
      axios.post(`${BASE_URL}/student/get/` + registration_no)
        .then((res) => {
          setLoading(false)
          console.log('res', res)
          let response = res.data.id
          console.log(response)
           let studentInfo = [];
      studentInfo.push(
        <View style={styles.userInfoSection} key={1}>
          <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 15}}>
            <Avatar.Image
              source={images.avatar}
              size={80}
              style={{color: 'yellow', marginTop: 20}}
            />

            <View style={{marginLeft: 25}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginBottom: 5,
                  },
                ]}>
                
                {/* {response.st_name} */}
              </Title>
              <Caption style={styles.caption}>Student</Caption>
              <View style={styles.row}>
                <Icon name="school" color="white" size={20} />
                <Text style={styles.student_detail}>
                  {/* {response.st_department} */}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="file" color="white" size={20} />
                <Text style={styles.student_detail}>
                  Registration No.
                  {/* {response.st_reg_number} */}
                  {'\n'}
                </Text>
              </View>
            </View>
          </View>

          {/* fee history */}
        </View>,
      );
           updateStudentInformation([...studentInformation,studentInfo])
  
// checking for fee history here
          if(response.fee_history.length == 0){
            console.log('No fee history available')
            setResponseError('No fee history available for this student')
          }
          else {

            //console.log(response.fee_history)
            let fee_status = []
            for(let i = 0; i<response.fee_history.length; i++){
            fee_status.push(
               <View style={styles.card} key={i+1}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Month: {response.fee_history[i].paid_month}</Text>
                  <Text style={styles.cardDetails}>
                  Fee Status: {response.fee_history[i].fee_status}
                  </Text>
                    {/* <Text style={styles.time}>Paid Date: {response.fee_history[i].paid_date} </Text> */}
                </View>
              </View>
            )
       }
          setFeeStatus([fee_status])
          }

        })
    }
    catch (err) { console.log(err)}
  }, [])
  //console.log('studentInformation, registration_no')
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.top}>
          <MaterialIcons
            name="search"
            size={33}
            color="white"
            onPress={() =>
              navigation.navigate('QuickNavigation', {
                title: 'QuickNavigation',
              })
            }
          />
          <Text style={{color: '#800', fontSize: 23, marginTop: 5}}>Menu</Text>
          <MaterialIcons
            name="close"
            size={33}
            color="#800"
            onPress={() =>
              navigation.navigate('StudentHomeScreen', {
                title: 'StudentHomeScreen',
              })
            }
          />
        </View>
        <View style={styles.bottomContainer}>
          <SafeAreaView style={styles.container}>
            <View style={styles.cardsWrapper}>
              {studentInformation}
              {feeStatus}
            </View>
            <View>
              <Text style={styles.error}>{responseError}</Text>
            </View>
            <View style={{margin: 30}}>
              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate('StudentHomeScreen', {
                    title: 'StudentHomeScreen',
                  })
                }>
                <View style={styles.menu}>
                  <Icon name="home" color="white" size={27} />
                  <Text style={styles.menu_detail}>Home</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate('ShuttleNumberScreen', {
                    title: 'ShuttleNumberScreen',
                  })
                }>
                <View style={styles.menu}>
                  <MaterialIcons name="access-time" color="white" size={27} />
                  <Text style={styles.menu_detail}>Shuttle Schedules</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate('StudentHomeScreen', {
                    title: 'StudentHomeScreen',
                  })
                }>
                <View style={styles.menu}>
                  <MaterialIcons name="location-on" color="white" size={27} />
                  <Text style={styles.menu_detail}>Live Shuttle Tracking</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate('StudentHomeScreen', {
                    title: 'StudentHomeScreen',
                  })
                }>
                <View style={styles.menu}>
                  <MaterialIcons name="payment" color="white" size={27} />
                  <Text style={styles.menu_detail}>
                    Payment for Shuttle Card
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate('NotificationScreen', {
                    title: 'NotificationScreen',
                  })
                }>
                <View style={styles.menu}>
                  <MaterialIcons name="menu" color="white" size={27} />
                  <Text style={styles.menu_detail}>Latest Updates</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate('About', {
                    title: 'About',
                  })
                }>
                <View style={styles.menu}>
                  <MaterialIcons name="info" color="white" size={27} />
                  <Text style={styles.menu_detail}>About Us</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate('LoginScreen', {
                    title: 'LoginScreen',
                  })
                }>
                <View style={styles.menu}>
                  <MaterialIcons name="logout" color="white" size={27} />
                  <Text style={styles.menu_detail}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Loading loading={loading} />
          </SafeAreaView>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    //borderWidth: 0.75,
    borderBottomWidth: 2,
    borderColor: 'grey',
    marginBottom: 25,
    marginTop: 30,
  },
  bottomContainer: {
    borderRadius: 40,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: '3%',
    backgroundColor: '#800',
    width: '100%',
    height: 5000,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 200,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  student_detail: {
    color: 'white',
    marginLeft: 5,
  },
  menu: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menu_detail: {
    color: 'white',
    marginLeft: 20,
    fontSize: 20,
  },
  card: {
    height: 80,
    // width: '50%',
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // marginBottom: 105
  },
  cardsWrapper: {
    // flexDirection: "row",
    width: '90%',
    alignSelf: 'center',
  },
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
    //  textDecorationLine: 'underline'
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

export default StudentInfo;