import React, { useState } from 'react';
import { View, Text, StyleSheet, Item, Button, Image, TouchableOpacity, SectionList, StatusBar } from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';

const DATA = [
    {
        title: "Announcements",
        data: ["Point 3 will be combined with point 14 for mornings", "Today, point 10 will not be on route"]
    },
]
const NotificationScreen = ({ navigation }) => {
  
    return (
        <View style={styles.container}>
            <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
            <Header title="Notifications" />
            <Text style={styles.item}>Point 3 will be combined with point 14 for mornings</Text>
            <Text style={styles.item}>Today, point 10 will not be on route</Text>
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
        backgroundColor: "#f9c1ff",
        padding: 20,
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

export default NotificationScreen;