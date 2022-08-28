import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Header from '../components/Header';
import {Loading} from '../components/Loading';
import {BASE_URL} from '../config/index';
import {images, icons, COLORS, FONTS, SIZES} from '../constants';
import axios from 'axios';
import {registrationNumberValidator} from '../core/utils';
import {Error} from '../components/Error';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../colors';

const AdminGetFeeScreen = ({navigation}) => {
  const [registrationNumber, setRegistrationNumber] = useState({
    value: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [responseError, setResponseError] = useState('');
  const [studentInfo, setStudentInfo] = useState([]);
  const [feeStatus, setFeeStatus] = useState([]);

  const onSearch = async () => {
    console.log('reg number of get student', registrationNumber);
    setError('');
    setStudentInfo([]);
    setFeeStatus([]);
    setResponseError('');
    const registrationNumberError = registrationNumberValidator(
      registrationNumber.value,
    );

    if (registrationNumberError) {
      setRegistrationNumber({
        ...registrationNumber,
        error: registrationNumberError,
      });

      return;
    }

    // 1. user not registered
    // 2. user registered but no fee status
    // 3. user registered and has fee status
    try {
      setLoading(true);
      console.log('reg number of get student', registrationNumber.value);
      const request = await axios
        .post(`${BASE_URL}/student/get/` + registrationNumber.value)
        .then((response) => {
          setLoading(false);
          if (response.data.id === null) {
            // console.log(response.data)
            setResponseError(
              'The student has not registered on the application yet',
            );
            console.log('User is not registered');
          } else if (response.data.id.fee_history.length == 0) {
            console.log('No fee history available');
            let student_info = [];
            student_info.push(
              <View key={1}>
                <Text 
                  style={{
                    color: '#800',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  STUDENT DATA
                </Text>
                <View style={styles.userInfoSection}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 15,
                    }}>
                    <Avatar.Image
                      source={images.avatar}
                      size={100}
                      style={{color: 'yellow', marginTop: 10}}
                    />
                    <View style={{marginLeft: 25}}>
                      <Title
                        style={[
                          styles.title,
                          {
                            marginBottom: 5,
                          },
                        ]}>
                        {response.data.id.st_name}
                      </Title>
                      <Caption style={styles.caption}>Student</Caption>
                      <View style={styles.row}>
                        <Icon name="school" color="#800" size={20} />
                        <Text style={styles.student_detail}>
                          {response.data.id.st_department}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Icon name="file" color="#800" size={20} />
                        <Text style={styles.student_detail}>
                          {response.data.id.st_reg_number}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>,
            );
            setStudentInfo([student_info]);
            setResponseError('No fee history available for this student');
          } else {
            let feeMonthsLength = response.data.id.fee_history;
            console.log(feeMonthsLength[0]);

            console.log('res', response.data);
            let student_info = [];
            let fee_status = [];
            student_info.push(
              <View key={1}>
                <Header  title="Student Data" />
                <View style={styles.userInfoSection}>
                  <View style={styles.row}>
                    <Icon name="school" color="#800" size={20} />
                    <Text style={styles.student_detail}>
                      Student Name: {response.data.id.st_name}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Icon name="file" color="#800" size={20} />
                    <Text style={styles.student_detail}>
                      Registration Number: {response.data.id.st_reg_number}
                    </Text>
                  </View>
                </View>
              </View>,
            );
            setStudentInfo([student_info]);
            for (let i = 0; i < feeMonthsLength.length; i++) {
              fee_status.push(
                <View style={styles.card} key={i + 1}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      Month: {feeMonthsLength[i].paid_month}
                    </Text>
                    <Text style={styles.cardDetails}>
                      Fee Status: {feeMonthsLength[i].fee_status}
                    </Text>
                    {/* <Text style={styles.time}>Paid Date: {feeMonthsLength[i].paid_date} </Text> */}
                  </View>
                </View>,
              );
            }

            setFeeStatus([fee_status]);
          }
        });
    } catch (e) {
      console.log(e);
      setError(e);
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: '#800'}}>
      <View style={styles.top}>
        <MaterialIcons
          name="arrow-back"
          size={35}
          color="white"
          onPress={() =>
            navigation.navigate('AdminHomeScreen', {
              title: 'AdminHomeScreen',
            })
          }
        />
        <Text style={{color: 'white', fontSize: 20, marginTop: 5}}>
          CHECK FEE STATUS
        </Text>
        <MaterialIcons
          name="close"
          size={33}
          color="#800"
          onPress={() =>
            navigation.navigate('AdminHomeScreen', {
              title: 'AdminHomeScreen',
            })
          }
        />
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView>
          {/* <ScrollView> */}

          <View style={{padding: 10, width: '200%'}}>
            <Text
              style={{
                marginTop: 30,
                fontWeight: 'bold',
                fontSize: 17,
                color: '#800',
                textAlign: 'left',
              }}>
              Enter Registration Number
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor="#800"
                style={styles.input}
                placeholder="Enter registration number(e.g 4001096)"
                returnKeyType="next"
                value={registrationNumber.value}
                onChangeText={(text) =>
                  setRegistrationNumber({value: text, error: ''})
                }
                error={!!registrationNumber.error}
                errorText={registrationNumber.error}
              />
            </View>

            <Button onPress={onSearch} style={styles.searchBtn}>
              <Text style={styles.searchText}>SEARCH</Text>
            </Button>
          </View>
          <Text style={styles.UniLabel}>NED University of Engineering and Technology</Text>
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>

          <View>
            {studentInfo}
            {feeStatus}
          </View>
          <View>
            <Text style={styles.error}>{responseError}</Text>
          </View>
        </ScrollView>
      </View>
      <Loading loading={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    borderRadius: 40,
    marginTop: '3%',
    backgroundColor: 'white',
    width: '100%',
    height: 700,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 50,
    width: 360,
    backgroundColor: '#F5F5F5',
  },
  UniLabel:{
    color:'#800',
    textAlign:'center',

  },
  inputContainer: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  searchBtn: {
    backgroundColor: '#800',
    borderRadius: 5,
    marginVertical: 20,
    width: 360,
    padding: 0,
  },
  searchText: {
    color: 'white',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    // justifyContent: 'center',
    // alignContent: 'center',
    // margin: 4,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 35,
  },
  title: {
    fontSize: 24,
    textTransform: 'capitalize',
    color: '#800',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
  },
  student_detail: {
    color: 'white',
    marginLeft: 5,
    color: '#800',
    fontSize: 17,
  },
  card: {
    height: 80,
    // width: '50%',
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // marginBottom: 105
  },
  cardsWrapper: {
    // flexDirection: "row",
    marginTop: 25,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 105,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#800',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#800',
    //  textDecorationLine: 'underline'
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  time: {
    fontSize: 12,
    color: '#444',
    textAlign: 'right',
    marginTop: 30,
  },
});

export default AdminGetFeeScreen;
