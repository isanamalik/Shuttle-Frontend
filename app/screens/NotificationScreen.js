import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import axios from "axios";
import { BASE_URL } from '../config/index';
import { Loading } from '../components/Loading';
import Moment from 'moment';

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
        <ScrollView>
        <Header title="Notifications"/>
           <View style={styles.cardsWrapper}>
          {notificationInfo}
        </View>
        <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
     
        </ScrollView>
        <Loading loading={loading} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1
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

export default NotificationScreen;