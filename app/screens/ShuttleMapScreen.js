import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Pressable,
  Alert
} from 'react-native';
import { GoogleMap, DistanceMatrixService } from 'react-google-maps';
import { GOOGLE_API_KEY } from '../../googleApiKey';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import marker from '../../bus.png';
import axios from 'axios';
import { BASE_URL } from '../config/index';
import { Loading } from '../components/Loading';
import Button from '../components/Button'
import WhiteButton from '../components/WhiteButton'
import { NavigationContainer } from '@react-navigation/native';


navigator.geolocation = require('@react-native-community/geolocation');

let polylineInstance = null;

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {
        latitude: 24.92292171,
        latitudeDelta: 0.0922,
        longitude: 67.10428846,
        longitudeDelta: 0.0421,
      },
      polyLineCoordinates: [],
      markerPosition: {
        // longitude: null,
        // latitude:null
        longitude: 67.1142597525609,
        latitude: 24.93219222192159

      },
      route_id: null,
      route_coords: [],
      error: '',
      modalVisible: false,
      loading: false
    };
  }

  componentDidMount() {
    // console.log('props', this.props.route)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        this.setState({ initialPosition: region, route_id: this.props.route.params.route_id,  error: '' });
        console.log(
          'lat ' +
          position.coords.latitude +
          ' longi ' +
          position.coords.longitude,
        );
        console.log('initialPosition');
        console.log(this.state.initialPosition);
        // console.log(this.s)
      },
      (error) => console.log('Error ' + JSON.stringify(error)),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );

    //this.sendToServer()
  }

  // componentWillUnmount() {
  //   iGeolocation.clearWatch(this.locationWatchId);
  // }
   setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onCloseModal = (invisible) => {
    this.setState({modalVisible: invisible})
    this.props.navigation.navigate('StudentHomeScreen')
    
  }
  getDistance = async () => {
    //this.setModalVisible(true)
    const userCoords = [this.state.initialPosition.latitude, this.state.initialPosition.longitude]
    const driverCoords = [this.state.markerPosition.latitude, this.state.markerPosition.longitude]

    // get location of base
    const OriginLocation = userCoords;

    // get locations of targets
    const DestinationLocation = driverCoords;

    // prepare final API call
    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    let params = `origins=${OriginLocation}&destinations=${DestinationLocation}&mode=driving&departure_time=now&traffic_model=optimistic&key=${GOOGLE_API_KEY}`;
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;


    console.log("user cord:", userCoords);
    console.log("driver cord :", driverCoords);
    console.log("finalApiURL:\n");
    console.log(finalApiURL);

    // get duration/distance from base to each target
    try {
      let response = await fetch(finalApiURL);
      let responseJson = await response.json();
      console.log("responseJson:\n");
      console.log('response', responseJson);
      // if(responseJson.error_message === null){
      //   this.setState({error: responseJson.error_message})
      // }
      // *********** add exception handling if responseJson does  not return valid data *******
      //else {
        console.log("trynna get response", responseJson.rows[0].elements[0].duration.text)
        this.setState({ eta: responseJson.rows[0].elements[0].duration_in_traffic.text })

        let stringmin = responseJson.rows[0].elements[0].duration_in_traffic.text
        let stringmintime = stringmin.split(' ');
        let stringminNum = parseInt(stringmintime);
        console.log(stringminNum);

        if (stringminNum === 1){
          console.log("GONNA CROSS YOU SOON", stringminNum)
          this.setModalVisible(true)
        }
      }
    //}
     catch (error) {
      console.error('checking error',error);
    }
  }

  getPolyLineCoordinates = async (state) => {
    if (state === 'start') {
      const response = await axios.post(`${BASE_URL}/get_location`, {
        driver_id: this.state.route_id,
      });
      console.log({ response: response.data });
      if(response.data.msg !== null){
        this.setState({error: response.data.msg})
      }
   if(response.data.id !== undefined)
      {
      this.setState({
        polyLineCoordinates: response.data.id.location_history,
        markerPosition:
          response.data.id.location_history[
          response.data.id.location_history.length - 1
          ],
      });
      polylineInstance = setInterval(async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/get_location`,
            {
              driver_id: this.state.route_id,
            },
          );
          console.log('response', response.data)
          const history = response.data.id.location_history;
          console.log({ markerPosition: history[history.length - 1] });
          this.setState({
            polyLineCoordinates: history,
            markerPosition: history[history.length - 1],
          });
        } catch (err) {
          console.log({ err });
        }
      }, 5000);
    }
    } else {
      console.log({ polylineInstance });
      if (polylineInstance) {
        clearInterval(polylineInstance);
      }

   
    }
    console.log('here');
  }

  addingMarkers = async () => {
    console.log('Route id',this.state.route_id)
    try {
    this.setState({loading: true})
      axios.get(`${BASE_URL}/route/get/` + this.state.route_id)
        .then((response) => {
          let route_coords = response.data.route_coords
          this.setState({
            route_coords: route_coords,
            loading: false
          })
        })
    }
    catch (err) { }
  }

  render() {
    const { coordinates, polyLineCoordinates, markerPosition, addingMarkers } = this.state;
     const { modalVisible, loading } = this.state;
    let markerList = [];
    for (let i = 0; i < this.state.route_coords.length; i++) {
      markerList.push(
        <Marker
          key={i}
          style={styles.map}
          draggable
          coordinate={{
            latitude: this.state.route_coords[i][0],
            longitude: this.state.route_coords[i][1]
          }}>
        </Marker>)
    } 
    // console.log(markerList)
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          {/* <Header title="" /> */}
          <Text>Oops! The shuttle has been passed from your stop.</Text>
            <TouchableOpacity
              onPress={
                () => this.onCloseModal(false)
                }
            >
              <WhiteButton style={{marginTop: 10}}>Ok</WhiteButton>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <MapView
          draggable={false}
          style={styles.map}
          initialRegion={coordinates}>
          <Marker
            draggable={false}
            coordinate={{
              latitude: markerPosition.latitude || coordinates.latitude,
              longitude: markerPosition.longitude || coordinates.longitude,
            }}>
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 25,
                height: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              }}>
              <Image source={marker} style={{ width: 25, height: 25 }} />
            </View>
          </Marker>
          {markerList}

          <Polyline
            coordinates={polyLineCoordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          />
        </MapView>
        </View>
        <View style={{ flexDirection: 'row', margin: 5, paddingVertical: 10 }}>
         <TouchableOpacity
            onPress={() => {
              this.addingMarkers();
            }}
          >
             <Button style={styles.button}>Check Routes</Button>
          </TouchableOpacity>

            <TouchableOpacity
            onPress={() => {
              this.getDistance();
            }}
          >
             <WhiteButton style={styles.button}>Calculate ETA</WhiteButton>
              <Text style={{textAlign: 'center'}}>ETA: {this.state.eta ? this.state.eta : 'no eta available'} </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.error}> {this.state.error}</Text>
        <View style={{ flexDirection: 'row', margin: 5, paddingVertical: 10 }}>
       
        <TouchableOpacity
            onPress={() => {
                 this.getPolyLineCoordinates('start');
            }}
          >
             <Button style={styles.button}>Start Tracking</Button>
          </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
             this.getPolyLineCoordinates('stop');
            }}
          >
             <WhiteButton  style={styles.button}>Stop Tracking</WhiteButton>
              
          </TouchableOpacity>
           
        </View>
      <Loading loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    // ...StyleSheet.absoluteFillObject,

  },
  button: {
    width: 170
  },
  error: {
    color: 'red',
    textAlign: 'center'
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
});



