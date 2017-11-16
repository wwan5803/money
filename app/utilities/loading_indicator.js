
'use strict'

//-- React, Component
import React, { Component } from 'react'

//-- React Native
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'

//-- Constant
import Constant from '../constant'

//-- LoadingIndicator Component
export default class LoadingIndicator extends Component {
    render() {
        return(
            <View style={ [styles.container, {top:this.props.top}] }>
                <View style={ styles.wrapper }>
                    <ActivityIndicator
                      animating={ this.props.animating }
                      size={ this.props.size } />
                </View>
            </View>
        )
    }
}

//-- Styles
let styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: Constant.layout.screenWidth,
      height: Constant.layout.screenHeight,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
})
