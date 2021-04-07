import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { Loading } from '../components/Loading';
import { AuthContainer } from '../components/AuthContainer';
import { AuthContext } from '../contexts/AuthContext';
import { theme } from '../core/theme';
import { COLORS, SIZES } from '../constants';
// const Bcrypt = require("bcryptjs");   
import axios from "axios";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  departmentValidator,
  registrationNumberValidator
} from '../core/utils';
import { BASE_URL } from '../config/index';
export const SignupScreen = ({ navigation }) => {

  // const {register} = React.useContext(AuthContext);
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [department, setDepartment] = useState({ value: '', error: '' });
  const [registrationNumber, setRegistrationNumber] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const departmentError = departmentValidator(department.value);
    const registrationNumberError = registrationNumberValidator(registrationNumber.value)
    if (emailError || passwordError || nameError || departmentError || registrationNumberError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setDepartment({ ...department, error: departmentError })
      setRegistrationNumber({ ...registrationNumber, error: registrationNumberError })
      return;
    }

    try {
      setLoading(true);
      const request = await axios.post(`${BASE_URL}/student/insert`, {
        st_name: name.value,
        st_reg_number: registrationNumber.value,
        st_department: department.value,
        st_access_cred: registrationNumber.value,
        fee_status: "unpaid",
        password: password.value
      }).then((response) => {
        console.log(response.data.id)
        if (response.data.id !== null) {
          setLoading(false);
          navigation.navigate('LoginScreen')
        }
        else {
          setError("An error occured")
        }

      })
    } catch (e) {  
      setError(e)
      setLoading(false)
    }

  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <AuthContainer>
          <View>

            <BackButton goBack={() => navigation.navigate('LoginScreen')} />

            <Header title="Create Account" />

            <TextInput
              label="Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={text => setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
            />

            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={text => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TextInput
              label="Password"
              returnKeyType="next"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
            <DropDownPicker
              items={[
                { label: 'Civil Engineering', value: 'Civil Engineering' },
                { label: 'Urban & Infrastructure Engineering', value: 'Urban & Infrastructure Engineering' },
                { label: 'Petroleum Engineering', value: 'Petroleum Engineering' },
                { label: 'Architecture & Planning', value: 'Architecture & Planning' },
                { label: 'Environmental Engineering', value: 'Environmental Engineering' },
                { label: 'Earthquake Engineering', value: 'Earthquake Engineering' },
                { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
                { label: 'Textile Engineering', value: 'Textile Engineering' },
                { label: 'Industrial & Manufacturing Engineering', value: 'Industrial & Manufacturing Engineering' },
                { label: 'Automotive & Marine   Engineering', value: 'Automotive & Marine   Engineering' },
                { label: 'Electrical Engineering', value: 'Electrical Engineering' },
                { label: 'Computer & Information Systems Engineering', value: 'Computer & Information Systems Engineering' },
                { label: 'Electronic Engineering', value: 'Electronic Engineering' },
                { label: 'Chemical Engineering', value: 'Chemical Engineering' },
                { label: 'Metallurgical Engineering', value: 'Metallurgical Engineering' },
                { label: 'Materials Engineering', value: 'Materials Engineering' },
                { label: 'Polymer & Petrochemical  Engineering', value: 'Polymer & Petrochemical  Engineering' },
                { label: 'Biomedical Engineering', value: 'Biomedical Engineering' },
                { label: 'Food Engineering', value: 'Food Engineering' },
                { label: 'Computer Science & Software Engineering', value: 'Computer Science & Software Engineering' },
                { label: 'Mathematics', value: 'Mathematics' },
                { label: 'Chemistry', value: 'Chemistry' },
                { label: 'Physics', value: 'Physics' },
                { label: 'Humanities', value: 'Humanities' },
                { label: 'Economics and Management Sciences', value: 'Economics and Management Sciences' }

              ]}
              placeholder="Select department"
              placeholderStyle={{
                fontWeight: 'bold'
              }}
              containerStyle={{ height: 60, width: 320 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setDepartment({ value: item.value, error: '' })}
              error={!!department.error}
              errorText={department.error}
            />
            <TextInput
              label="Registration Number(e.g 4001048)"
              returnKeyType="done"
              value={registrationNumber.value}
              onChangeText={text => setRegistrationNumber({ value: text, error: '' })}
              error={!!registrationNumber.error}
              errorText={registrationNumber.error}
            />

            <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>Sign Up</Button>

            <View style={styles.row}>
              <Text style={styles.label}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.link}>Login </Text>
              </TouchableOpacity>
            </View>

          </View>
          <Loading loading={loading} />
        </AuthContainer>
      </ScrollView>

    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  link: {
    fontWeight: 'bold',
    color: COLORS.darkblue,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});


