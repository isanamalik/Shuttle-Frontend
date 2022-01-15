import React, {memo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../components/Header';
// import Button from '../components/Button';
import {Button} from 'react-native-paper';
// import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {COLORS} from '../constants';
import {Loading} from '../components/Loading';
import {BASE_URL} from '../config/index';
import axios from 'axios';
import {registrationNumberValidator, passwordValidator} from '../core/utils';
import {Error} from '../components/Error';
import {images} from '../constants';
import {useNavigation} from '@react-navigation/native';

// const Tab = createMaterialTopTabNavigator();

const LoginUser = () => {
  const navigation = useNavigation();
  const [registrationNumber, setRegistrationNumber] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const _onLoginPressed = async () => {
    const registrationNumberError = registrationNumberValidator(
      registrationNumber.value,
    );
    const passwordError = passwordValidator(password.value);

    if (registrationNumberError || passwordError) {
      setRegistrationNumber({
        ...registrationNumber,
        error: registrationNumberError,
      });
      setPassword({...password, error: passwordError});
      return;
    }
    try {
      setLoading(true);
      const request = await axios
        .post(`${BASE_URL}/student/login`, {
          st_reg_number: registrationNumber.value,
          password: password.value,
        })
        .then((res) => {
          console.log(res.status);
          console.log('reg', registrationNumber.value);
          if (res.data.msg == 'login successful') {
            console.log('here');
            navigation.navigate('StudentHomeScreen', {
              registration: registrationNumber.value,
            });
            setRegistrationNumber({value: ''});
            setPassword({value: ''});
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
      <Text style={styles.headerText}>Let's Get Started</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>REGISTRATION NUMBER</Text>
        <TextInput
          placeholderTextColor={'grey'}
          style={styles.input}
          placeholder="Registration Number(e.g 4001048)"
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
      <View style={{marginTop: 30}}>
        <Button
          onPress={() => navigation.navigate('StudentHomeScreen')}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </Button>
      </View>
      <Button onPress={() => navigation.navigate('SignupScreen')}
        style={{backgroundColor: 'white', padding: 5, margin: 10}}>
        <Text style={{color: '#800', fontSize: 20}}>Signup</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    color: '#800',
    fontSize: 30,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 25,
  },
  formLabel: {
    color: '#800',
    fontSize: 17,
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
    color: theme.colors.secondary,
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: COLORS.darkblue,
    marginTop: 4,
  },
  error: {
    color: 'red',
  },
});

export default LoginUser;
