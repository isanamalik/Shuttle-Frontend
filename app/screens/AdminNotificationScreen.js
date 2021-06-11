import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert, Modal, Text, ScrollView , TouchableOpacity, StatusBar
} from 'react-native';
import Header from '../components/Header'
import Button from '../components/Button';
import WhiteButton from '../components/WhiteButton';
import TextInput from '../components/TextInput';
import { Loading } from '../components/Loading';
import axios from "axios";
import { BASE_URL } from '../config/index';
import {
  titleValidator,
  detailValidator
} from '../core/utils';
import { COLORS } from '../constants';
import Moment from 'moment';

const AdminNotificationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState({ value: '', error: '' });
  const [detail, setDetail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notificationInfo, updateNotificationInfo] = React.useState([]);
  useEffect(() => {
    setLoading(true)
     try {
      axios.get(`${BASE_URL}/student/get_notifications/`)
        .then((res) => {
          setLoading(false)
          let response = res.data
          console.log(res.data.length)
           let allNotificationInfo = [];
           if(response.length > 0 ){
             for(let i=0;i<response.length; i++){
            notificationInfo.push(
              <View style={styles.card} key={i+1}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{response[i].title}</Text>
                <Text style={styles.cardDetails}>
                {response[i].message}
                </Text>
                  <Text style={styles.time}>{Moment(res.data[i].timestamp).format('DD/MM/YYYY hh:mm:ss')} </Text>
              </View>
            </View>
            )
             }
            updateNotificationInfo([...notificationInfo, allNotificationInfo])
           }
     
        })
    }
    catch (err) { console.log(err)}
  }, [])

  const _onPostNotification = async () => {
    const titleError = titleValidator(title.value);
    const detailError = detailValidator(detail.value);
    if (titleError || detailError) {
      setTitle({ ...title, error: titleError });
      setDetail({ ...detail, error: detailError });
      return;
    }

    try {
      setModalVisible(false)
      setLoading(true)
      const request = await axios.post(`${BASE_URL}/admin/push_notification`, {
        title: title.value,
        notification_message: detail.value,
        timestamp: 123456
      }).then((response) => {
        setLoading(false)
        console.log(response.data)
        let newResponse =  
        <View style={styles.card} key={1000}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{title.value}</Text>
          <Text style={styles.cardDetails}>
          {detail.value}
          </Text>
            <Text style={styles.time}>{Moment(response.data[i].timestamp).format('DD/MM/YYYY hh:mm:ss')} </Text>
        </View>
      </View>
       updateNotificationInfo([...notificationInfo, newResponse])
      })
    } catch (e) {  
      setError(e)
      setLoading(false)
    }

  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
      <View style={{marginTop: 15}}>
    <Header title="Notifications" />
    </View>
    <View style={styles.centeredView}>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <Header title="Add New Notification" />
          <TextInput
              label="Title"
              returnKeyType="next"
              value={title.value}
              onChangeText={text => setTitle({ value: text, error: '' })}
              error={!!title.error}
              errorText={title.error}
            />
             <TextInput
              label="Notification Detail"
              value={detail.value}
              onChangeText={text => setDetail({ value: text, error: '' })}
              error={!!detail.error}
              errorText={detail.error}
            />
            <TouchableOpacity
              onPress={() => _onPostNotification()}
            >
              <WhiteButton style={{marginTop: 10}}>Submit</WhiteButton>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
      style={{justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15}}
        onPress={() => setModalVisible(true)}
      >
        <Button style={{width: 200}}>Add Notification</Button>
      </TouchableOpacity>
      <View>
      <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.darkblue,
            marginBottom: 10,
            marginLeft: 15
          }}>
          All notifications
        </Text>
      {notificationInfo}
      </View>
    </View>
  
    </ScrollView>
    <Loading loading={loading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    modalView: {
      display: "flex",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      borderColor: '#0d47a1',
      borderWidth: 2,
      marginTop: 120,
    
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    card: {
      height: 100,
      margin: 5,
      flexDirection: 'row',
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      // marginBottom: 105
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
       textDecorationLine: 'underline'
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

export default AdminNotificationScreen;

