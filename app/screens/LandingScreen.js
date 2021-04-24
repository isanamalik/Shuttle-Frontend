import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { images, COLORS, FONTS, SIZES } from '../constants';
import Button from '../components/Button'

const LandingScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={images.shuttle}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginHorizontal: SIZES.padding }}>
          <Text style={{ ...FONTS.h2 }}>Track Your Shuttle</Text>
          <Text style={{ color: COLORS.gray, marginTop: SIZES.padding, marginBottom: SIZES.padding, textAlign: 'center', ...FONTS.body3 }}>
          We aim to provide a platform which can be helpful to students, our drivers and conductors.
            </Text>
        </View>

        {/* <TouchableOpacity
          style={[styles.shadow, { marginTop: SIZES.padding * 2, width: '70%', height: 50, alignItems: 'center', justifyContent: 'center' }]}
          onPress={() => navigation.navigate("LoginScreen")}
        > */}
        <Button mode="contained" onPress={() => { navigation.navigate("LoginScreen") }}>
          Next
      </Button>
        {/* <LinearGradient
            style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
            colors={['#46aeff', '#5884ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Next !</Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>

    // <View style={styles.container}>
    //   <Header title="Landing Screen" />
    // </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    padding: 18,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }

});

export default LandingScreen;