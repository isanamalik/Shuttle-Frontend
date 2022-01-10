import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import appColors from '../colors';
const LandingPage1 = ({setIsPageOne, setIsPageTwo}) => {
  return (
    <View>
      <Image
        style={styles.img}
        source={require('../../assets/landing-page1.png')}
      />
      <View style={styles.bottomContainer}>
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
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    marginTop: 180,
    height: 200,
    width: '100%',
  },
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 50,
    marginTop: '20%',
    backgroundColor: appColors.primary,
    width: '100%',
    height: 400,
  },
});
export default LandingPage1;
