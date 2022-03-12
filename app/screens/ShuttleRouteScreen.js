import React, { useState, useEffect } from 'react';
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
import Button from '../components/Button'
import { Loading } from '../components/Loading';
import { COLORS } from '../constants'
import appColors from '../colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ShuttleRouteScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { route_id } = route.params;
  const [routeLocation, updateRouteLocation] = React.useState([]);
  console.log('route parms', route_id)
  useEffect(() => {
    console.log('route id from search', route_id)
    setLoading(true)
    try {
      const request = axios.get(`${BASE_URL}/route/get/` + route_id)
        .then((response) => {
          setLoading(false)
          console.log(response.data.route_locations)
          let routeList = [];
          for (let i = 0; i < response.data.route_locations.length; i++) {
            if (i == response.data.route_locations.length - 1) {
              routeList.push(
                <View key={i}>
                  <View style={styles.row}>
                    <MaterialIcons
                      name="album"
                      size={35}
                      color="#E1AD01"
                    />
                    <Text style={styles.item}>
                      {response.data.route_locations[i]}
                    </Text>
                  </View>
                </View>,
              );
            }
            else {
              routeList.push(
                <View key={i}>
                  <View style={styles.row}>
                    <MaterialIcons name="album" size={35} color="#E1AD01" />
                    <Text style={styles.item}>
                      {response.data.route_locations[i]}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: 'dotted',
                      height: 5,
                      borderLeftWidth: 2,
                      marginLeft: 16,
                      marginBottom: 2,
                      color: '#E1AD01',
                    }}
                  />
                  <View
                    style={{
                      borderStyle: 'dotted',
                      height: 5,
                      borderLeftWidth: 2,
                      marginLeft: 16,
                      marginBottom: 2,
                      color: '#E1AD01',
                    }}
                  />
                  <View
                    style={{
                      borderStyle: 'dotted',
                      height: 5,
                      borderLeftWidth: 2,
                      marginLeft: 16,
                      marginBottom: 2,
                      color: '#E1AD01',
                    }}
                  />
                </View>,
              );
            }
          }
          updateRouteLocation([...routeLocation, routeList])
        })
    }
    catch (err) { console.log(err) }
  }, [])
  // console.log()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ShuttleMapScreen', {
                  route_id: JSON.stringify(route_id),
                });
              }}>
              <Button style={styles.loginBtn}>
                <Text style={styles.loginText}>TRACK</Text>
              </Button>
            </TouchableOpacity>
          </View> */}
      <View style={{ backgroundColor: '#800' }}>
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
          <Text style={styles.header}>
            Shuttle No. {JSON.stringify(route_id)} Routes
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
        <ScrollView contentContainerStyle={styles.bottomContainer}>
          <View style={styles.container}>
            {/* <ScrollView> */}
              <View style={styles.routesWrapper}>
                {routeLocation}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ShuttleMapScreen', {
                      route_id: JSON.stringify(route_id),
                    });
                  }}>
                  <Button style={styles.loginBtn}>
                    <Text style={styles.loginText}>TRACK</Text>
                  </Button>
                </TouchableOpacity>
              </View>
          </View>
          <Loading loading={loading} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 40,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: '3%',
    paddingBottom: 30,
    backgroundColor: 'white',
    width: '100%',
    // height: '100%',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  container: {
    flex: 1,
    padding: 20,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    paddingVertical: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: appColors.primary,
  },
  routesWrapper: {
    margin: 0,
  },
  header: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  loginBtn: {
    backgroundColor: '#800',
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
  },
});

export default ShuttleRouteScreen;

