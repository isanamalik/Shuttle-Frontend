import React, { useState } from 'react';
import { View, StyleSheet, Item, Button, Image, TouchableOpacity, SectionList, StatusBar, SafeAreaView } from 'react-native';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const About = ({ navigation }) => {
  
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
            <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
              About
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
          <View style={styles.bottomContainer}>
            <Text
              style={{
                color: '#800',
                fontSize: 25,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              About Us
            </Text>
            <View style={styles.row}>
              <Text style={styles.text}>
               Shuttle Track is an application powered by NED-UET and is responsible
               for connecting the University's transport network to the University's 
               students and faculty.{' '}
              </Text>

              <Text style={styles.text}>
                We convey the day-to-day operational updates on NED's shuttle
                service to the students eradicating the need of physical
                communication by the shuttle department.
              </Text>
              <Text style={styles.text}>
                Live travel information and Fee status information are the
                current core important features of this app and we are open to
                hear feedbacks.
              </Text>
              <Text style={styles.text}>
                {' '}
                The separate parts of our app work together to make your daily
                journey better.{' '}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 40,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: '3%',
    backgroundColor: 'white',
    width: '100%',
    height: 650,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    marginLeft: 20,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26,

    margin: 15,
    // textAlign: 'center'
  },
});

export default About;