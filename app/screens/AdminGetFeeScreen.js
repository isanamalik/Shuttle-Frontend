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
    const [registrationNumber, setRegistrationNumber] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const onSearch = async () => {
    setError('')
    // setSearchResult([])
            const registrationNumberError = registrationNumberValidator(registrationNumber.value)

        if (registrationNumberError) {
            setRegistrationNumber({ ...registrationNumber, error: registrationNumberError })
            return;
    }
    try {
      setLoading(true);
      const request = await axios.post(`${BASE_URL}/route/by_name`, {
        route_location: locationName.value
      }).then((response) => {
       
        let searchResult = []
        let search = response.data
        console.log('response',search[1].route_id)
        if (search.length > 0) {
          for (let i = 0; i < search.length; i++) {
            console.log('route ids',search[i].route_id)
               if (i == 3 || i == 6 || i == 9 || i == 12 || i == 15) {
                
        searchResult.push(
          <Text key={search[i].route_id} style={{ flexDirection: 'row', justifyContent: 'center', margin: 50 }}>{'\n'}{'\n'} </Text>
        )
      }
      searchResult.push(
        <OptionItem
          key={i + 1}
          bgColor={['#46aeff', '#5884ff']}
          text={search[i].route_id}
          onPress={() => {
            navigation.navigate("ShuttleRouteScreen", {
              route_id: search[i].route_id 
            })
            // this.displayRoutes();
          }}

        />
      )
          }
          setSearchResult([...searchResult])
          setLoading(false);
          // console.log('res', searchResult)
        }
        else {
          if (response.data.length == 0) {
            setLoading(false);
            setError("Oops! No shuttle found for your route. Try another location")
          }
        }
      })
    } catch (e) {
      console.log(e)
      setError(e)
      setLoading(false)
    }
  }

  return (
    

       <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.container}>
      <Header title="Check Student Fee Status" />
      </View>
     <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
      
        <ScrollView>
           
          <View style={{ padding: 18, alignItems: 'center' }}>
         
            <TextInput
              label="Enter student registration number(e.g 4001096)"
              returnKeyType="next"
              value={registrationNumber.value}
              onChangeText={text => setRegistrationNumber({ value: text, error: '' })}
              error={!!registrationNumber.error}
              errorText={registrationNumber.error}
            />
            <Button mode="contained" onPress={onSearch} style={{alignContent: 'center', marginTop: 10}}>Search</Button>
           
            <View style={styles.row}>
              <Text style={styles.error}>{error}</Text>
            </View>
          </View>

          </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
        //  flex: 1,
        // marginTop: 40,
        // marginBottom: 40,
         
    },
 
  });

export default AdminGetFeeScreen;

