import React, { Component } from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { Icon } from 'native-base';
import axios from 'axios';
import { } from 'expo';

export class DistanceCalculator extends Component {
    constructor(props){
        super(props);
        this.state ={
            myLocation: {},
            otherLocation: '',
            killometers: 0
        }
    }

   async componentWillMount() {
      await  this.showLocation();
      await this.showMyLocation();
    }

    showMyLocation = async () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({myLocation:{latitude: position.coords.latitude,longitude: position.coords.longitude}})
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000  }
     ); 
    }

    showLocation = async () => {
    await this.showMyLocation()

     await   axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
            address: this.props.location,
            key:'AIzaSyAkZ3kcJs0qZ-WKpFdHed60Vve9PJlU3GY'
        }
        })
        .then(res => {
            this.setState({ otherLocation: res.data.results[0].geometry.location })  

        })
        .catch(err => console.log(err));

        
    }

    calculateDistance = () => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(this.state.otherLocation.lat - this.state.myLocation.latitude);  // this.deg2rad below
        var dLon = this.deg2rad(this.state.otherLocation.lng - this.state.myLocation.longitude); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(this.state.myLocation.latitude)) * Math.cos(this.deg2rad(this.state.otherLocation.lat)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
        }

    deg2rad(deg) {
        return deg * (Math.PI/180)
      }
  render() {
      if(Object.keys(this.state.myLocation).length !== 0){
        return (
            <View>
            <Text style={{color: '#7FFF7F', fontWeight:'bold', fontSize:18}}>{Math.round(this.calculateDistance())} km  <Icon style={{color: '#7FFF7F'}} name='ios-navigate' /></Text>
            </View>
          )
      }
      return(
          <Text>Loading...</Text>
      )
    
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})

export default DistanceCalculator






