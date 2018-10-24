import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export class MyLoading extends Component {
  render() {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <Text>Loding...</Text>
         </View>   
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MyLoading
