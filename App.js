import 'react-native-gesture-handler';
import React ,{Component} from 'react';
import { Image, TouchableOpacity,PermissionsAndroid,Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { icons, COLORS, SIZES } from './app/constants';
import LandingScreen from './app/screens/LandingScreen';
import LoginScreen from './app/screens/LoginScreen';
import DriverScreen from './app/screens/DriverScreen';
import AdminScreen from './app/screens/AdminScreen';
import {SignupScreen} from './app/screens/SignupScreen';
import StudentHomeScreen from './app/screens/StudentHomeScreen';
import ShuttleMapScreen from './app/screens/ShuttleMapScreen';
import ShuttleNumberScreen from './app/screens/ShuttleNumberScreen';
import NotificationScreen from './app/screens/Notifications';
import StudentInfo from './app/screens/StudentInfo';
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

  componentDidMount(){
    this.requestFineLocation();
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
                {/* <Image
                  source={icons.barMenu}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                /> */}
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
          name="AdminScreen"
          component={AdminScreen}
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


      </Stack.Navigator>
    </NavigationContainer>
    );

        }

        else return null;

  }

}
