'use strict'

// React
import React, { Component } from 'react'

// React Native
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

// Layout constant
import Constant from '../../constant'

export default class AboutUs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let imgLogo = require('../../asset/logo.png')
    let iconBack = require('../../asset/ico-back.png')

    return(
      <View style={styles.container}>
        <View style={ styles.titleBar }>
          <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
            <TouchableOpacity
              style={{ width:40, height:40 }}
              activeOpacity={ 0.8 }
              onPress={ () => {this.props.navigation.goBack()} }
            >
              <View style={ styles.wrapper }>
                <Image style={ styles.back } source={ iconBack } />
              </View>
            </TouchableOpacity>
            <Text style={{ flex:1, color:'white', fontSize:15, fontFamily:Constant.font.roman, textAlign:'center' }}>
              About Us
            </Text>
            <TouchableOpacity style={{ width:40, height:40 }} />
          </View>
        </View>

        <View style={ styles.wrapper }>
          <Image source={ imgLogo } style={{ width:92, height:59 }} resizeMode='stretch' />
        </View>
        <View style={{ flex:2, alignItems:'center', padding:20 }}>
          <Text style={ styles.text }>{ description }</Text>
        </View>
      </View>
    )
  }
}

//-- StyleSheet
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000715',
    marginTop: Platform.OS == 'ios' ? 20 : 0
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleBar: {
    width: '100%',
    height: 40,
    paddingHorizontal:10,
    backgroundColor: 'transparent'
  },
  text: {
    color:'white',
    fontFamily:Constant.font.roman,
    fontSize:13
  },
  back: {
    width: 17,
    height: 17
  }
})

let description = 'Money Theory 会持续为广大读者提供含金量更多的文章，让我们的行动为您披云雾，睹青天，让我们的专长成就您财务自由的梦想。'
