import 'react-native-gesture-handler';
import React ,{Component, useEffect} from 'react';
import { Image, TouchableOpacity,PermissionsAndroid,Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from "react-native-bootsplash";

import { icons, COLORS, SIZES } from './app/constants';
import LandingScreen from './app/screens/LandingScreen';
import LoginScreen from './app/screens/LoginScreen';
import DriverScreen from './app/screens/DriverScreen';
import AdminNotificationScreen from './app/screens/AdminNotificationScreen';
import AdminUpdateFeeScreen from './app/screens/AdminUpdateFeeScreen';
import AdminGetFeeScreen from './app/screens/AdminGetFeeScreen';
import {SignupScreen} from './app/screens/SignupScreen';
import StudentHomeScreen from './app/screens/StudentHomeScreen';
import ShuttleMapScreen from './app/screens/ShuttleMapScreen';
import ShuttleNumberScreen from './app/screens/ShuttleNumberScreen';
import ShuttleRouteScreen from './app/screens/ShuttleRouteScreen';
import NotificationScreen from './app/screens/NotificationScreen';
import StudentInfo from './app/screens/StudentInfo';
import About from './app/screens/About';
import LoginUser from './app/screens/LoginUser';
import LoginAdmin from './app/screens/LoginAdmin';
import AdminHomeScreen from './app/screens/AdminHomeScreen';
import {AuthContext} from './app/contexts/AuthContext';


const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasMapPermission: false
    }
  }

  async componentDidMount(){
    this.requestFineLocation();
    await RNBootSplash.hide({ fade: true });
  }

  async requestFineLocation(){
    try {
      if(Platform.OS === 'android'){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          this.setState({hasMapPermission: true})
        }
      }
      else {
        this.setState({hasMapPermission:true})
      } 
    } catch (err) {
      console.warn(err);
    }
  }
  render(){

    if (this.state.hasMapPermission){
  
  return (
    <NavigationContainer theme={theme}>

      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LandingScreen"
          // changing here
          component={LandingScreen}
          options={{
            title: "Welcome Wheels",
            headerShown: false,
            headerStyle: {
              backgroundColor: COLORS.white
            },
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: SIZES.padding }}
                onPress={() => console.log("Pressed")}
              >
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen 
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          // onPress={() =>console.log("hello")}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverScreen"
          component={DriverScreen}
        />
        <Stack.Screen
          name="AdminNotificationScreen"
          component={AdminNotificationScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentHomeScreen"
          component={StudentHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShuttleMapScreen"
          component={ShuttleMapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShuttleNumberScreen"
          component={ShuttleNumberScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="StudentInfo"
          component={StudentInfo}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
  
        <Stack.Screen
          name="ShuttleRouteScreen"
          component={ShuttleRouteScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="LoginUser"
          component={LoginUser}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="LoginAdmin"
          component={LoginAdmin}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="AdminHomeScreen"
          component={AdminHomeScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="AdminUpdateFeeScreen"
          component={AdminUpdateFeeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminGetFeeScreen"
          component={AdminGetFeeScreen}
            options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    );

        }

        else return null;

  }

}
