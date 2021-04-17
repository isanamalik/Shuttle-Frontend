import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { GoogleMap, DistanceMatrixService } from 'react-google-maps';
import {GOOGLE_API_KEY} from '../../googleApiKey';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import marker from '../../bus.png';
import axios from 'axios';

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
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        this.setState({initialPosition: region});
        console.log(
          'lat ' +
            position.coords.latitude +
            ' longi ' +
            position.coords.longitude,
        );
        console.log('initialPosition');
        console.log(this.state.initialPosition);
      },
      (error) => console.log('Error ' + JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    //this.sendToServer()
  }

  // componentWillUnmount() {
  //   iGeolocation.clearWatch(this.locationWatchId);
  // }

  getDistance= async () =>
{
  const userCoords =[this.state.coordinates.latitude, this.state.coordinates.longitude]
  const driverCoords =[this.state.markerPosition.latitude, this.state.markerPosition.longitude]

    // get location of base
    const OriginLocation =  userCoords;

    // get locations of targets
    const DestinationLocation = driverCoords;

    // prepare final API call
    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    let params = `origins=${OriginLocation}&destinations=${DestinationLocation}&key=${GOOGLE_API_KEY}`;  
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;

 
    console.log("user cord biyatch:", userCoords);
    console.log("driver cord biyatch:", driverCoords);
    console.log("finalApiURL:\n");
    console.log(finalApiURL);

    // get duration/distance from base to each target
    try {
            let response =  await fetch(finalApiURL);
            let responseJson = await response.json();
            console.log("responseJson:\n");
            console.log(responseJson);

           console.log ("trynna get response", responseJson.rows[0].elements[0].duration.text)
           this.setState({eta:responseJson.rows[0].elements[0].duration.text})
        } catch(error) {
            console.error(error);
        } 
  
}

  getPolyLineCoordinates = async (state) => {
    if (state === 'start') {
      const response = await axios.post('http://40.76.93.155/get_location', {
        driver_id: '6969696',
      });
      console.log({response: response.data.id});
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
            'http://40.76.93.155/get_location',
            {
              driver_id: '6969696',
            },
          );
          const history = response.data.id.location_history;
          console.log({markerPosition: history[history.length - 1]});
          this.setState({
            polyLineCoordinates: history,
            markerPosition: history[history.length - 1],
          });
        } catch (err) {
          console.log({err});
        }
      }, 5000);
    } else {
      console.log({polylineInstance});
      if (polylineInstance) {
        clearInterval(polylineInstance);
      }
    }

    console.log('here');
  };

  render() {
    const {coordinates, polyLineCoordinates, markerPosition} = this.state;
    return (
      <View style={styles.container}>
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
              <Image source={marker} style={{width: 25, height: 25}} />
            </View>
          </Marker>
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
        <TouchableOpacity
          onPress={() => {
            this.getPolyLineCoordinates('start');
          }}
          style={styles.button}>
          <Text>Start Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.getPolyLineCoordinates('stop');
          }}
          style={styles.redButton}>
          <Text>Stop Tracking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {
            this.getDistance();
          }}
          style={styles.button}>
          <Text>Calculate ETA</Text>
        </TouchableOpacity>
          <Text>ETA: {this.state.eta? this.state.eta : 'no eta available'} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '90%',
    height: '70%',
  },
  button: {
    backgroundColor: 'lightblue',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
  },
  redButton: {
    backgroundColor: 'lightyellow',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
  },
});



