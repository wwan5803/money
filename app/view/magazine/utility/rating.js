'use strict'

//-- React
import React, { Component } from 'react'

//-- React Native
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'

//-- Constant
import Constant from '../../../constant'

//-- Resources
let iconStarActive    = require('../../../asset/ico-star-active.png')
let iconStarInactive  = require('../../../asset/ico-star-inactive.png')
let imgButton         = require('../../../asset/button-small.png')

//-- Rating Class
export default class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rate: 0,
            rateStarImages: undefined,
        }
    }

    // LifeCycle
    componentWillMount() {
        this._replaceStars(0)
    }
    // Actions
    onBtnSubmit() {
        this.props.onBtnSubmit(this.state.rate)
    }

    // Replace star images
    _replaceStars(rate) {
        var array = []

        for (let i = 0; i < 10; i++) {
            if (i < rate) {
                array.push(
                    <TouchableOpacity
                      key={ i }
                      activeOpacity={ 0.8 }
                      onPress={ () => {this._replaceStars(i + 1)} }>
                        <View >
                            <Image style={{ width:13, height:13, marginRight:2 }} source={ iconStarActive } />
                        </View>
                    </TouchableOpacity>
                )
            }
            else {
                array.push(
                    <TouchableOpacity
                      key={ i }
                      activeOpacity={ 0.8 }
                      onPress={ () => {this._replaceStars(i + 1)} }>
                        <View >
                            <Image style={{ width:13, height:13, marginRight:2 }} source={ iconStarInactive } />
                        </View>
                    </TouchableOpacity>
                )
            }
        }

        this.setState({
            rate: rate,
            rateStarImages: array
        })
    }

    // Rendering
    render() {
        return(
            <View style={ styles.container }>
                <Text style={ styles.title }>Star rate:</Text>
                <View style={{ flex:1, flexDirection:'row', alignItems:'center', paddingVertical:10 }}>
                    { this.state.rateStarImages }
                    <Text style={ styles.rate }>{ this.state.rate == 0 ? '0.0' : this.state.rate + '.0'}</Text>
                </View>
                <TextInput
                  style={ styles.comment }
                  multiline={ true }
                  underlineColorAndroid={ 'transparent' }
                  onChangeText={ (text) => this.props.onChangeComment(text) } />
                <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between' }}>
                    <TouchableOpacity
                      style={{ width:104, height:23 }}
                      activeOpacity={ 0.8 }
                      onPress={ () => {this.onBtnSubmit()} }
                    >
                        <Image style={{ width:'100%', height:'100%', resizeMode:'stretch' }} source={ imgButton }>
                            <View style={ [styles.wrapper, {paddingTop:3}] }>
                                <Text style={{ color:'white', fontFamily:Constant.font.book, fontSize:10, backgroundColor:'transparent' }}>Submit</Text>
                            </View>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ width:104, height:23 }}
                      activeOpacity={ 0.8 }
                      onPress={ this.props.onCancel }
                    >
                        <Image style={{ width:'100%', height:'100%', resizeMode:'stretch' }} source={ imgButton }>
                            <View style={ [styles.wrapper, {paddingTop:3}] }>
                                <Text style={{ color:'white', fontFamily:Constant.font.book, fontSize:10, backgroundColor:'transparent' }}>Cancel</Text>
                            </View>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

//-- Styles
let styles = StyleSheet.create({
    container: {
      width: Constant.layout.screenWidth - 40,
      height: 220,
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: Constant.color.background,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4
    },
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      color: 'white',
      fontFamily: Constant.font.black,
      fontSize: 10
    },
    rate: {
      color:'#ddbb1f',
      fontSize: 15,
      marginHorizontal: 10
    },
    comment: {
      width: '100%',
      height: 100,
      padding: 10,
      marginBottom: 10,
      fontFamily: Constant.font.roman,
      backgroundColor: 'white'
    }
})
