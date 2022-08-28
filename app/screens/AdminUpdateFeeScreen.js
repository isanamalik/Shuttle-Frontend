import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, Modal } from 'react-native';
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

const monthsList = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
]

const yearsList = [
  { label: '2023', value: '2023' },
  { label: '2022', value: '2022' },
  { label: '2021', value: '2021' },
  { label: '2020', value: '2020' },
  { label: '2019', value: '2019' },
];

const feeStatusList = [
  { label: 'Paid', value: 'Paid' },
  { label: 'Unpaid', value: 'Unpaid' },
];

const AdminUpdateFeeScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState({ value: '', error: '' });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [month, setMonth] = React.useState(undefined);
  const [monthError, setMonthError] = React.useState("");
  const [monthOpen, setMonthOpen] = React.useState(false);

  const onMonthOpen = React.useCallback(() => { }, []);

  const [year, setYear] = React.useState(undefined);
  const [yearError, setYearError] = React.useState("");
  const [yearOpen, setYearOpen] = React.useState(false);

  const onYearOpen = React.useCallback(() => { }, []);

  const [feeStatus, setFeeStatus] = React.useState(undefined);
  const [feeStatusError, setFeeStatusError] = React.useState("");
  const [feeStatusOpen, setFeeStatusOpen] = React.useState(false);

  const onFeeStatusOpen = React.useCallback(() => { }, []);


  const updateFeeStatus = async () => {
    setError('')
    const registrationNumberError = registrationNumberValidator(registrationNumber.value)
    const monthError = monthValidator(month);
    const yearError = yearValidator(year);
    const feeStatusError = feeValidator(feeStatus);


    if (registrationNumberError || monthError || yearError || feeStatusError) {
      setRegistrationNumber({ ...registrationNumber, error: registrationNumberError })
      setMonth(month);
      setYear(year);
      setFeeStatus(feeStatus);
      setMonthError(monthError);
      setYearError(yearError);
      setFeeStatusError(feeStatusError)

      return;
    }

    try {
      setLoading(true);
      const request = await axios.post(`${BASE_URL}/admin/insert_fee`, {
        paid_date: year + '-' + month,
        st_reg_number: registrationNumber.value,
        fee_status: feeStatus,
        paid_month: month + " " + year
      }).then((response) => {
        console.log('check response', response.data)
        setLoading(false)
        if (response.data.hasOwnProperty('msg') === true) {
          console.log('show error message here')
          setError(response.data.msg)
        }
        else {
          console.log('show data')
          setModalVisible(true)
          setRegistrationNumber({ value: '' })
          setMonth({ value: '' })
          setYear({ label: '' })
          setFeeStatus({ label: '' })
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
    <View style={{ backgroundColor: '#800' }}>
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
        <Text style={{ color: 'white', fontSize: 20, marginTop: 5 }}>
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
                <Text style={styles.modaltext}>
                  Fee Status has been updated. Click ok to update another record
                </Text>
                <TouchableOpacity onPress={() => onCloseModal()}>
                  <WhiteButton style={{ marginTop: 10, borderColor: '#800' }}>Ok</WhiteButton>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ padding: 10, width: '90%' }}>
          <Text style={styles.UniLabel}>NED University of Engineering and Technology</Text>

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
              placeholderTextColor="#800"
              color='#800'
              style={styles.input}
              placeholder="Registration Number(e.g 4001048)"
              returnKeyType="next"
              value={registrationNumber.value}
              onChangeText={(text) =>
                setRegistrationNumber({ value: text, error: '' })
              }
              error={!!registrationNumber.error}
              errorText={registrationNumber.error}
            />
            <MaterialIcons
              style={styles.icon}
              name="search"
              size={30}
              color="#800"
            />

            <DropDown
              zIndex={3000}
              zIndexInverse={3000}
              placeholder="SELECT MONTH"
              open={monthOpen}
              value={month}
              items={monthsList}
              setOpen={setMonthOpen}
              onOpen={onMonthOpen}
              setValue={setMonth}
            />

            {monthError?.length > 0 ? <Text style={styles.error}>{monthError}</Text> : null}

            <DropDown
              zIndex={20}
              zIndexInverse={20}
              placeholder="SELECT YEAR"
              open={yearOpen}
              value={year}
              items={yearsList}
              setOpen={setYearOpen}
              onOpen={onYearOpen}
              setValue={setYear}
            />

            {yearError?.length > 0 ? <Text style={styles.error}>{yearError}</Text> : null}


            <DropDown
              zIndex={20}
              zIndexInverse={20}
              placeholder="SELECT FEE STATUS"
              open={feeStatusOpen}
              value={feeStatus}
              items={feeStatusList}
              setOpen={setFeeStatusOpen}
              onOpen={onFeeStatusOpen}
              setValue={setFeeStatus}
            />

            {feeStatusError?.length > 0 ? <Text style={styles.error}>{feeStatusError}</Text> : null}

          </View>
          <View style={styles.row}>
            <Text style={styles.error}>{error}</Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
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
  UniLabel: {
    color: '#800',
    textAlign: 'center',

  },
  modaltext: {
    color: 'white'
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
    backgroundColor: '#800',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#800',
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
    color: '#800',
    // backgroundColor: '#800',

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

