import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import appColors from '../colors';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const LandingPage1 = ({setIsPageOne, setIsPageTwo}) => {
  const navigation = useNavigation();
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
        source={require('../../assets/landing-page1.png')}
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
          Shuttle Routes and other Updates
        </Text>
        <Text style={{margin: 20, fontSize: 16, color: 'white'}}>
          {' '}
          Be upto date with Shuttle Related News
        </Text>
        <Button
          style={{backgroundColor: 'white', padding: 5}}
          onPress={() => [setIsPageOne(false), setIsPageTwo(true)]}>
          <Text style={{color: appColors.primary, fontSize: 20}}>Next</Text>
        </Button>
      </Animatable.View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    marginTop: 50,
    marginBottom: 50,
    height: 200,
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
export default LandingPage1;
