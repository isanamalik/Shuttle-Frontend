import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';
import axios from "axios";
import { BASE_URL } from '../config/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button'

const ShuttleRouteScreen = ({navigation}) => {
  // useEffect(async() => {
  //   try {
  //     let response = await axios.post(`${BASE_URL}/route/get`,{
  //       route_id: "P#14"
  //     })
  //     console.log(response.data);
  //     // return responseJson;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })

  return (
    <SafeAreaView style={{flex: 1}} >
         <BackButton goBack={() => navigation.navigate('ShuttleNumberScreen')} />
      <View style={styles.container}>
      
        <ScrollView>
            <Header title="Shuttle Number 1 Routes" />
            <View style={styles.routesWrapper}>

            {/* you have to display the routes here */}
              <View style={styles.row}>
          <MaterialCommunityIcons name="bus" size={35} color="#0d47a1" />
          <Text style={styles.item}>City Campus - 7:40am</Text>
        </View>
          <View style={{
        borderStyle: 'dotted',
        height:5,
        borderLeftWidth:2,
        marginLeft: 16, marginBottom: 2
       }}/>
          <View style={{
        borderStyle: 'dotted',
        height:5,
        borderLeftWidth:2,
        marginLeft: 16,
         marginBottom: 2
       }}/>
          <View style={{
        borderStyle: 'dotted',
        height:5,
        borderLeftWidth:2,
        marginLeft: 16,
         marginBottom: 2
       }}/>
      <View style={styles.row}>
          <MaterialCommunityIcons name="bus" size={35} color="#0d47a1" />
          <Text style={styles.item}>Jama Cloth 7:43am</Text>
        </View>
              <View style={{
        borderStyle: 'dotted',
        height:5,
        borderLeftWidth:2,
        marginLeft: 16, marginBottom: 2
       }}/>
          <View style={{
        borderStyle: 'dotted',
        height:5,
        borderLeftWidth:2,
        marginLeft: 16,
         marginBottom: 2
       }}/>
          <View style={{
        borderStyle: 'dotted',
        height:5,
        borderLeftWidth:2,
        marginLeft: 16,
         marginBottom: 2
       }}/>
         <View style={styles.row}>
          <MaterialCommunityIcons name="bus" size={35} color="#0d47a1" />
          <Text style={styles.item}>Radio Pakistan - 7:47am</Text>
        </View> 

           {/* end them before view tag */}
        </View>
   </ScrollView>

      {/* <FlatList
        data={[
          {key: 'City Campus - 7:40am'},
          {key: 'Jama Cloth 7:43am'},
          {key: 'Radio Pakistan - 7:47am'},
          {key: '7Day Hospital - 7:50am'},
          {key: 'Numaish - 7:52am'},
          {key: 'Gurumandir - 7:54am'},
          {key: 'Jamshed Road (No.3) - 7:55am'},
          {key: 'New Town - 7:58am'},
          {key: 'Askari Park - 8:00am'},
          {key: 'Mumtaz Manzil 8:03am'},
          {key: 'NEDUET (Main Campus) 8.20am'}
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      /> */}
    </View>
 <View style={{  flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginBottom: 10}}>
         <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShuttleMapScreen')
            }}
          >
             <Button mode="contained" style={styles.button}>Track</Button>
          </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      padding: 20,
    },
    row: {
      // paddingTop: 22,
      flexDirection: 'row'
     },
     item: {
       paddingHorizontal: 8,
       paddingVertical: 5,
       fontSize: 16,
      //  height: 44,
       color: '#777777',

     },
     routesWrapper: {
       margin: 25
     }
  });

export default ShuttleRouteScreen;

