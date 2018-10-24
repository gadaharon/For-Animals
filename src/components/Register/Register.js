import React, { Component } from 'react';
import {
 View, Text, TextInput, TouchableOpacity, StyleSheet
    } from 'react-native';
import axios from 'axios';

export default class RegisterScreen extends Component{
    static navigationOptions = {
        title: 'Sign Up!',
        headerStyle: {
            backgroundColor: 'lawngreen',
          },
          headerTintColor: '#fff',
      };
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
            phone: ''
        }
        this.URL = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx'

    }
    // Text change handlers
    onNameChange = text => { this.setState({ name: text })};
    onEmailChange = text => { this.setState({ email: text })};
    onPasswordChange = text => { this.setState({ password: text })};
    onPassword2Change = text => { this.setState({ confirmedPassword: text })};
    onPhoneChange = text => { this.setState({ phone: text })};
    
    onRegisterHandler = () => {
        axios.post(`${this.URL}/Register`,{
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmedPassword: this.state.confirmedPassword,
            phone: this.state.phone
        })
        .then(res =>{ console.warn( res.data.d); this.props.navigation.navigate('LoginScreen')})
        .catch(err => console.warn(err.response.data.d));
    }



    
    alertState = () => {
        alert(this.state.name + " " + this.state.email +  " " + this.state.password + " " + this.state.confirmedPassword +  "" + this.state.phone )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                <Text style={{fontSize:35}}>Hello There!</Text>
                <Text style={{fontSize: 20}}>Sign up now for free to start</Text>
                </View>

                <TextInput placeholder="Name" style={styles.text} underlineColorAndroid='transparent' onChangeText ={this.onNameChange}/>

                <TextInput placeholder="Email" style={styles.text} underlineColorAndroid='transparent' onChangeText ={this.onEmailChange}/>

                <TextInput placeholder="Password" style={styles.text} underlineColorAndroid='transparent' onChangeText ={this.onPasswordChange}/>

                <TextInput placeholder="Password Confirm" style={styles.text} underlineColorAndroid='transparent' onChangeText ={this.onPassword2Change}/>

                <TextInput placeholder="Phone Number" style={styles.text} underlineColorAndroid='transparent' onChangeText ={this.onPhoneChange}/>

                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={this.onRegisterHandler} > 
                        <Text style={{color:'#fff'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eee'
    },
    text: {
        width: 250,
        height: 35,
        paddingHorizontal: 5,
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5,
        borderColor: '#FFF',
        color: '#333',
        backgroundColor: '#FFF'
    },
    title:{
        flex: 0.3,
        justifyContent: 'flex-start'
    },
    buttonView: {
        height: 40,
        marginTop: 10,
        backgroundColor: '#76EE00',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    } 
})

//onPress={() => this.props.navigation.navigate('LoginScreen')}
