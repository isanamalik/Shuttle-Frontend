import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header'
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
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
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            marginRight: 10,
            marginLeft: 10,
            textAlign: 'left',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '160%',
              marginRight: 3,
              marginLeft: 3,
              borderRadius: 14,
              //borderWidth: 0.75,
              borderBottomWidth: 1,
              borderStyle: 'solid',
              borderColor: appColors.primary,
              padding: 10,
            }}>
            <View style={{flexDirection: 'row', textAlign: 'left'}}>
              <MaterialIcons name="directions-bus" size={35} color="#E1AD01" />
              <Text
                style={{
                  color: appColors.primary,
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginLeft: 20,
                  marginTop: 5,
                }}>
                SHUTTLE NO.{text}
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={25} color="grey" />
          </View>
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
          <Text
            key={i + 20}
            style={{
              justifyContent: 'center',
              width: '100%',
              textAlign: 'left',
            }}>
            {'\n'}
            <View style={styles.lineStyle} />
          </Text>,
        );
      }
      markerList.push(
        <OptionItem
          key={i}
          bgColor={['#46aeff', '#5884ff']}
          text={i + 1}
          onPress={() => {
            navigation.navigate('ShuttleRouteScreen', {
              route_id: i + 1,
            });
            // this.displayRoutes();
          }}
        />,
      );
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
            navigation.navigate('ShuttleRouteScreen', {
              route_id: search[i].route_id,
            });
            // this.displayRoutes();
          }}
        />,
      );
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
          name="arrow-back"
          size={35}
          color="white"
          onPress={() =>
            navigation.navigate('StudentHomeScreen', {
              title: 'StudentHomeScreen',
            })
          }
        />
        <Text style={{color: 'white', fontSize: 20, marginTop: 5}}>
          Shuttle Schedules
        </Text>
        <MaterialIcons
          name="search"
          size={33}
          color="white"
          onPress={() =>
            navigation.navigate('QuickNavigation', {
              title: 'QuickNavigation',
            })
          }
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={{padding: 10, width: '90%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: '#800',
              textAlign: 'left',
            }}>
            Search by Area
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder="Enter your location(e.g Buffer Zone)"
              returnKeyType="next"
              value={locationName.value}
              onChangeText={(text) => setLocationName({value: text, error: ''})}
              error={!!locationName.error}
              errorText={locationName.error}
            />
            <MaterialIcons
              style={styles.icon}
              onPress={onSearch}
              name="search"
              size={30}
              color="white"
            />
            <View style={styles.row}>
              <Text style={styles.error}>{error}</Text>
            </View>
          </View>
        </View>

        <ScrollView style={{width: '100%', height: '500%'}}>
          <Text style={{width: '100%', textAlign: 'left'}}>
            {markerList} {searchResult}
          </Text>
        </ScrollView>

        <Loading loading={loading} />
      </View>
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
  inputContainer: {
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: appColors.primary
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 19
  },
});
export default ShuttleNumberScreen;