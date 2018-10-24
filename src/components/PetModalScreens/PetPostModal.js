import React, { Component } from 'react';
import {  Image, StyleSheet, Linking } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Thumbnail, Button, Icon, Left, Body, Right, Title } from 'native-base';

export class PetPostModal extends Component {

  render() {
    return (
    <Container>
        <Header style={{ backgroundColor:'lawngreen' }}>
        <Left>
            <Button transparent onPress={() => this.props.closeModal()}>
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
          source={{uri: this.props.animal.PhotoURL}}
        />
        <Content>
             <Card> 
                    <CardItem bordered>
                       <Left> 
                        <Left>
                            <Text>{this.props.animal.PetName} ({this.props.animal.Type})</Text>
                            <Text note>{this.props.animal.Breed}</Text>
                        </Left>   
                        <Body>
                        </Body>  
                       </Left>  
                    </CardItem> 
                    <CardItem bordered>
                       <Left> 
                        <Left>
                            {/* Pet Info */}
                            <Text note>Sex</Text>
                            <Text >{this.props.animal.Sex}</Text>
                            <Text note>Age</Text>
                            <Text >{this.props.animal.Age}</Text>
                            <Text note>Color</Text>
                            <Text >{this.props.animal.Color}</Text>
                            <Text note>Size</Text>
                            <Text>{this.props.animal.Size}</Text>
                            <Text note>About Me</Text>
                            <Text>{this.props.animal.AboutMe}</Text>
                        </Left>   
                        <Body>
                        </Body>  
                        </Left>    
                     </CardItem>
                     <CardItem bordered>
                    <Left>  
                    <Left>  
                        {/* Contact info */}
                        <Text note>Contact Name</Text>
                        <Text >{this.props.animal.Name}</Text>
                        <Text note>Email</Text>
                        <Text >{this.props.animal.Email}</Text>
                        <Text note>Phone Number</Text>
                        <Text >{this.props.animal.Number}</Text>
                        <Text note>Location</Text>
                        <Text><Icon type='FontAwesome' name='map-marker' style={{color: 'red', fontSize: 15}} /> {this.props.animal.Location}</Text>
                    </Left>
                      
                     <Right>
                     <Button transparent onPress={() => Linking.openURL(`tel:${this.props.animal.Number}`)}>
                        <Image
                            style={{width: 32, height: 32}} 
                            source={require('../../assets/images/call.png')}
                        />
                        </Button>
                    <Button transparent onPress={() => Linking.openURL(`sms:${this.props.animal.Number}`)}>
                        <Image
                            style={{width: 32, height: 32}} 
                            source={require('../../assets/images/sms.png')}
                        />
                    </Button>
                    <Button transparent onPress={() => Linking.openURL(`mailto:${this.props.animal.Email}`)}>
                        <Image
                            style={{width: 32, height: 32}} 
                            source={require('../../assets/images/email.png')}
                        />
                    </Button>
                     </Right> 
                    </Left>
                    </CardItem>        
                </Card> 
                </Content>    
    </Container>
       
    )
  }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    }
})

export default PetPostModal

