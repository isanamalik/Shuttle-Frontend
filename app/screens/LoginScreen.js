import React, { memo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
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

const LoginScreen = ({ navigation }) => {
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
            const request = await axios.post(`${BASE_URL}/student/login`, {
                st_reg_number: registrationNumber.value,
                password: password.value
            })
                .then(function (response) {
                    console.debug(response.data.msg);
                    if (response.data.msg == "login succeful") {
                        navigation.navigate('StudentHomeScreen')
                    }
                    else {
                        setError("Invalid Credentials")
                    }
                })
            setLoading(false);
        } catch (e) {
            setError("Invalid credentials");
            setLoading(false);
            // navigation.navigate('LandingScreen')
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.container}>

                <Loading loading={loading} />
                <BackButton goBack={() => navigation.navigate('LandingScreen')} />
                <Header title="Login" />

                <TextInput
                    label="Registration Number(e.g 4001048)"
                    returnKeyType="next"
                    value={registrationNumber.value}
                    onChangeText={text => setRegistrationNumber({ value: text, error: '' })}
                    error={!!registrationNumber.error}
                    errorText={registrationNumber.error}
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />

                <View style={styles.row}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={styles.label}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <Button mode="contained" onPress={_onLoginPressed}>Login</Button>
                <View style={styles.row}>
                    <Text style={styles.label}>Don’t have an account? </Text>
                    {/* changing screen name here */}
                    <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                        <Text style={styles.link}>Sign up </Text>
                    </TouchableOpacity>
                </View>

            </View>

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
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: COLORS.darkblue,
    },
    error: {
        // fontWeight:bold "",
        color: "red"
    }
});

export default LoginScreen;

