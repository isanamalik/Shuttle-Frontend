import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import appColors from '../colors';
import {useNavigation} from '@react-navigation/native';
import { COLORS } from '../constants';

const LandingPage3 = () => {
  const navigation= useNavigation()
  return (
    <View>
      <Button
        style={{marginBottom: 60, alignItems: 'flex-end'}}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={{color: appColors.primary, fontSize: 20}}>SKIP</Text>
      </Button>
      <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={require('../../assets/landing-page3.png')}
        style={styles.img}
        //resizeMode="stretch"
      />
      <Animatable.View animation="fadeInUpBig" style={styles.bottomContainer}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 27,
            textAlign: 'center',
            color: 'white',
            marginTop: 20,
          }}>
          Get Notified about your shuttle's arrival
        </Text>
        <Text style={{margin: 20, fontSize: 16, color: 'white'}}>
          {' '}
          Never miss your shuttle again
        </Text>
        <Button
          style={{backgroundColor: 'white', padding: 5, margin: 10}}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{color: appColors.primary, fontSize: 20}}>
            LET'S START
          </Text>
        </Button>
      </Animatable.View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    height: 300,
    width: '100%',
  },
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 60,
    marginTop: '20%',
    backgroundColor: '#800',
    width: '100%',
    height: 400,
  },
});
export default LandingPage3;

