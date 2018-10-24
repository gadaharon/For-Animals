// Import Libraries
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Header, Left, Body, Right, Icon, Title, Content } from 'native-base';


// Import redux store
import store from './src/store';

// Import Components
import Login from './src/components/Login/Login';
import HomeScreen from './src/components/Home/HomeScreen';
import RegisterScreen from './src/components/Register/Register';
import MyPets from './src/components/MyPets/MyPets';
import AddPet from './src/components/AddPet/AddPet';
import userProfile from './src/components/userProfile';
import SearchScreen from './src/components/Search/SearchScreen';
import MyMap from './src/components/Maps/MyMap';
import IntroScreen from './src/components/Intro/AppIntro';
import MyPetProfile from './src/components/PetModalScreens/MyPetsModal';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading: true };
}

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

// Auth Navigator Screens
const AuthNavigator = createStackNavigator(
  {
  LoginScreen: Login,
  RegisterScreen: RegisterScreen
  }
)

const StackNavigator  = createStackNavigator(
  {
    SearchScreen: SearchScreen,
    MapScreen: MyMap

  }
)


const HomeNavigator = createDrawerNavigator({
  Home: {
    screen:HomeScreen
  },
  "My Pets": {
    screen: MyPets
  },
  "Add Pet": {
    screen: AddPet
  }
}
 ,{
  contentComponent: userProfile,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
}
)

const AppNavigator = createSwitchNavigator({
  Intro: IntroScreen,
  Auth: AuthNavigator,
  HomeScreen: HomeNavigator,
  Stack: StackNavigator,
  MyPetProfile: MyPetProfile
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
});

