import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'


export class SearchPlace extends Component {
    render() {
        return (
    <GooglePlacesAutocomplete
      placeholder='My Location'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        {/* console.log(data.description);
        console.log(details.formatted_address); */}
        if(details !== null){
        this.props.setLocation(details.formatted_address)
        this.props.setLocation(details.formatted_address)
        }else{
        this.props.setLocation(data.description)
        this.props.setLocation(data.description)
        }
      }}
      
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyAkZ3kcJs0qZ-WKpFdHed60Vve9PJlU3GY',
        language: 'en', // language of the results
        types: 'geocode', // default: 'geocode'
        
      }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}
      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      //predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
      //renderRightButton={() => <Text>Custom text after the input</Text>}
      />

        );
      }
}

export default SearchPlace
