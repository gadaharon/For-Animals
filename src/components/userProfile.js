import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { logoutUser } from '../actions/authAction';

const userProfile = (props) => {
    return(
    <View>
      <SafeAreaView style={{marginTop:23}} forceInset={{ top: 'always', horizontal: 'never' }}>
        
        <Text style={{textAlign: 'center', backgroundColor: '#99FF99',padding:10,  color:'#fff'}}><Icon name="ios-person-outline" /> {props.auth.user.name}</Text>
        <DrawerItems {...props} />
        <Button transparent onPress={()=>{ props.logoutUser(); props.navigation.navigate('LoginScreen')}}>
          <Text style={{marginLeft:17, fontWeight: 'bold'}}>Logout</Text>
        </Button> 
      </SafeAreaView>
    </View>
    )
};

  const mapStateToProps = state => ({
      auth: state.auth
  })


const styles = StyleSheet.create({
  userProfile: {
    backgroundColor: '#69BEB1'
  }
})

  export default connect(mapStateToProps, { logoutUser })(userProfile);