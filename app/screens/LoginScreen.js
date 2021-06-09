import React, { memo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Image, useWindowDimensions } from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { COLORS } from '../constants';
import { Loading } from '../components/Loading';
import { BASE_URL } from '../config/index';
import axios from "axios";
import { registrationNumberValidator, passwordValidator } from '../core/utils';
import { Error } from '../components/Error';
import { images } from '../constants';
import LoginUser from './LoginUser'
import LoginAdmin from './LoginAdmin'
import { NavigationContainer } from '@react-navigation/native';

// const FirstRoute = () => (
//     <LoginUser />
//   );
  
//   const SecondRoute = () => (
//     <LoginAdmin />
//   );

const LoginScreen = ({ navigation }) => {
    const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Login as User' },
    { key: 'second', title: 'Login as Admin' },
  ]);
  const renderScene = ({ route }) => {
  switch (route.key) {
    case 'first':
      return <LoginUser navigation={navigation} />;
    case 'second':
      return <LoginAdmin navigation={navigation} />;
    default:
      return null;
  }
}
//    
    return (
        <SafeAreaView style={{ flex: 1 }}>
             <BackButton goBack={() => navigation.navigate('LandingScreen')} />
        <TabView
        style={{marginTop: 60}}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            navigation={navigation}  
            renderTabBar={props => <TabBar {...props} style={{backgroundColor: COLORS.darkblue}}/>}
            />           
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 18,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    label: {
        color: theme.colors.secondary,
        marginTop: 4
    },
    link: {
        fontWeight: 'bold',
        color: COLORS.darkblue,
        marginTop: 4
    },
    error: {
        color: "red"
    }
});

export default LoginScreen;

