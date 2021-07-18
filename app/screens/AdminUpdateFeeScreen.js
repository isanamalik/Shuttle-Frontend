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
    <SafeAreaView  style={styles.container}>
    <BackButton goBack={() => navigation.navigate('AdminHomeScreen')} />
    <View style={{marginTop: 0}}>
     <Header title="Update Fee Status" />
     </View>
   <View style={styles.modalContainer}>
   <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          {/* <Header title="" /> */}
          <Text>Fee Status has been updated. Click ok to update another record</Text>
            <TouchableOpacity
              onPress={() => onCloseModal()}
            >
              <WhiteButton style={{marginTop: 10}}>Ok</WhiteButton>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
</View>
          <View style={styles.categoryContainer}>
        
         <TextInput
              label="Registration Number(e.g 4001048)"
              returnKeyType="next"
              value={registrationNumber.value}
              onChangeText={text => setRegistrationNumber({ value: text, error: '' })}
              error={!!registrationNumber.error}
              errorText={registrationNumber.error}
            />
        
            <DropDownPicker
              items={[
                { label: 'January', value: '01' },
                { label: 'February', value: '02' },
                { label: 'March', value: '03' },
                { label: 'April', value: '04' },
                { label: 'May', value: '05' },
                { label: 'June', value: '06' },
                { label: 'July', value: '07' },
                { label: 'August', value: '08' },
                { label: 'September', value: '09' },
                { label: 'October', value: '10' },
                { label: 'November', value: '11' },
                { label: 'December', value: '12' },

              ]}
              placeholder="Select Month"
              placeholderStyle={{
                fontWeight: 'bold'
              }}
              containerStyle={{ height: 60, width: 320 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setMonth({ value: item, error: '' })}
               selectedValue={month.label}
            />
             {month.error ? <Text style={styles.error}>{month.error}</Text> : null}
            <DropDownPicker

              items={[
                { label: '2023', value: '2023' },
                { label: '2022', value: '2022' },
                { label: '2021', value: '2021' },
                { label: '2020', value: '2020' },
                { label: '2019', value: '2019' },
              ]}
              placeholder="Select Year"
              placeholderStyle={{
                fontWeight: 'bold'
              }}
              containerStyle={{ height: 60, width: 320 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setYear({ value: item, error: '' })}
            />
             {year.error ? <Text style={styles.error}>{year.error}</Text> : null}
       
            <DropDownPicker

              items={[
                { label: 'Paid', value: 'Paid' },
                { label: 'Unpaid', value: 'Unpaid' },
              ]}
              placeholder="Select Status"
              placeholderStyle={{
                fontWeight: 'bold'
              }}
              containerStyle={{ height: 60, width: 320 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setFeeStatus({ value: item, error: '' })}
            />
             {feeStatus.error ? <Text style={styles.error}>{feeStatus.error}</Text> : null}
       
          
   
          </View>
           <View style={styles.row}>
              <Text style={styles.error}>{error}</Text>
              </View>
              <View style = {{ flex: 1, alignItems: 'center'}}>
          <Button onPress={updateFeeStatus} style={styles.button}>Update</Button>
          </View>
          <Loading loading={loading} />
        {/* </AuthContainer>
      </ScrollView> */}

    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
   container: {
         flex: 1,
        marginTop: 40,
        // marginBottom: 40,
         
    },
     categoryContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
    // marginBottom: 10,
  },
   error: {
    color: "red"
  },
  modalContainer: {
    justifyContent: "center",
      alignContent: "center",
      alignSelf: 'center'
  },
      modalView: {
      // display: "flex",
      margin: 20,
      backgroundColor: "transparent",
      borderRadius: 20,
      padding: 35,
      justifyContent: "center",
      alignItems: "center",
      borderColor: '#0d47a1',
      borderWidth: 2,
    marginTop: 225,
    textAlign: 'center'
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // margin: 4,
  },
  label: {
    color: theme.colors.secondary,
    marginTop: 4
  },
  button: {
    marginTop: 24,
  },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
    
  // },
  link: {
    fontWeight: 'bold',
    color: COLORS.darkblue,
    marginTop: 4
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
    marginTop: 6
  }
});

export default AdminUpdateFeeScreen;

