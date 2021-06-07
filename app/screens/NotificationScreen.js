import React, { useState } from 'react';
import { View, Text, StyleSheet, Item, Button, Image, TouchableOpacity, SectionList, StatusBar, ScrollView } from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
const DATA = [
    {
        title: "Announcements",
        data: ["Point 3 will be combined with point 14 for mornings", "Today, point 10 will not be on route"]
    },
]
const NotificationScreen = ({ navigation }) => {
  
    return (
        <View style={styles.container}>
        <Header title="Notifications"/>
           <View style={styles.cardsWrapper}>
       
         <View  style={styles.scrollView}>
<ScrollView>

        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Point Merge Information</Text>
            <Text style={styles.cardDetails}>
             Point 3 will be combined with point 14 for mornings
            </Text>
              <Text style={styles.time}>6:59AM</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Point Merge Information</Text>
            <Text style={styles.cardDetails}>
             Point 3 will be combined with point 14 for mornings
            </Text>
              <Text style={styles.time}>6:59AM</Text>
          </View>
        </View>
     <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Point Merge Information</Text>
            <Text style={styles.cardDetails}>
             Point 3 will be combined with point 14 for mornings
            </Text>
              <Text style={styles.time}>6:59AM</Text>
          </View>
        </View>
         <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Point Merge Information</Text>
            <Text style={styles.cardDetails}>
             Point 3 will be combined with point 14 for mornings
            </Text>
              <Text style={styles.time}>6:59AM</Text>
          </View>
        </View>
         <View style={styles.card}>
          {/*  for Ui fix */}
        </View>
</ScrollView>

</View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
        marginTop: 40,
        marginBottom: 40,
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

export default NotificationScreen;