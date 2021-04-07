import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, Button, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header'


import LinearGradient from 'react-native-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';

const OptionItem = ({ bgColor, icon, label, onPress, text }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}
    >
      <View style={[styles.shadow, { width: 75, height: 75 }]}>
        <LinearGradient
          style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'red' }]}
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

  return (
    <View style={styles.container}>
      <Header title="Select Your Shuttle Number" />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>
          <OptionItem
            icon={icons.airplane}
            bgColor={['#46aeff', '#5884ff']}
            text="1"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            icon={icons.train}
            bgColor={['#46aeff', '#5884ff']}
            text="2"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            icon={icons.bus}
            bgColor={['#46aeff', '#5884ff']}
            text="3"
            onPress={() =>{ navigation.navigate("ShuttleMapScreen") }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>
          <OptionItem
            text="4"
            onPress={() =>{ navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            text="5"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            text="6"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>
          <OptionItem
            text="7"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            text="8"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            text="9"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>
          <OptionItem
            text="10"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            text="11"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
          <OptionItem
            text="12"
            onPress={() =>{ navigation.navigate("ShuttleMapScreen") }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>
          <OptionItem
            text="13"
            onPress={() => { navigation.navigate("ShuttleMapScreen") }}
          />
        </View>

      </View>
      <View style={{marginBottom: SIZES.radius}}>
      <Button
        title="Do we select one for you?"
        color="darkslateblue"
        onPress={() => Linking.openURL('https://www.neduet.edu.pk/sites/default/files/users/student_affairs/Shuttle_Route.pdf')}></Button>
    </View>
    </View >
  );
};   

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // paddingTop: 60
  },


});

export default ShuttleNumberScreen;