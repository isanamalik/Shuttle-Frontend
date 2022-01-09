import React, {useState} from 'react';
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
import WhiteButton from '../components/WhiteButton';
import LandingPage1 from './LandingPage1';
import LandingPage2 from './LandingPage2';
import LandingPage3 from './LandingPage3';
const LandingScreen = ({navigation}) => {
  const [isPageOne, setIsPageOne] = useState(true);
  const [isPageTwo, setIsPageTwo] = useState(false);
  const [isPageThree, setIsPageThree] = useState(false);
  return isPageOne ? (
    <LandingPage1 setIsPageOne={setIsPageOne} setIsPageTwo={setIsPageTwo} />
  ) : isPageTwo ? (
    <LandingPage2 />
  ) : (
    <LandingPage3 />
  );
  // <SafeAreaView style={styles.container}>
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Image
  //       source={images.shuttle}
  //       resizeMode="contain"
  //       style={{
  //         width: '100%',
  //         height: '100%',
  //       }}
  //     />
  //   </View>

  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <View style={{ alignItems: 'center', marginHorizontal: SIZES.padding }}>
  //       <Text style={{ ...FONTS.h2 }}>Track Your Shuttle</Text>
  //       <Text style={{ color: COLORS.gray, marginTop: SIZES.padding, marginBottom: SIZES.padding, textAlign: 'center', ...FONTS.body3 }}>
  //       We aim to provide a platform which can be helpful to students, our drivers and conductors.
  //         </Text>
  //     </View>
  //           <View style={{ flexDirection: 'row', margin: 20, paddingVertical: 20 }}>

  //       <TouchableOpacity
  //       onPress={ () => navigation.navigate('LoginScreen') }
  //       >
  //          <Button style={styles.button}>Login</Button>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //       onPress={ () => navigation.navigate('SignupScreen') }
  //       >
  //          <WhiteButton style={styles.button}>Sign Up</WhiteButton>
  //       </TouchableOpacity>

  //     </View>

  //   </View>
  // </SafeAreaView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    padding: 18,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default LandingScreen;
