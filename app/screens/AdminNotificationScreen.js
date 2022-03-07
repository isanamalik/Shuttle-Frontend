import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import WhiteButton from '../components/WhiteButton';
import TextInput from '../components/TextInput';
import {Loading} from '../components/Loading';
import axios from 'axios';
import {BASE_URL} from '../config/index';
import {titleValidator, detailValidator} from '../core/utils';
import {COLORS} from '../constants';
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/BackButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../colors';

const AdminNotificationScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [title, setTitle] = useState({value: '', error: ''});
  const [detail, setDetail] = useState({value: '', error: ''});
  const [editTitle, setEditTitle] = useState({value: '', error: ''});
  const [editDetail, setEditDetail] = useState({value: '', error: ''});
  const [editID, setEditID] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notificationInfo, updateNotificationInfo] = useState([]);
  const [testInfo, updateTestInfo] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const deleteNotification = async (delete_noti_id) => {
    console.log('delete id', delete_noti_id);
    setLoading(true);
    try {
      const delete_request = await axios
        .post(`${BASE_URL}/admin/delete_notification`, {
          _id: delete_noti_id,
        })
        .then((res) => {
          fetchData();
          console.log(res);
          setLoading(false);
        });
    } catch (e) {
      console.log('some error', e);
    }
  };
  const fetchData = async () => {
    try {
      axios.get(`${BASE_URL}/student/get_notifications`).then((res) => {
        setLoading(false);
        let response = res.data;
        console.log(res.data.length);
        let allNotificationInfo = [];
        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            console.log(response[i]._id);
            allNotificationInfo.push(
              <View style={styles.card} key={i + 1}>
                {/* <MaterialCommunityIcons name="edit" size={35} color={COLORS.darkblue}/> */}
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{response[i].title}</Text>

                  <Text style={styles.cardDetails}>{response[i].message}</Text>

                  <Text style={styles.time}>
                    {' '}
                    {Moment(response[i].createdAt).format(
                      'DD/MM/YYYY hh:mm A',
                    )}{' '}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingVertical: 20,
                    }}>
                    <Button
                      onPress={() =>
                        openEditModal(
                          response[i].title,
                          response[i].message,
                          response[i]._id,
                        )
                      }
                      style={styles.editBtn}>
                      <Text style={styles.editText}>EDIT</Text>
                    </Button>

                    <Button
                      onPress={() => deleteNotification(response[i]._id)}
                      style={styles.delBtn}>
                      <Text style={styles.delText}>DELETE</Text>
                    </Button>
                  </View>
                </View>
              </View>,
            );
          }
          updateNotificationInfo(allNotificationInfo);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const _onPostNotification = async () => {
    const titleError = titleValidator(title.value);
    const detailError = detailValidator(detail.value);
    if (titleError || detailError) {
      setTitle({...title, error: titleError});
      setDetail({...detail, error: detailError});
      return;
    }

    try {
      setModalVisible(false);
      setLoading(true);
      const request = await axios
        .post(`${BASE_URL}/admin/push_notification`, {
          title: title.value,
          notification_message: detail.value,
          // timestamp: 123456
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          fetchData();
        });
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  const openEditModal = (title, message, id) => {
    console.log(id);
    console.log('titleee', title);
    setEditTitle({value: title});
    setEditDetail({value: message});
    setEditID({value: id});
    setEditModalVisible(true);
    console.log('checking', editTitle.value, editDetail.value, editID.value);
  };

  const onUpdateNotification = async () => {
    console.log(
      'edit title',
      editTitle.value + 'edit message',
      editDetail.value + 'id',
      editID.value,
    );
    const titleError = titleValidator(editTitle.value);
    const detailError = detailValidator(editDetail.value);
    if (titleError || detailError) {
      setEditTitle({...editTitle, error: titleError});
      setEditDetail({...editDetail, error: detailError});
      return;
    }

    try {
      setLoading(true);
      setModalVisible(false);
      console.log(
        ' edit val in api',
        editTitle.value,
        editDetail.value,
        editID.value,
      );
      const request = await axios
        .post(`${BASE_URL}/admin/update_notification`, {
          title: editTitle.value,
          notification_message: editDetail.value,
          _id: editID.value,
          // timestamp: 123456
        })
        .then((response) => {
          console.log(response.data);
          if (response.data._id !== '') {
            setEditModalVisible(false);
            fetchData();
            setLoading(false);
          }
        });
    } catch (e) {
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
        <Text style={{color: 'white', fontSize: 18, marginTop: 5}}>
          UPDATE NOTIFICATIONS
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
      {/* <Ionicons name="edit" size={35} color={COLORS.darkblue}/> */}
      <View style={styles.bottomContainer}>
        <ScrollView>
          <View style={styles.centeredView}>
            <Modal
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text
                    style={{
                      color: '#800',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}>
                    ADD NEW NOTIFICATION
                  </Text>
                  <TextInput
                    placeholderTextColor={'#800'}
                    style={styles.input}
                    placeholder="Title"
                    returnKeyType="next"
                    value={title.value}
                    onChangeText={(text) => setTitle({value: text, error: ''})}
                    error={!!title.error}
                    errorText={title.error}
                  />
                  <TextInput
                    placeholderTextColor={'#800'}
                    style={styles.input}
                    placeholder="Notification Detail"
                    value={detail.value}
                    onChangeText={(text) => setDetail({value: text, error: ''})}
                    error={!!detail.error}
                    errorText={detail.error}
                  />
                  <Button
                    onPress={() => _onPostNotification()}
                    style={styles.subBtn}>
                    <Text style={styles.subText}>SUBMIT</Text>
                  </Button>
                </View>
              </View>
            </Modal>

            <View>
              <Button
                onPress={() => setModalVisible(true)}
                style={styles.notifyBtn}>
                <Text style={styles.notifyText}>ADD NOTIFICATION</Text>
              </Button>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#800',
                  marginBottom: 10,
                  marginLeft: 15,
                }}>
                ALL NOTIFICATIONS
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
      </View>
      <Loading loading={loading} />
      <Modal
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: '#800',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              EDIT NOTIFICATION
            </Text>
            <TextInput
              label="Title"
              returnKeyType="next"
              value={editTitle.value}
              onChangeText={(text) => setEditTitle({value: text, error: ''})}
              error={!!editTitle.error}
              errorText={editTitle.error}
            />
            <TextInput
              label="Notification Detail"
              value={editDetail.value}
              onChangeText={(text) => setEditDetail({value: text, error: ''})}
              error={!!editDetail.error}
              errorText={editDetail.error}
            />
            <Button
              onPress={() => onUpdateNotification()}
              style={styles.subBtn}>
              <Text style={styles.subText}>UPDATE</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomContainer: {
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
  notifyBtn: {
    margin: 40,
    marginHorizontal: 20,
    backgroundColor: '#800',
    borderRadius: 5,
    width: '90%',
  },
  notifyText: {
    color: 'white',
    fontSize: 20,
  },
  editBtn: {
    paddingVertical: 0,
    marginHorizontal: 10,
    backgroundColor: '#800',
    borderRadius: 5,
    width: '40%',
  },
  editText: {
    color: 'white',
    fontSize: 20,
  },
  delBtn: {
    marginHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#800',
    borderRadius: 5,
    width: '40%',
  },
  delText: {
    color: '#800',
    fontSize: 20,
  },
  subBtn: {
    marginTop: 20,
    paddingVertical: 0,
    backgroundColor: '#800',
    borderRadius: 5,
    width: '60%',
  },
  subText: {
    color: 'white',
    fontSize: 20,
  },
  modalView: {
    display: 'flex',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderColor: '#800',
    borderWidth: 2,
    marginTop: 120,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#D3D3D3',
    color: '#800',
    fontSize: 15,
  },
  card: {
    height: 180,
    margin: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 15,
    // marginBottom: 105
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#800',
    fontSize: 16,
  },
  cardDetails: {
    fontSize: 13,
    color: '#444',
  },
  time: {
    fontSize: 13,
    color: '#444',
    textAlign: 'right',
    marginTop: 30,
  },
  edit_button: {
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2
  },
});

export default AdminNotificationScreen;
