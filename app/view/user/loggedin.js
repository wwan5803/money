
'use strict'

//-- React, Component
import React, { Component } from 'react'

//-- React Native
import {
  StyleSheet,
  Platform,
  View,
  Text,
  AsyncStorage
} from 'react-native'

//-- Constant
import Constant from '../../constant'

//-- LoggedIn Component
export default class LoggedIn extends Component {
  // LifeCycle
  componentWillMount() {
    AsyncStorage.getItem('user', (error, result) => {
      if (result == null) {
        this.props.navigation.goBack()
      }
    })
  }

  render() {
    return(
      <View style={ styles.container }>
        <Text style={{ color:'white' }}>You already logged in.</Text>
      </View>
    )
  }
}

//-- Styles
let styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Constant.color.placeholder,
      marginTop: Platform.OS == 'ios' ? 20 : 0
    }
})
