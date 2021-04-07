import React, { useState } from 'react';
import { View, Text, StyleSheet, Item, Button, Image, TouchableOpacity, SectionList, StatusBar } from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';

const StudentInfo = ({ navigation }) => {
  
    return (
        <View style={styles.container}>
            <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
            <Header title="Student Information" />
            <Text style={styles.item}>Name: Qandeel Asif</Text>
            <Text style={styles.item}>Email ID: qandeel.asif@gmail.com</Text>
            <Text style={styles.item}>Fee Status: Unpaid</Text>
            <Text style={styles.item}>Registration ID: 4001021</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
      },
      item: {
        marginTop: 25,
      padding: 10,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }



});

export default StudentInfo;