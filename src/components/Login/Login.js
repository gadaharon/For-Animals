import React, { Component } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, Image
} from 'react-native';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';


class Login extends Component{
    static navigationOptions = {
        title: 'Sign In',
        headerStyle: {
            backgroundColor: 'lawngreen',
          },
          headerTintColor: '#fff',
      };
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

componentDidUpdate(){
    if(this.props.auth.isAuthenticated === true) {
        this.props.navigation.navigate("HomeScreen");
    }
}
    
    onEmailChange = text => {
        this.setState({ email: text });
    }
    onPasswordChange = text => {
        this.setState({ password: text });
    }

    onLoginHandle = () => {
    const data = {
        email: this.state.email,
        password: this.state.password
    }
        this.props.loginUser(data);  
}


    render(){
        const { errors } = this.props;
       
        return (
            
            <View style={styles.container}>
                <View style={styles.title}>
                <Image source= {require('../../assets/images/shelter.png')} />
                <Text style={{fontSize:35}}>For Animals</Text>
                </View>


                {errors.Email ? <Text style={styles.error}>{errors.Email}</Text> : null }
                <TextInput placeholder="Email" style={styles.text} underlineColorAndroid='transparent' onChangeText={ this.onEmailChange } />
                
                {errors.Password ? <Text style={styles.error}>{errors.Password}</Text> : null }
                <TextInput placeholder="Password" style={styles.text} underlineColorAndroid='transparent' secureTextEntry={true} onChangeText={this.onPasswordChange}/> 

                <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                    <Text>Create new account</Text>
                </TouchableOpacity>

                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={this.onLoginHandle} > 
                        <Text style={{color:'#fff'}}>Sign In</Text>
                    </TouchableOpacity>
                </View>               
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    title:{
        flex: 0.3,
        justifyContent: 'flex-start',
        marginTop: 5
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
    error:{
       fontSize: 10,
       color: '#dd2c00',

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

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

//onPress={() => this.props.navigation.navigate('HomeScreen')}

export default connect(mapStateToProps, { loginUser })(Login); 