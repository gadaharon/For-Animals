import React, { Component } from 'react';
import {  Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Thumbnail, Button, Icon, Left, Body, Right, Title } from 'native-base';
import axios from 'axios';



const URL = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx';

export class MyPetsModal extends Component {
    constructor(props){
        super(props);
    }

    onDeleteHandler = postId => {
        axios.post(`${URL}/DeleteAnimal`, {
            postId: postId
        })
        .then(res =>{
             console.log('Result', res.data.d);
    }).catch(err => console.log(err.response.data.d));
    }


  render() {
      const pet = this.props.navigation.state.params.pet
      console.log(pet);
    return (
        <Container style={{flex:1, justifyContent:'flex-start', backgroundColor: '#eee'}}>
           <Header style={{height: 77, backgroundColor:'lawngreen'}}>
        <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('My Pets') }>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Go Back</Title>
          </Body>
          <Right />
         </Header>   
        <Image
          style={{height: 200, width: '100%'}}
          source={{uri: pet.PhotoURL}}
        />
        <Content>
             <Card> 
                    <CardItem bordered>
                       <Left> 
                        <Left>
                            <Text>{pet.PetName} ({pet.Type})</Text>
                            <Text note>{pet.Breed}</Text>
                        </Left>   
                        <Body>
                        </Body>  
                       </Left>  
                    </CardItem> 
                    <CardItem bordered>
                       <Left> 
                        <Left>
                            <Text note>Sex</Text>
                            <Text >{pet.Sex}</Text>
                            <Text note>Age</Text>
                            <Text >{pet.Age}</Text>
                            <Text note>Color</Text>
                            <Text >{pet.Color}</Text>
                        </Left>   
                        <Body>
                        </Body>  
                        </Left>    
                     </CardItem>
                     <CardItem bordered>
                         <Left>
                             <Button transparent onPress={() =>{ this.onDeleteHandler(pet.PostID); this.props.navigation.navigate('My Pets')  }}>
                                 <Icon name='trash' style={{color: 'red', fontSize: 28}} />
                            </Button>   
                        </Left>
                        <Body>
                        </Body>
                        <Right>
                            <Button transparent>
                            <Image
                                source={require('../../assets/images/edit.png')}
                            />
                            </Button>
                        </Right>   
                    </CardItem>       
                </Card> 
                </Content>    
    </Container>
    )
  }
}

export default MyPetsModal
