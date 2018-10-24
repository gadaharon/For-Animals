import React, { Component } from 'react';
import { Text, View, TextInput, Modal } from 'react-native';
import { Container, Header, Right, Left, Body, Button, Icon, List, ListItem, Item, Thumbnail, Content, Toast, Root  } from 'native-base';
import axios from 'axios';
import { connect } from "react-redux";


import AnimalPostModal from '../PetModalScreens/PetPostModal';
import Distance from '../../calculateDistance/DistanceCalculator';


const URL = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx';


export class SearchScreen extends Component {
    static navigationOptions = {
            header: null
};
constructor(props){
    super(props);
    this.state = {
        searchItem: '',
        resultSearch: [],
        noItemFound: '',
        isVisable: false,
        color:'',
        currentAnimal: {}
    }
    this.res = <Text></Text>
}

onSearchFieldChange = text => {
    this.setState({ searchItem: text })
}

onSearchSubmit = async () => {
    const { user } = this.props.auth
    await axios.post(`${URL}/Search`,{
        fieldToSearch: this.state.searchItem,
        email: user.email
    })
    .then(res => {
        this.setState({resultSearch: JSON.parse(res.data.d), noItemFound: '', color: ''})
    })
    .catch(err => { console.log(err); this.setState({resultSearch:[]}); this.showToast()});
}


onModalHandler = () => {
    this.setState({isVisable: !this.state.isVisable})
}

showToast(){
    Toast.show({
        text: "No Result..",
        buttonText: "Ok",
        duration: 3000
      })
}

  render() {
    if(this.state.resultSearch.length !== 0){
        this.res = this.state.resultSearch.map((item, index) => 
        <ListItem key={index} onPress={() => this.setState({isVisable: true, currentAnimal: item})}>
              <Thumbnail size={80} source={{ uri: item.PhotoURL }} />
              <Body style={{marginLeft:15}}>
                <Text style={{fontWeight:'bold', fontSize:22}}>{item.PetName} ({item.Age})</Text>
                <Text note>{item.Type}</Text>
                <Text note>{item.Breed}</Text>
              </Body>
              <Right>
              <Distance location={item.Location} />
            </Right>
            </ListItem>
    )
    }
    return (
        <Root>
        <Container style={{backgroundColor:'#fff'}}>
        <Header style={{height: 77, backgroundColor:'lawngreen'}}>
           <Left style={{marginTop: 7}}>
            <Button transparent onPress={()=> this.props.navigation.navigate('Home')  }>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{marginTop: 7}}>
          </Body>
            <Right style={{marginTop: 7}}>
                <TextInput 
                    underlineColorAndroid='transparent'
                    onChangeText={this.onSearchFieldChange}
                    style={{width: 250,backgroundColor: 'white', marginTop: 10, padding: 5, borderRadius: 15}}
                    placeholder='Search' 
                />
                <Button transparent
            onPress={this.onSearchSubmit}
          >
                <Icon name='search' />
                </Button>
            </Right>    
        </Header>
        <Content>
         
       {
         this.state.resultSearch.length !== 0 ? <List>{this.res}</List> : <Text></Text>
       }
        </Content>

        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isVisable}
            onRequestClose={() => this.setState({ isVisable: false}) 
        }>
        <AnimalPostModal animal={this.state.currentAnimal} closeModal={this.onModalHandler} />      
        </Modal>  
        </Container>
    </Root>  
    )
  }
}

const mapStateToProps = state => ({ 
    animals: state.animals,
    auth: state.auth
})

export default connect( mapStateToProps )(SearchScreen)
