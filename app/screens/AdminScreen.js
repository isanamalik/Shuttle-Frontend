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

const AdminScreen = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Header title="Admin Screen" />
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

export default AdminScreen;

