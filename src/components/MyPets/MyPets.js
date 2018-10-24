import React, {Component} from 'react';
import { 
    Text, StyleSheet, Image, Modal
} from 'react-native';

import { Container, Header, Right, Left, Body, Button, Icon, List, ListItem, Thumbnail, Title } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
//import { stat } from 'fs';

import MyPetsModal from '../PetModalScreens/MyPetsModal';

const URL = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx';

class MyPets extends Component {
    constructor(props){
        super(props);
        this.state = {
            myPets: [],
            isVisable: false,
            currentAnimal: {},
        }   
    }


    showMyPets(){
        const { user } = this.props.auth;
        axios.post(`${URL}/ShowMyPets`,{
            email: user.email
        }).then(res => this.setState({ myPets: JSON.parse(res.data.d) }))
        .catch(err => console.log(err));
        console.log("did mount")
    }

    componentDidMount(){
       this.showMyPets()
    }
    
    onModalHandler = () => {
        this.setState({isVisable: !this.state.isVisable},this.forceUpdate());
    }

    render() {
        
      const petsArr = this.state.myPets.map((item, index) => 
            <ListItem thumbnail key={index} onPress={() => this.props.navigation.navigate('MyPetProfile', { pet: item }) }>
            <Left>
                <Thumbnail  source={{ uri: item.PhotoURL }} />
              </Left>
              <Body>
              <Text style={{fontWeight:'bold', fontSize:22}}>{item.PetName} ({item.Age})</Text>
                <Text note>{item.Type}</Text>
                <Text note>{item.Breed}</Text>
              </Body>
              <Right>
              </Right>
             </ListItem>
    )
        return(
    //   Header      
    <Container>
        <Header style={{height: 77, backgroundColor:'lawngreen'}}>
          <Left style={{marginTop: 7}}>
          <Button transparent onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='menu' />
            </Button>
          </Left>
          <Body style={{marginTop: 7}}>
          <Title>My Pets</Title>
          </Body>
          <Right style={{marginTop: 7}}>
            <Button transparent>
                <Icon name="search" onPress={() => this.props.navigation.navigate('SearchScreen')} />
            </Button>
            <Button transparent onPress={() => { this.props.navigation.navigate('MapScreen')} }>
                <Image
                     style={{width: 32, height: 32}} 
                    source={require('../../assets/images/map.png')}
                />
            </Button>
            </Right>   
        </Header>
    {/* Body */}
        <List>
            {petsArr}
          </List>

     {/* <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isVisable}
        onRequestClose={() => this.setState({ isVisable: false})
        }>
        <MyPetsModal animal={this.state.currentAnimal} closeModal={this.onModalHandler} />      
    </Modal>      */}
      </Container>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }    
})

const mapStateToProps = state => ({
   auth: state.auth     
})

export default connect(mapStateToProps, {logoutUser})(MyPets);

