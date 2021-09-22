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
import { Loading } from '../components/Loading';
import {COLORS} from '../constants'

const ShuttleRouteScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const { route_id } = route.params;
   const [routeLocation, updateRouteLocation] = React.useState([]);
  console.log('route parms',route_id)
  useEffect(() => {
    console.log('route id from search', route_id)
    setLoading(true)
     try {
      const request = axios.get(`${BASE_URL}/route/get/` + route_id)
        .then((response) => {
          setLoading(false)
          console.log(response.data.route_locations)
           let routeList = [];
           for(let i=0;i<response.data.route_locations.length;i++){
             if(i==response.data.route_locations.length-1){
                  routeList.push(
            <View key={i}>
          <View style={styles.row}>
          <MaterialCommunityIcons name="bus" size={35} color="#0d47a1" />
          <Text style={styles.item}>{response.data.route_locations[i]}</Text>
        </View>
       </View>
           )
             }
             else {
            routeList.push(
            <View key={i}>
          <View style={styles.row}>
          <MaterialCommunityIcons name="bus" size={35} color="#0d47a1" />
          <Text style={styles.item}>{response.data.route_locations[i]}</Text>
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
       </View>
           )}
           }
           updateRouteLocation([...routeLocation,routeList])
        })
    }
    catch (err) { console.log(err)}
  }, [])
// console.log()
  return (
    <SafeAreaView style={{flex: 1}} >
      
      <View style={styles.container}>
         <BackButton goBack={() => navigation.navigate('ShuttleNumberScreen')} />
        <ScrollView>
             <Text style={styles.header}>Shuttle Number {JSON.stringify(route_id)} Routes</Text>
            <View style={styles.routesWrapper}>

            {/* you have to display the routes here */}
            {routeLocation}
           {/* end them before view tag */}
        </View>
   </ScrollView>
    </View>
 <View style={{  flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginBottom: 10}}>
         <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShuttleMapScreen', {
                route_id: JSON.stringify(route_id),
              })
            }}
          >
             <Button  style={styles.button}>Track</Button>
          </TouchableOpacity>
          </View>
            <Loading loading={loading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginLeft:10
    },
    row: {
      flexDirection: 'row'
     },
     item: {
       paddingHorizontal: 8,
       paddingVertical: 5,
       fontSize: 16,
       color: '#777777',

     },
     routesWrapper: {
       margin: 25
     },
        header: {
        color: COLORS.darkblue,
        fontSize: 23,
        textAlign: 'center',
    },
  });

export default ShuttleRouteScreen;

