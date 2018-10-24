
//  Libreries Import
import React, {Component} from 'react';
import { 
    View, StyleSheet, Picker, TextInput, Modal, Image
} from 'react-native';
import axios from 'axios';
import { Container, Header, Text, Left, Body, Right, Button, Icon, Title, Content, Form,Input, Item, Textarea } from 'native-base';

import { createAnimal } from '../../actions/animalAction';
import { logoutUser } from '../../actions/authAction';
import { connect } from 'react-redux';

import { ImagePicker, ImageManipulator } from 'expo';


// Component Import
import Camera from '../Camera/MyCamera';
import SearchPlace from '../Maps/SearchPlace';

class AddPet extends Component {
constructor(props){
    super(props);
    this.state = {
        name: '',
        type: 'Dog',
        breed:'',
        color:'',
        age:'',
        sex:'',
        age: '',
        size: '',
        aboutMe:'',
        location: '',
        uri: 'https://sdl-stickershop.line.naver.jp/products/0/0/1/1340260/android/stickers/13634549.png;compress=true',
        base64: '',
        modalVisible: false,
        breedPickerView:[]
    }
}

componentDidMount(){
    axios.post('http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx/GetAnimalBreed',{
        type: this.state.type
    }).then(res =>{ 
        this.setState({breedPickerView: JSON.parse(res.data.d)});
    }).catch(err => console.log(err));
        console.log(this.state.aboutMe)
}

// Modal visability handler
    modalVisableHandler = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

// Set Photo
setPhotoURL = (uri, base64) => {
    this.setState({ uri: uri, base64: base64 });
}

// Set Location
setLocation = (location) => {
    this.setState({location: location})
}

// Handle breed change
onBreedChangeHandler = type => {
    axios.post('http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx/GetAnimalBreed',{
        type: type
    }).then(res =>{ 
        this.setState({breedPickerView: JSON.parse(res.data.d)});
    }).catch(err => console.log(err));
}

// Handle name change
onNameChange = text => {
    this.setState({ name: text });
}

// Handle color change
onColorChange = text => {
    this.setState({ color: text });
}

// Handle description change
onAboutMeChange = text => {
    this.setState({ aboutMe: text });
}

// Post handler
onSubmitHandler = async () => {
    const { user } = this.props.auth;
    const data = {
        email: user.email,
        name: this.state.name,
        type: this.state.type,
        breed: this.state.breed,
        color: this.state.color,
        sex: this.state.sex,
        age: this.state.age,
        size: this.state.size,
        aboutMe: this.state.aboutMe,
        photoURL: this.state.base64,
        location: this.state.location
    }
   await this.props.createAnimal(data);
}

// Image picker handler
pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    let resizeRes  = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 700, height: 700 } }],
      { compress: 0, format: "png", base64: true }
    );

    this.setState({uri: resizeRes.uri, base64: resizeRes.base64})
  };


  
    render() {
    //    Breed Picker Array 
    const breedArr = this.state.breedPickerView.map(item =>
     <Picker.Item key={item.ID} label={item.Name} value={item.Name} /> 
    )
        return (
            <Container style={{flex:1, justifyContent:'flex-start', backgroundColor: '#eee'}}>
                <Header style={{height: 77, backgroundColor:'lawngreen'}}>
                    <Left style={{marginTop: 7}}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                            </Button>
                    </Left>
                    <Body style={{marginTop: 7}}>
                        <Title>Add Pet</Title>
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


            <Content contentContainerStyle={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Form>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
             {/* Name Field */}
            <TextInput 
                         placeholderTextColor="#000"
                         underlineColorAndroid='transparent'
                         onChangeText={this.onNameChange}
                        style={{width:'98%', paddingLeft:7, backgroundColor:'#fff', borderColor:'#ccc',borderWidth: 3, marginBottom:3, height:40, marginTop:5, paddingVertical: 10}}
                         placeholder="Pet's Name"
                        /> 
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <SearchPlace setLocation={this.setLocation} />    
            </View>   
            {/* About Me Field */}
            <View style={styles.textareaWrapper}>
                <Textarea rowSpan={3} placeholder="Pet Description" 
                onChangeText={this.onAboutMeChange}
                />
            </View>   
                    
            <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop: 5}}>
                       
                        {/* Type Picker */}
                        <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={this.state.type}
                            onValueChange={ (type) =>{ 
                                this.setState({type: type}, console.log(this.state.type),
                                this.onBreedChangeHandler(type)
                                );
                                
                            }}
                        >
                        <Picker.Item label="Dog" value="Dog" /> 
                        <Picker.Item label="Cat" value="Cat" />
                        </Picker>
                        </View>

                        <View style={styles.pickerWrapper}>
                        {/* Breed Picker  */}
                        <Picker 
                            selectedValue={this.state.breed}
                            onValueChange={(breed) => this.setState({breed: breed})}>
                        
                        <Picker.Item label="Breed" value="" />
                        {breedArr}
                    </Picker>
                    </View>

                </View>
                    
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 5}}>
                        
                        {/* Sex Picker */}
                        <View style={styles.pickerWrapper}>
                         <Picker
                            selectedValue={this.state.sex}
                            onValueChange={(sex) => this.setState({sex: sex})}
                        >
                        <Picker.Item label="Sex" value="" />
                        <Picker.Item label="Male" value="Male" /> 
                        <Picker.Item label="Female" value="Female" />
                        </Picker>
                        </View>

                    {/* Color Field */}
                    <View style={styles.pickerWrapper}>
                    <Picker
                            selectedValue={this.state.color}
                            onValueChange={(color) => this.setState({color: color})}
                        >
                        <Picker.Item label="Color" value="" />
                        <Picker.Item label="Black" value="Balck" />
                        <Picker.Item label="White" value="White" />
                        <Picker.Item label="Ginger" value="Ginger" />
                        <Picker.Item label="Gray" value="Gray" />
                        <Picker.Item label="Black and White" value="Black and White" />
                        <Picker.Item label="Other" value="Other" />
                        </Picker> 
                    </View>

                </View>
                    
                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 5}}>
                        {/* Age Picker */}
                    <View style={styles.pickerWrapper}>
                    <Picker 
                            selectedValue={this.state.age}
                            onValueChange={(age) => this.setState({age: age})}
                        >
                        <Picker.Item label="Age" value="" />
                        <Picker.Item label="Baby" value="Baby" />
                        <Picker.Item label="Young" value="Young" />
                        <Picker.Item label="Adult" value="Adult" />
                        <Picker.Item label="Senior" value="Senior" />
                        </Picker>
                    </View>

                        {/* Size Picker */}
                        <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={this.state.size}
                            onValueChange={(size) => this.setState({size: size})}
                        >
                        <Picker.Item label="Size" value="" />
                        <Picker.Item label="Small" value="Small" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="Large" value="Large" />
                        
                        </Picker>
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                    {/* Camera Button */}
                    <Button 
                    rounded  primary
                    style={{paddingHorizontal:10, backgroundColor:'#00B200'}} 
                    onPress ={() => this.setState({ modalVisible: true})}
                    >
                    <Text><Icon name="camera" style={{color:'white'}}/> Take Picture</Text>
                   </Button>

                   {/* Media Button */}
                   <Button 
                    rounded  primary
                    onPress={this.pickImage}
                    style={{paddingHorizontal:10, backgroundColor:'#00B200'}} 
                    >
                    <Text><Icon name="paper" style={{color:'white'}}/> From Gallery</Text>
                   </Button>

                </View>

            </Form>
        <Image
          style={{width: 66, height: 58}}
          source={{uri: this.state.uri}}
        />
        <View style={{flex:1,justifyContent:'center'}}>
            {/* Submit Button */}
            <Button
            rounded primary
            style={{paddingHorizontal:10, backgroundColor:'#00B200'}}
            onPress={this.onSubmitHandler }
            >
            <Text>POST</Text>
            </Button>
        </View>
        
</Content>

{/* Camera Modal */}
    <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={ this.modalVisableHandler }
    >
        <Camera setPhotoURL={this.setPhotoURL} modalVisableHandler={this.mo} />
                
    </Modal>  

</Container>

        )
    }
}
// style={{borderColor:'#ccc',borderWidth:3, marginBottom:3, backgroundColor:'#fff',marginTop:5,width:'90%', marginLeft:}}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerWrapper: {
        width: 180,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth:3
    }, 
    textareaWrapper: {
        borderColor:'#ccc',
        borderWidth:3,
        marginBottom:3,
        backgroundColor:'#fff',
        marginTop:5,
    }
})


const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, {createAnimal, logoutUser} )(AddPet);