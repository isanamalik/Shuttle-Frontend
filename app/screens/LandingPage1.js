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
        <Button onPress={() => [setIsPageOne(false), setIsPageTwo(true)]}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    height: 200,
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: appColors.primary,
    width: '100%',
    height: 200,
  },
});
export default LandingPage1;
