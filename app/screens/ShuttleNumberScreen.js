import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header'
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import { Loading } from '../components/Loading';
import { BASE_URL } from '../config/index';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import axios from "axios";
import {
  locationNameValidator
} from '../core/utils';
import { CommonActions } from '@react-navigation/routers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../colors';

const OptionItem = ({ bgColor, icon, label, onPress, text }) => {
  return (
    <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
      <View >
        <LinearGradient
          style={[
            {
              borderRadius: 10,
              width: '100%',
            },
          ]}
          colors={['#800', '#800']}
          //start={{ x: 0, y: 0 }}
          //end={{ x: 0, y: 1 }}
        >
          <View style={{justifyContent: 'space-between', width: '100%'}}>
            <MaterialIcons name="menu" size={35} color="white" />
            <Text
              style={{
                color: COLORS.white,
                fontSize: 15,
                width: '100%',
              }}>
              SHUTTLE NO.{text}
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
          </View>
        </LinearGradient>
      </View>
      {/* <Text style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{label}</Text> */}
    </TouchableOpacity>
  );
}

const ShuttleNumberScreen = ({ navigation }) => {
  const [locationName, setLocationName] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationError, locationNameError] = useState({ value: '', error: '' });
  const [searchResult, setSearchResult] = useState([]);
  console.log("location is null", locationName.value)
  let markerList = [];
  if (locationName.value == '')
    for (let i = 0; i < 15; i++) {
      if (
        i == 1 ||
        i == 2 ||
        i == 3 ||
        i == 4 ||
        i == 5 ||
        i == 6 ||
        i == 7 ||
        i == 8 ||
        i == 9 ||
        i == 10 ||
        i == 11 ||
        i == 12 ||
        i == 13 ||
        i == 14 ||
        i == 15
      ) {
        markerList.push(
          <Text key={i + 20} >
            {'\n'}
          </Text>,
        );
      }
      markerList.push(
        <OptionItem
          key={i}
          bgColor={['#46aeff', '#5884ff']}
          text={i + 1}
          onPress={() => {
            navigation.navigate("ShuttleRouteScreen", {
              route_id: i + 1 
            })
            // this.displayRoutes();
          }}

        />
      )
    }
  
  const onSearch = async () => {
    setError('')
    setSearchResult([])
    const locationError = locationNameValidator(locationName.value);
    console.log('Inside search', locationName.value)
    if (locationError) {
      setLocationName({ ...locationName, error: locationError });
      return;
    }
    try {
      setLoading(true);
      const request = await axios.post(`${BASE_URL}/route/by_name`, {
        route_location: locationName.value
      }).then((response) => {
       console.log('data', response.data)
        let searchResult = []
        let search = response.data
        // console.log('response',search[1].route_id)
          if (response.data.length == 0) {
            setLoading(false);
            setError("Oops! No shuttle found for your route. Try another location")
          }
        else  {
          for (let i = 0; i < search.length; i++) {
            console.log('route ids',search[i].route_id)
               if (
                 i == 1 ||
                 i == 2 ||
                 i == 3 ||
                 i == 4 ||
                 i == 5 ||
                 i == 6 ||
                 i == 7 ||
                 i == 8 ||
                 i == 9 ||
                 i == 10 ||
                 i == 11 ||
                 i == 12 ||
                 i == 13 ||
                 i == 14 ||
                 i == 15
               ) {
                 searchResult.push(
                   <Text
                     key={search[i].route_id}>
                   </Text>,
                 );
               }
      searchResult.push(
        <OptionItem
          key={i + 1}
          bgColor={['#800', '#800']}
          text={search[i].route_id}
          onPress={() => {
            navigation.navigate("ShuttleRouteScreen", {
              route_id: search[i].route_id 
            })
            // this.displayRoutes();
          }}

        />
      )
          }
          setSearchResult([...searchResult])
          setLoading(false);
          // console.log('res', searchResult)
        }
        // else {
        
        // }
      })
    } catch (e) {
      console.log(e)
      setError(e)
      setLoading(false)
    }
  }
  const displayRoutes = async () => {
    console.log('in display')
  }
  return (
    <View style={{backgroundColor: '#800'}}>
      <View style={styles.top}>
        <MaterialIcons
          name="menu"
          size={35}
          color="white"
          // onPress={() =>
          //   navigation.navigate('StudentInfo', {
          //     title: 'StudentInfo',
          //   })
          //}
        />
      </View>
      <ScrollView>
        <View style={styles.bottomContainer}>
          <View style={{padding: 10, alignItems: 'center', width: '90%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: '#800'}}>
              Search by Area
            </Text>
            <TextInput
              style={styles.input}
              label="Enter your location(e.g Buffer Zone)"
              returnKeyType="next"
              value={locationName.value}
              onChangeText={(text) => setLocationName({value: text, error: ''})}
              error={!!locationName.error}
              errorText={locationName.error}
            />
            <MaterialIcons
              onPress={onSearch}
              name="search"
              size={30}
              color="#800"
            />
            <Button
              onPress={onSearch}
              style={{alignContent: 'center', marginTop: 10}}>
              Search
            </Button>

            <View style={styles.row}>
              <Text style={styles.error}>{error}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              elevation: 13,
              marginTop: '5%',
              backgroundColor: 'white',
              borderRadius: 14,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: appColors.primary,
              padding: 15,
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() =>
              navigation.navigate('StudentInfo', {reg_no: registration_no})
            }>
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: appColors.primary,
              }}>
              QUICK NAVIGATION
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          // style={{
          //   elevation: 13,
          //   marginTop: '10%',
          //   backgroundColor: 'white',
          //   borderRadius: 14,
          //   borderWidth: 1,
          //   borderStyle: 'solid',
          //   borderColor: appColors.primary,
          //   padding: 30,
          //   width: '90%',
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          // }}
          // onPress={() =>
          //   navigation.navigate('ShuttleNumberScreen', {
          //     title: 'ShuttleNumberScreen',
          //   })
          //}
          >
            <Text style={{marginTop: 20, width: '100%'}}>
              {markerList} {searchResult}
            </Text>

            {/* <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: appColors.primary,
            }}>
            SHUTTLE SCHEDULES
          </Text> */}
            <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('ShuttleNumberScreen', {
          //     title: 'ShuttleNumberScreen',
          //   })
          //}
          >
            <MaterialIcons name="menu" size={30} color="#800" />
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: appColors.primary,
              }}>
              SHUTTLE SCHEDULES
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={30} color="#800" />
          </TouchableOpacity>

          <Header title="Find Your Shuttle" />

          {/* <View style={{ padding: 18, alignItems: 'center' }}>
         
            <TextInput
              label="Enter your location(e.g Buffer Zone)"
              returnKeyType="next"
              value={locationName.value}
              onChangeText={text => setLocationName({ value: text, error: '' })}
              error={!!locationName.error}
              errorText={locationName.error}
            />
            <Button  onPress={onSearch} style={{alignContent: 'center', marginTop: 10}}>Search</Button>
           
            <View style={styles.row}>
              <Text style={styles.error}>{error}</Text>
            </View>
          </View> */}

          {/* <Text style={{flex: 1, marginRight: SIZES.base}}>
            {markerList}
            {searchResult}
          </Text> */}
          {/* <View style={{marginBottom: SIZES.radius}}></View> */}

          <Loading loading={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 40,
    marginTop: '3%',
    backgroundColor: 'white',
    width: '100%',
    height: 700,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  error: {
    color: 'red',
  },
  error: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // margin: 4,
  },
  input: {
    backgroundColor: '#800',
    width: '100%',
  }

 });
export default ShuttleNumberScreen;