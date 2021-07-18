import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Header from '../components/Header'
import { Loading } from '../components/Loading';
import { BASE_URL } from '../config/index';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import axios from "axios";
import { registrationNumberValidator } from '../core/utils';
import { Error } from '../components/Error';

const AdminGetFeeScreen = () => {
    const [registrationNumber, setRegistrationNumber] = useState({ value: '4001096', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [responseError, setResponseError] = useState('');
  const [studentInfo, setStudentInfo] = useState([]);
  const [feeStatus, setFeeStatus] = useState([]);

  const onSearch = async () => {
         console.log('reg number of get student', registrationNumber)
    setError('')
    setStudentInfo([])
    setFeeStatus([])
    setResponseError('')
            const registrationNumberError = registrationNumberValidator(registrationNumber.value)

        if (registrationNumberError) {
            setRegistrationNumber({ ...registrationNumber, error: registrationNumberError })
          
            return;
    }

    // 1. user not registered
    // 2. user registered but no fee status
    // 3. user registered and has fee status
    try {
      setLoading(true);
      console.log('reg number of get student', registrationNumber.value)
      const request = await axios.post(`${BASE_URL}/student/get/`+ registrationNumber.value)
      .then((response) => {
        setLoading(false)
          if(response.data.id === null){
            // console.log(response.data)
            setResponseError('The student has not not registered on the application yet')
            console.log('User is not registered')
          }

          else if(response.data.id.fee_history.length == 0){
            console.log('No fee history available')
             let student_info= []
             student_info.push(
               <View key={1}>
               <Text>Name: {response.data.id.st_name}</Text>
               <Text>Registration No. : {response.data.id.st_reg_number}</Text>
               <Text>Fee History</Text>
              </View>
             )
             setStudentInfo([student_info])
            setResponseError('No fee history available for this student')
          }
          else {
        let feeMonthsLength = response.data.id.fee_history;
        console.log(feeMonthsLength[0])
        
          console.log('res', response.data)
       let student_info= []
       let fee_status = []
       student_info.push(
         <View key={1}>
         <Text>Name: {response.data.id.st_name}</Text>
         <Text>Registration No. : {response.data.id.st_reg_number}</Text>
         <Text>Fee History</Text>
        </View>
       )
       setStudentInfo([student_info])
       for(let i = 0; i<feeMonthsLength.length; i++){
        fee_status.push(
            <View key={i+1}>
              <Text>Month: {feeMonthsLength[i].paid_month}</Text>
             <Text>Fee Status: {feeMonthsLength[i].fee_status}</Text>
            <Text>Paid Date: {feeMonthsLength[i].paid_date}</Text>
         
          
           </View>
         )
       }

         

       setFeeStatus([fee_status])
          }
      })
    } catch (e) {
      console.log(e)
      setError(e)
      setLoading(false)
    }
  }

  return (
    

       <SafeAreaView style={styles.container}>
         <View >
      <Header title="Check Student Fee Status" />
      </View>
     <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
      
        {/* <ScrollView> */}
           
          <View style={{ padding: 18, alignItems: 'center' }}>
         
            <TextInput
              label="Enter student registration number(e.g 4001096)"
              returnKeyType="next"
              value={registrationNumber.value}
              onChangeText={text => setRegistrationNumber({ value: text, error: '' })}
              error={!!registrationNumber.error}
              errorText={registrationNumber.error}
            />
            <Button onPress={onSearch} style={{alignContent: 'center', marginTop: 10}}>Search</Button>
           
            <View style={styles.row}>
              <Text style={styles.error}>{error}</Text>
            </View>
            {studentInfo}
            {feeStatus}
             <View style={styles.row}>
              <Text style={styles.error}>{responseError}</Text>
            </View>
          </View>

          {/* </ScrollView> */}
            <Loading loading={loading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
         flex: 1,
        // marginTop: 40,
        // marginBottom: 40,
         
    },
   error: {
    color: "red"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // margin: 4,
  }
  });

export default AdminGetFeeScreen;

