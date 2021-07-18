import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
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
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminGetFeeScreen = ({navigation}) => {
    const [registrationNumber, setRegistrationNumber] = useState({ value: '', error: '' });
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
            setResponseError('The student has not registered on the application yet')
            console.log('User is not registered')
          }

          else if(response.data.id.fee_history.length == 0){
            console.log('No fee history available')
             let student_info= []
             student_info.push(
                <View key={1} >
                <Header title="Student Data"/>
                  <View style={styles.userInfoSection}>
                <View style={styles.row}>
                  <Icon name="school" color="#777777" size={20}/>
                  <Text style={styles.student_detail}>Student Name: {response.data.id.st_name}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="file" color="#777777" size={20}/>
                  <Text style={styles.student_detail}>Registration Number: {response.data.id.st_reg_number}</Text>
                </View>
              </View>
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
          <View key={1} >
          <Header title="Student Data"/>
            <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="school" color="#777777" size={20}/>
            <Text style={styles.student_detail}>Student Name: {response.data.id.st_name}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="file" color="#777777" size={20}/>
            <Text style={styles.student_detail}>Registration Number: {response.data.id.st_reg_number}</Text>
          </View>
        </View>
          </View>
        )
        setStudentInfo([student_info])
        for(let i = 0; i<feeMonthsLength.length; i++){
          fee_status.push(
            <View style={styles.card} key={i+1}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Month: {feeMonthsLength[i].paid_month}</Text>
                  <Text style={styles.cardDetails}>
                  Fee Status: {feeMonthsLength[i].fee_status}
                  </Text>
                    {/* <Text style={styles.time}>Paid Date: {feeMonthsLength[i].paid_date} </Text> */}
                </View>
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
           <ScrollView>
       <View style={{marginTop: 0}}>
     <Header title="Check Fee Status" />
     </View>
     <BackButton goBack={() => navigation.navigate('AdminHomeScreen')} />
      
        {/* <ScrollView> */}
           
          <View style={{ padding: 18, alignItems: 'center', marginTop: 10 }}>
         
            <TextInput
              label="Enter registration number(e.g 4001096)"
              returnKeyType="next"
              value={registrationNumber.value}
              onChangeText={text => setRegistrationNumber({ value: text, error: '' })}
              error={!!registrationNumber.error}
              errorText={registrationNumber.error}
            />
            <Button onPress={onSearch} style={{alignContent: 'center', marginTop: 10}}>Search</Button>
           
            <View>
              <Text style={styles.error}>{error}</Text>
            </View>
          </View>
          <View  style={styles.cardsWrapper}>
              {studentInfo}
                {feeStatus}
            </View>
             <View>
              <Text style={styles.error}>{responseError}</Text>
            </View>
          </ScrollView>
            <Loading loading={loading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
         flex: 1,
        marginTop: 40,
        // marginBottom: 40,
         
    },
   error: {
    color: "red",
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
    // margin: 4,

  },
    userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 35
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#0d47a1"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
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
    marginBottom: 105

  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#0d47a1',
    borderWidth: 1,
  borderRadius: 8,
    backgroundColor: '#fff',
    
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#0d47a1',
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
    marginTop: 30
    
  },

  });

export default AdminGetFeeScreen;

