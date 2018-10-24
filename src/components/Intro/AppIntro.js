import React, { Component } from 'react';
import { Text, ImageBackground, View, StyleSheet } from 'react-native';

export class AppIntro extends Component {

    state={
        introVisable: true
    }

   async componentDidMount() {
       await this.handleIntro();
    }

    handleIntro(){
        setTimeout(() => {
            this.props.navigation.navigate('LoginScreen')
        },5000)
    }

render() {
    return (
    <View style={{flex:1,}}>   
    <ImageBackground source={require('../../assets/images/appIntro.gif')} style={{width: '100%', height: '100%',}}>
    <View style={{alignItems:'center', backgroundColor: 'rgba(0,0,0,.6)',width: '100%', height: '100%'}}>
    <Text style={{marginTop:'50%', fontSize:32, color:'#00B200' }} >For Animals</Text>
    </View>
  </ImageBackground>
  </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0, 
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default AppIntro
