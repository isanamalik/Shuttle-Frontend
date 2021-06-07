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

const StudentInfo = ({ navigation }) => {
  
    return (
          <SafeAreaView style={styles.container}>
          <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
        <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={images.person}
            size={80}
            style={{backgroundColor: 'white'}}
          />
          
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>Javeria Nadeem</Title>
            <Caption style={styles.caption}>Student</Caption>
          </View>
        </View>
        <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="school" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Department Name</Text>
        </View>
        <View style={styles.row}>
          <Icon name="file" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Registration Number</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Email</Text>
        </View>
      </View>
                <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title style={{color: "#0d47a1"}}>Month</Title>
            <Caption>January</Caption>
            <Caption>February</Caption>
            <Caption>March</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title style={{color: "#0d47a1"}}>Fee Status</Title>
            <Caption>Paid</Caption>
            <Caption>Unpaid</Caption>
            <Caption>Paid</Caption>
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
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 35
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#0d47a1"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
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



});

export default StudentInfo;