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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/BackButton'

const AdminNotificationScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
   const [editModalVisible, setEditModalVisible] = useState(false);
  const [title, setTitle] = useState({ value: '', error: '' });
  const [detail, setDetail] = useState({ value: '', error: '' });
  const [editTitle, setEditTitle] = useState({ value: '', error: '' });
  const [editDetail, setEditDetail] = useState({ value: '', error: '' });
  const [editID, setEditID] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notificationInfo, updateNotificationInfo] = useState([]);
  const [testInfo, updateTestInfo] = useState([]);
  useEffect(() => {
    setLoading(true)
    fetchData();
  }
  , [])

  const deleteNotification = async(delete_noti_id) =>  {
     console.log('delete id', delete_noti_id)
     setLoading(true)
     try {
          const delete_request =  await axios.post(`${BASE_URL}/admin/delete_notification`, {
          _id: delete_noti_id
        }).then((res) => {
            fetchData();
            console.log(res)
            setLoading(false)
        })
     }
     catch(e){ 
       console.log('some error', e)
     }

   }
  const fetchData = async () => {
    try {
      axios.get(`${BASE_URL}/student/get_notifications`)
        .then((res) => {
          setLoading(false)
          let response = res.data
          console.log(res.data.length)
           let allNotificationInfo = [];
           if(response.length > 0 ){
             for(let i=0;i<response.length; i++){
               console.log(response[i]._id)
            allNotificationInfo.push(
              <View style={styles.card} key={i+1}>
              {/* <MaterialCommunityIcons name="edit" size={35} color={COLORS.darkblue}/> */}
              <View style={styles.cardInfo}>   
                <Text style={styles.cardTitle}>{response[i].title}</Text>
                
                <Text style={styles.cardDetails}>{response[i].message}</Text>
                
                  <Text style={styles.time}> {Moment(response[i].createdAt).format('DD/MM/YYYY hh:mm A')} </Text>
                   <View style={{ flexDirection: 'row',justifyContent: 'center', paddingVertical: 20  }}>
              
                  <TouchableOpacity
                   onPress={() => openEditModal(response[i].title,response[i].message, response[i]._id) }
                  >
                    <Button  style={{width: 120}}>Edit</Button>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => deleteNotification(response[i]._id)}
                  >
                    <WhiteButton style={{width: 120}}>Delete</WhiteButton>
                  </TouchableOpacity>
                </View>
              </View> 
            </View>
            )}
            updateNotificationInfo( allNotificationInfo)
           }
     
        })
    }
    catch (err) { console.log(err)}
  }

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
        // timestamp: 123456
      }).then((response) => {
        setLoading(false)
        console.log(response.data)
         fetchData();
      })
    } catch (e) {  
      setError(e)
      setLoading(false)
    }

  };
const openEditModal = (title,message, id) => {
  console.log(id)
  console.log('titleee' ,title)
    setEditTitle({value: title});
    setEditDetail({value: message});
    setEditID({value: id});
    setEditModalVisible(true);
    console.log('checking', editTitle.value, editDetail.value, editID.value)
}


  const onUpdateNotification = async () => {
    console.log('edit title',editTitle.value + 'edit message', editDetail.value + 'id', editID.value)
    const titleError = titleValidator(editTitle.value);
    const detailError = detailValidator(editDetail.value);
    if (titleError || detailError) {
      setEditTitle({ ...editTitle, error: titleError });
      setEditDetail({ ...editDetail, error: detailError });
      return;
    }

    try {
       setLoading(true)
      setModalVisible(false)
      console.log(' edit val in api',editTitle.value, editDetail.value, editID.value)
      const request = await axios.post(`${BASE_URL}/admin/update_notification`, {
        title: editTitle.value,
        notification_message: editDetail.value,
        _id: editID.value
        // timestamp: 123456
      }).then((response) => {
        console.log(response.data)
        if(response.data._id !== ''){
          setEditModalVisible(false)
           fetchData();
            setLoading(false)
        }
        
      })
    } catch (e) {  
      setError(e)
      setLoading(false)
    }

  };

  return (
    <SafeAreaView style={{flex: 1}}>
    {/* <Ionicons name="edit" size={35} color={COLORS.darkblue}/> */}
      <ScrollView>
      <View style={{marginTop: 15}}>
    <Header title="Notifications" />
    </View>
    <BackButton goBack={() => navigation.navigate('AdminHomeScreen')} />
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
        {testInfo}
      {notificationInfo}
      <View style={styles.card}>
      {/* <MaterialCommunityIcons name="edit" size={35} color={COLORS.darkblue}/> */}
            {/* <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>ehwbjnkmw</Text>
              <Text style={styles.cardDetails}>
              gvhbuijok
              </Text>
                <Text style={styles.time}> aosjinjb </Text>
               
            </View> */}
          </View>
      </View>
    </View>
  
    </ScrollView>
    <Loading loading={loading} />
 <Modal
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <Header title="Edit Notification" />
          <TextInput
              label="Title"
              returnKeyType="next"
              value={editTitle.value}
              onChangeText={text => setEditTitle({ value: text, error: '' })}
              error={!!editTitle.error}
              errorText={editTitle.error}
            />
             <TextInput
              label="Notification Detail"
              value={editDetail.value}
              onChangeText={text => setEditDetail({ value: text, error: '' })}
              error={!!editDetail.error}
              errorText={editDetail.error}
            />
            <TouchableOpacity
              onPress={() => onUpdateNotification()}
            >
              <WhiteButton style={{marginTop: 10}}>Update</WhiteButton>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


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
      height: 180,
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
    edit_button: {
      // borderRadius: 20,
      // padding: 10,
      // elevation: 2
    }
  });

export default AdminNotificationScreen;

