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
import {
  locationNameValidator
} from '../core/utils';

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
  console.log(locationName)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
            navigation.navigate("ShuttleMapScreen", {
              route_id: i + 1
            })
          }}

        />
      )
    }
    console.log(locationName)
  // console.log(markerList)
  const onSearch = async () => {
    const locationError = locationNameValidator(locationName.value);
    console.log(locationName)
    
    try {
      // setLoading(true);
      // const request = await axios.post(`${BASE_URL}/route/by_name`, {
      //   route_location: locationName.value
      // }).then((response) => {
      //   console.log(response)
      //   // if (response.data.id !== null) {
      //     setLoading(false);
      //   //   navigation.navigate('LoginScreen')
      //   // }
      //   // else {
      //   //   setError("An error occured")
      //   // }

      // })
    } catch (e) {  
      setError(e)
      setLoading(false)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
          <Header title="Find Your Shuttle" />
          <View style={{ padding: 18 }}>
            <TextInput
              label="Enter your location(e.g Buffer Zone)"
              returnKeyType="next"
              value={locationName.value}
              onChangeText={text => setLocationName({ value: text, error: '' })}
            error={!!locationName.error}
            errorText={locationName.error}
            />
            <Button mode="contained" onPress={onSearch}>Search</Button>
          </View>
          <Text style={{ flex: 1, marginRight: SIZES.base }}>
            {markerList}
          </Text>
          <View style={{ marginBottom: SIZES.radius }}>
            {/* <Button
              title="Do we select one for you?"
              color="darkslateblue"
              onPress={() => Linking.openURL('https://www.neduet.edu.pk/sites/default/files/users/student_affairs/Shuttle_Route.pdf')}></Button> */}
          </View>
        </ScrollView>
      </View >
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // padding: 18,
  },


});

export default ShuttleNumberScreen;