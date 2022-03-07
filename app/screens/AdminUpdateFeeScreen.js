import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image,Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import WhiteButton from '../components/WhiteButton';
import BackButton from '../components/BackButton';
import { Loading } from '../components/Loading';
import { AuthContainer } from '../components/AuthContainer';
import { AuthContext } from '../contexts/AuthContext';
import { theme } from '../core/theme';
import { COLORS, SIZES } from '../constants';
// const Bcrypt = require("bcryptjs");   
import axios from "axios";
import {
  yearValidator,
  monthValidator,
  registrationNumberValidator,
  feeValidator
} from '../core/utils';
import { BASE_URL } from '../config/index';
import { images } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../colors';

const AdminUpdateFeeScreen = ({navigation}) => {

 const [modalVisible, setModalVisible] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState({ value: '', error: '' });
  const [month, setMonth] = useState({ value: '', error: '' });
  const [year, setYear] = useState({ value: '', error: '' });
  const [feeStatus, setFeeStatus] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const updateFeeStatus = async () => {
    setError('')
     const registrationNumberError = registrationNumberValidator(registrationNumber.value)
    const monthError = monthValidator(month.value);
    const yearError = yearValidator(year.value);
    const feeStatusError = feeValidator(feeStatus.value);


    if ( registrationNumberError || monthError || yearError || feeStatusError) {
      setRegistrationNumber({ ...registrationNumber, error: registrationNumberError })
      setMonth({ ...month, error: monthError })
      setYear({ ...year, error: yearError });
      setFeeStatus({ ...feeStatus, error: feeStatusError });

      return;
    }
    console.log(registrationNumber.value, month.value.label, year.value.value,feeStatus.value.value)
 
    try {
      setLoading(true);
      const request = await axios.post(`${BASE_URL}/admin/insert_fee`, {
       paid_date: year.value.value + '-' + month.value.value,
        st_reg_number: registrationNumber.value,
        fee_status: feeStatus.value.value,
        paid_month: month.value.label + " " + year.value.value
      }).then((response) => {
        console.log('check response' ,response.data)
        setLoading(false)
        if(response.data.hasOwnProperty('msg')  === true){
          console.log('show error message here')
          setError(response.data.msg)
        }
        else {
          console.log('show data')
           setModalVisible(true)
           setRegistrationNumber({value: ''})
           setMonth({value: ''})
           setYear({label: ''})
           setFeeStatus({label: ''})
        }
      })

    } catch (e) {  
      console.log(e)
      setError(e)
      setLoading(false)
    }

  };

  const onCloseModal = () => {
    setModalVisible(false)
  }
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
          Update Fee Status
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
        <View style={styles.modalContainer}>
          <Modal
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* <Header title="" /> */}
                <Text>
                  Fee Status has been updated. Click ok to update another record
                </Text>
                <TouchableOpacity onPress={() => onCloseModal()}>
                  <WhiteButton style={{marginTop: 10}}>Ok</WhiteButton>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{padding: 10, width: '90%'}}>
          <Text
            style={{
              marginTop: 30,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#800',
              textAlign: 'left',
            }}>
            Search by Registration Number
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder="Registration Number(e.g 4001048)"
              returnKeyType="next"
              value={registrationNumber.value}
              onChangeText={(text) =>
                setRegistrationNumber({value: text, error: ''})
              }
              error={!!registrationNumber.error}
              errorText={registrationNumber.error}
            />
            <MaterialIcons
              style={styles.icon}
              name="search"
              size={30}
              color="white"
            />

            <DropDownPicker
              items={[
                {label: 'January', value: '01'},
                {label: 'February', value: '02'},
                {label: 'March', value: '03'},
                {label: 'April', value: '04'},
                {label: 'May', value: '05'},
                {label: 'June', value: '06'},
                {label: 'July', value: '07'},
                {label: 'August', value: '08'},
                {label: 'September', value: '09'},
                {label: 'October', value: '10'},
                {label: 'November', value: '11'},
                {label: 'December', value: '12'},
              ]}
              placeholder="SELECT MONTH"
              placeholderStyle={{
                fontWeight: 'bold',
                color: '#800',
                fontSize: 17,
              }}
              containerStyle={{marginTop: 30, height: 60, width: 335}}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setMonth({value: item, error: ''})}
              selectedValue={month.label}
            />
            {month.error ? (
              <Text style={styles.error}>{month.error}</Text>
            ) : null}
            <DropDownPicker
              items={[
                {label: '2023', value: '2023'},
                {label: '2022', value: '2022'},
                {label: '2021', value: '2021'},
                {label: '2020', value: '2020'},
                {label: '2019', value: '2019'},
              ]}
              placeholder="SELECT YEAR"
              placeholderStyle={{
                fontWeight: 'bold',
                color: '#800',
                fontSize: 17,
              }}
              containerStyle={{marginTop: 30, height: 60, width: 335}}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setYear({value: item, error: ''})}
            />
            {year.error ? <Text style={styles.error}>{year.error}</Text> : null}

            <DropDownPicker
              items={[
                {label: 'Paid', value: 'Paid'},
                {label: 'Unpaid', value: 'Unpaid'},
              ]}
              placeholder="SELECT STATUS"
              placeholderStyle={{
                fontWeight: 'bold',
                color: '#800',
                fontSize: 17,
              }}
              containerStyle={{marginTop: 30, height: 60, width: 335}}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setFeeStatus({value: item, error: ''})}
            />
            {feeStatus.error ? (
              <Text style={styles.error}>{feeStatus.error}</Text>
            ) : null}
          </View>
          <View style={styles.row}>
            <Text style={styles.error}>{error}</Text>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Button onPress={updateFeeStatus} style={styles.updateBtn}>
            <Text style={styles.updateText}>UPDATE</Text>
          </Button>
        </View>
        <Loading loading={loading} />
        {/* </AuthContainer>
      </ScrollView> */}
      </View>
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
  categoryContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
    // marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  updateBtn: {
    backgroundColor: '#800',
    borderRadius: 5,
    width: 340,
  },
  updateText: {
    color: 'white',
  },
  error: {
    color: 'red',
  },
  modalContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
  },
  modalView: {
    // display: "flex",
    margin: 20,
    backgroundColor: '#0d47a1',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0d47a1',
    borderWidth: 2,
    marginTop: 225,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // margin: 4,
  },
  input: {
    height: 50,
    backgroundColor: '#800',
  },
  label: {
    color: theme.colors.secondary,
    marginTop: 4,
  },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',

  // },
  link: {
    fontWeight: 'bold',
    color: COLORS.darkblue,
    marginTop: 4,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  //   error: {
  //   fontSize: 14,
  //   color: theme.colors.error,
  //   paddingHorizontal: 4,
  //   paddingTop: 4,
  //   textAlign: 'left'
  // },
  dropDown: {
    marginTop: 6,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 19,
  },
});

export default AdminUpdateFeeScreen;

