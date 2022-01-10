import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {images, COLORS, FONTS, SIZES} from '../constants';
import Button from '../components/Button';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './LoginScreen';


const LandingPage3 = () => {
  return (
    <View>
      <Text>screen 3</Text>
      <Button onPress={() => navigation.navigate('LoginScreen')}>
        <Text>LET'S START</Text>
      </Button>
    </View>
  );

}

export default LandingPage3;
