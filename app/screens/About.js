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


const About = ({ navigation }) => {
  
    return (
          <SafeAreaView style={styles.container}>
           
           <View style={{marginBottom: 10, marginTop:20}}> 
           <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
         
          </View>
           <Header title="About Welcome Wheels" />
          <View style={styles.row}>
          <Text style={styles.text}>Welcome Wheels is a local NED body responsible for connecting transport networks to students of the university. </Text>

          <Text style={styles.text}>
          We convey the day-to-day operational updates on NED's shuttle service to the students eradicating the need of physical communication by the shuttle department.
          </Text>
          <Text style={styles.text}>
          Live travel information and Fee status information are the current core important features of this app and we are open to hear feedbacks.
        </Text >
         <Text style={styles.text}> The seperate parts of our app work together to make your daily journey better. </Text>
         </View>
        </SafeAreaView>
    ); 
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  row: {
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,

    margin: 15,
    // textAlign: 'center'
  },



});

export default About;