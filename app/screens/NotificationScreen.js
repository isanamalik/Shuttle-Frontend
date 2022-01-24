import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import axios from "axios";
import { BASE_URL } from '../config/index';
import { Loading } from '../components/Loading';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../colors';

const NotificationScreen = ({ navigation }) => {
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
          console.log(res.data.length)
           let allNotificationInfo = [];
           if(response.length > 0 ){
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
     
        })
    }
    catch (err) { console.log(err)}
  }, [])

    return (
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#800'}}>
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
            <Text style={{color: 'white', fontSize: 20, marginTop: 5}}>
              Latest Updates
            </Text>
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
          <ScrollView>
            <View style={styles.bottomContainer}>
              <Text style={styles.text}>Important Announcements</Text>
              <View style={styles.cardsWrapper}>{notificationInfo}</View>
            </View>
          </ScrollView>
          <Loading loading={loading} />
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsWrapper: {
    marginTop: 10,
    width: '90%',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 105,
  },
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 40,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: '3%',
    backgroundColor: 'white',
    width: '100%',
    height: 5000,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
    marginBottom: 10,
  },
  text: {
    color: appColors.primary,
    fontWeight: 'bold',
    fontSize: 19,
    marginTop: 10,
    marginBottom: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: appColors.primary,
  },
  cardDetails: {
    fontSize: 13,
    color: '#444',
  },
  time: {
    fontSize: 13,
    color: '#444',
    textAlign: 'right',
    marginTop: 30,
  },
});

export default NotificationScreen;