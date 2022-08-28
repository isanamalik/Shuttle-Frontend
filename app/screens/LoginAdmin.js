import React, { memo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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

// const Tab = createMaterialTopTabNavigator();

const LoginAdmin = ({ navigation }) => {
    const [registrationNumber, setRegistrationNumber] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const _onLoginPressed = async () => {
        const registrationNumberError = registrationNumberValidator(registrationNumber.value)
        const passwordError = passwordValidator(password.value);

        if (registrationNumberError || passwordError) {
            setRegistrationNumber({ ...registrationNumber, error: registrationNumberError })
            setPassword({ ...password, error: passwordError });
            return;
        }
        try {
            setLoading(true);
            const request = await axios.post(`${BASE_URL}/admin/login`, {
                ad_reg_num: registrationNumber.value,
                password: password.value
            })
                .then(function (response) {
                    console.log(response.data.msg);
                    console.log('reg', registrationNumber.value)
                    if (response.data.msg == "login succesful") {
                        navigation.navigate('AdminHomeScreen', {
                            registration: registrationNumber.value
                        })
                        setRegistrationNumber({value: ''})
                        setPassword({value: ''})
                    }
                    else {
                        setError("Invalid Credentials")
                    }
                }) 
            setLoading(false);
        } catch (e) {
            // setError("Invalid credentials");
            console.log(e)
            setLoading(false);
        }
    };
    return (
      //         <SafeAreaView style={{ flex: 1 }}>
      //             <View style={styles.container}>
      //                 <Image
      //                 source={images.logo}
      //                 resizeMode="contain"
      //                 style={{
      //                     width: '30%',
      //                     height: '25%',
      //                 }}
      //                 />
      //                 <TextInput
      //                     label="Registration Number(e.g 4001048)"
      //                     returnKeyType="next"
      //                     value={registrationNumber.value}
      //                     onChangeText={text => setRegistrationNumber({ value: text, error: '' })}
      //                     error={!!registrationNumber.error}
      //                     errorText={registrationNumber.error}

      //                 />
      //                 <TextInput
      //                     label="Password"
      //                     returnKeyType="done"
      //                     value={password.value}
      //                     onChangeText={text => setPassword({ value: text, error: '' })}
      //                     error={!!password.error}
      //                     errorText={password.error}
      //                     secureTextEntry
      //                     outlineColor="#0d47a1"
      //                 />

      //                 <View style={styles.row}>
      //                     <Text style={styles.error}>{error}</Text>
      //                 </View>

      //                 <Button onPress={_onLoginPressed}>Login</Button>

      //             </View>
      // <Loading loading={loading} />
      //         </SafeAreaView>

      <View style={styles.container}>
        <Text style={styles.UniLabel}>NED University of Engineering and Technology</Text>
        <Text style={styles.headerText}>Let's Get Started!</Text>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>ADMIN ID</Text>
          <TextInput
            placeholderTextColor={'grey'}
            style={styles.input}
            placeholder="Enter ID"
            returnKeyType="next"
            value={registrationNumber.value}
            onChangeText={(text) =>
              setRegistrationNumber({value: text, error: ''})
            }
            error={!!registrationNumber.error}
            errorText={registrationNumber.error}
            color={'#a00'}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>PASSWORD</Text>
          <TextInput
            placeholderTextColor={'grey'}
            style={styles.input}
            placeholder="Password"
            returnKeyType="next"
            value={password.value}
            onChangeText={(text) => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            color={'#a00'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.row}>
           <Text style={styles.error}>{error}</Text>
        </View>
        <View>
          <Button onPress={_onLoginPressed} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </Button>
        </View>
        <Loading loading={loading} />
      </View>
    
    );
    
};
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     padding: 18,
    // },
    // forgotPassword: {
    //     width: '100%',
    //     alignItems: 'flex-end',
    //     marginBottom: 24,
    // },
    // row: {
    //     flexDirection: 'row',
    //     marginTop: 10,
    //     marginBottom: 10
    // },
    // label: {
    //     color: theme.colors.secondary,
    //     marginTop: 4
    // },
    // link: {
    //     fontWeight: 'bold',
    //     color: COLORS.darkblue,
    //     marginTop: 4
    // },
    // error: {
    //     color: "red"
    // }

     container: {
    flex: 1,
    padding: 20,
  },
  UniLabel:{
    color:'#800',
    textAlign:'center',

  },
  headerText: {
    color: '#800',
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  formContainer: {
    marginTop: 25,
  },
  formLabel: {
    color: '#800',
    fontSize: 19,
    fontFamily: 'sans-serif',
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#D3D3D3',
    color: '#800',
  
  },
  loginBtn: {
    backgroundColor: '#800',
    borderRadius: 5,
    width: '100%',
  },
  loginText: {
    color: 'white',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default LoginAdmin;

