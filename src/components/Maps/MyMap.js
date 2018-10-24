import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Button, Icon, Title } from 'native-base';
import { MapView } from 'expo';

import Loading from '../LoadingScreen/MyLoading';

export class MyMap extends Component {

static navigationOptions = {
    header: null
};


constructor(props){
    super(props);
    this.state= {
        latitude: null,
        longitude: null,
        error: null,
    }
    this.map = null;
}

componentWillMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
        });
        },
        (error) => this.setState({ error: error.message }),
    );

}

  render() {
    const {Marker} = MapView
    if(this.state.latitude !== null && this.state.longitude !== null){
        return(
         <Container>   
         <Header style={{height: 77, backgroundColor:'lawngreen'}}>
           <Left style={{marginTop: 7}}>
            <Button transparent onPress={()=> this.props.navigation.navigate('Home')  }>
             <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{marginTop: 7}}>
              <Title>Go Back</Title>
          </Body>
            <Right style={{marginTop: 7}}>
            </Right>    
        </Header>   
        <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: parseFloat(this.state.latitude) ,
          longitude: parseFloat(this.state.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

        <Marker
            key={1}
            title={"My Marker"}
            description={'Nice view of the lilypads in this secluded spot, but a pretty tough road to reach it.'}
            coordinate={{
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude)
                }}
        />

        </MapView>
        </Container>
        );
    }
    return (
       <Loading />
    );
  }
}

export default MyMap
