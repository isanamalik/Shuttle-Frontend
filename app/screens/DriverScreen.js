import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import Header from '../components/Header'

const DriverScreen = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Header title="Driver Screen" />
       
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
 
  });

export default DriverScreen;

