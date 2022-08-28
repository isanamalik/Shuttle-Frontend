
import React, { useContext, useState } from 'react';
import {View,StyleSheet,Text,TextInput,ActivityIndicator} from 'react-native';
import { Button } from 'react-native-paper';
import { BASE_URL } from '../config/index';
import axios from 'axios';
import { registrationNumberValidator, passwordValidator } from '../core/utils';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginUser = () => {
  const navigation = useNavigation();
  const [registrationNumber, setRegistrationNumber] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setLoggedInUser } = useContext(AuthContext);

  const _onLoginPressed = async () => {
    const registrationNumberError = registrationNumberValidator(registrationNumber.value);
    const passwordError = passwordValidator(password.value);

    if (registrationNumberError || passwordError) {
      console.log('in errow', registrationNumberError.at, passwordError)
      setRegistrationNumber({
        ...registrationNumber,
        error: registrationNumberError,
      });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
      setLoading(true);
      console.log('calling apiiii');
      await axios
        .post(`${BASE_URL}/student/login`, {
          st_reg_number: registrationNumber.value,
          password: password.value,
        })
        .then((res) => {
          if (res.data.msg == 'login succeful') {
            axios.post(`${BASE_URL}/student/get/` + registrationNumber.value)
              .then(async (res) => {
                await AsyncStorage.setItem("LoggedInUser", JSON.stringify(res.data.id));
                setLoggedInUser(res.data.id);
                navigation.navigate('StudentHomeScreen', {
                  registration: registrationNumber.value,
                });
                setRegistrationNumber({ value: '' });
                setPassword({ value: '' });
              })
          } else {
            setError('Invalid Credentials');
          }
        });
      setLoading(false);
    } catch (e) {
      setError('Invalid credentials', e);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.UniLabel}>NED University of Engineering and Technology</Text>
      <Text style={styles.headerText}>Let's Get Started!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>REGISTRATION NUMBER</Text>
        <TextInput
          placeholderTextColor={'grey'}
          style={styles.input}
          placeholder="Registration Number(e.g 4001048)"
          returnKeyType="next"
          value={registrationNumber.value}
          onChangeText={(text) =>
            setRegistrationNumber({ value: text, error: '' })
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
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          color={'#a00'}
          secureTextEntry={true}
        />
      </View>
      <View style={{ marginTop: 30 }}>

        {loading ? <ActivityIndicator size="small" color="#800" /> :

          <Button
            // onPress={() => navigation.navigate('StudentHomeScreen')}
            onPress={() => _onLoginPressed()}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </Button>
        }

      </View>
      <Button onPress={() => navigation.navigate('SignupScreen')}
        style={{ backgroundColor: 'white', padding: 5, margin: 10 }}>
        <Text style={{ color: '#800', fontSize: 20 }}>Signup</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    marginBottom: 13,
  },
  input: {
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    color: '#800',
    padding: 10,
  },
  loginBtn: {
    backgroundColor: '#800',
    borderRadius: 5,
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
  label: {
    color: '#800',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#800',
    marginTop: 4,
  },
  error: {
    color: 'red',
  },
});

export default LoginUser;
