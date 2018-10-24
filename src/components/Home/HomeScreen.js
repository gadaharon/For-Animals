import React, {Component} from 'react';
import { 
    Text, StyleSheet, Image, Modal 
} from 'react-native';
import { connect } from "react-redux";
import { getAnimals } from '../../actions/animalAction'
import { logoutUser } from '../../actions/authAction';


import { Container, Header, Right, Left, Body, Button, Icon, List, Title, ListItem, Thumbnail, Content} from 'native-base';
import { Font } from "expo";

import AnimalPostModal from '../PetModalScreens/PetPostModal';
import Distance from '../../calculateDistance/DistanceCalculator';
import Loading from '../LoadingScreen/MyLoading';


// Home Page -- See All Animal Posts

class HomePage extends Component{
    static navigationOptions = {
        title: 'Home'
    };
    constructor(props){
        super(props);
        this.state = { 
            loading: true,
            isVisable: false,
            currentAnimal: {}
         };
         this.animalArr = [];

    }

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        })
        this.setState({ loading: false });
        
      }

      componentDidMount(){
        const { user } = this.props.auth;
          this.props.getAnimals(user.email);
      }

      
      onModalHandler = () => {
          this.setState({isVisable: !this.state.isVisable})
      }

      
    render(){
        if (!this.state.loading) {
            // Create Animal List -- Animal Array List
          if(this.props.animals.animals.length > 0){
            this.animalArr = this.props.animals.animals.map( (item, i) => {
            return(
                
            <ListItem key={i} onPress={() => this.setState({isVisable: true, currentAnimal: item})} style={{flex:1}} >
              <Thumbnail size={100} source={{ uri: item.PhotoURL }} />
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
             })
          }
        return(
        
        <Container>
        
          <Header style={{height: 77, backgroundColor:'lawngreen'}}>
            <Left style={{marginTop: 7}}>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
              </Button>
            </Left>
            <Body style={{marginTop: 7}}>
            <Title>Home</Title>
            </Body>
            <Right style={{marginTop: 7}}>
            <Button transparent onPress={() => this.props.navigation.navigate('SearchScreen')}>
                <Icon name="search" />
            </Button>
            <Button transparent onPress={() => { this.props.navigation.navigate('MapScreen')} }>
                <Image
                     style={{width: 32, height: 32}} 
                    source={require('../../assets/images/map.png')}
                />
            </Button>
            </Right>   
          </Header>
          <Content>
          <List>
          {this.animalArr}
          </List>    
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
          )
    }
        return(
            <Loading />
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
    animals: state.animals,
    auth: state.auth
})


export default connect(mapStateToProps, { getAnimals, logoutUser })(HomePage);
