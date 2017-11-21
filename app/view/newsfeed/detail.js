'use strict'

//-- React
import React, { Component } from 'react'

//-- React Native
import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

//-- Gradient
import LinearGradient from 'react-native-linear-gradient'

//-- Constant
import Constant from '../../constant'

//-- Newsfeed Detail class
export default class NewsfeedDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
          news: this.props.navigation.state.params.news
        }
    }

    render() {
        let imgTitle = require('../../asset/title.png')
        let iconBack = require('../../asset/ico-back.png')
        let news = this.state.news

        return(
            <View style={ styles.container }>
                <View style={ styles.newsImage }>
                    <Image
                      style={{ width:'100%', height:'100%' }}
                      source={{ uri:news.thumbnail }}
                      resizeMode='stretch'
                    >
                        <LinearGradient
                          style={{ flex:1 }}
                          start={{ x:0.5, y:0.6 }}
                          end={{ x:0.5, y:1 }}
                          colors={['transparent', Constant.color.background]} />
                    </Image>
                </View>
                
                <ScrollView style={{ flex:1, paddingLeft: 20, paddingRight: 20, paddingBottom: 120 }}>
                    <Text style={ styles.news }>{ news.description }</Text>
                </ScrollView>
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
                          { news.title }
                        </Text>
                        <TouchableOpacity style={{ width:40, height:40 }} activeOpacity={ 0.8 } />
                    </View>
                </View>
            </View>
        )
    }
}

//-- Styles
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.background,
    marginTop: Platform.OS == 'ios' ? 20 : 0
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newsImage: {
    width: Constant.layout.screenWidth,
    height: Platform.OS == 'ios' ?
      Constant.layout.screenHeight / 2 + 40 : Constant.layout.screenHeight / 2 + 60
  },
  news: {
    fontFamily:Constant.font.roman,
    fontSize:13,
    color:'white'
  },
  titleBar: {
    position: 'absolute',
    width: '100%',
    height: 40,
    paddingHorizontal:10,
    backgroundColor: 'transparent'
  },
  back: {
    width: 17,
    height: 17
  }
})
