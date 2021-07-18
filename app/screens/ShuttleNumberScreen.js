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

const OptionItem = ({ bgColor, icon, label, onPress, text }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 50 }}
      onPress={onPress}
    >
      <View style={[styles.shadow, { width: 75, height: 75, marginRight: 20, marginLeft: 20 }]}>
        <LinearGradient
          style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }]}
          colors={['#46aeff', '#5884ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text style={{
            color: COLORS.white,
            fontSize: SIZES.h1
          }}>{text}</Text>
        </LinearGradient>
      </View>
      {/* <Text style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{label}</Text> */}
    </TouchableOpacity>
  )
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
      if (i == 3 || i == 6 || i == 9 || i == 12 || i == 15) {
        markerList.push(
          <Text key={i + 20} style={{ flexDirection: 'row', justifyContent: 'center', margin: 50 }}>{'\n'}{'\n'} </Text>
        )
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
               if (i == 3 || i == 6 || i == 9 || i == 12 || i == 15) {
                
        searchResult.push(
          <Text key={search[i].route_id} style={{ flexDirection: 'row', justifyContent: 'center', margin: 50 }}>{'\n'}{'\n'} </Text>
        )
      }
      searchResult.push(
        <OptionItem
          key={i + 1}
          bgColor={['#46aeff', '#5884ff']}
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
    <SafeAreaView style={{ flex: 1 }}>
     <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
      <View style={styles.container}>
      
        <ScrollView>
           <Header title="Find Your Shuttle" />
           
          <View style={{ padding: 18, alignItems: 'center' }}>
         
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
          </View>

          <Text style={{ flex: 1, marginRight: SIZES.base }}>
            {markerList}
            {searchResult}
          </Text>
          <View style={{ marginBottom: SIZES.radius }}>
          </View>
        </ScrollView>
      </View >
       <Loading loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 30
  },
  error: {
    color: "red"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // margin: 4,
  }


});

export default ShuttleNumberScreen;