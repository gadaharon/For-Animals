import React, { Component } from 'react';
import { View, Text } from 'react-native';

export function alertMessage(text, alertType){
    return(
        <View>
            <Text style={{color: alertType}}>{alertMessage}</Text>
        </View>    
    )
}

