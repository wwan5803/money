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
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

//-- Constant
import Constant from '../../../constant'

//-- Comment class
export default class Comment extends Component {
    render() {
        let iconStarActive = require('../../../asset/ico-star-active.png')
        let iconStarInactive = require('../../../asset/ico-star-inactive.png')

        var array = []
        for (let i = 0; i < 10; i++) {
            if (i < this.props.rate) {
                array.push(
                    <Image key={ i } style={{ width:13, height:13, marginRight:2 }} source={ iconStarActive } />
                )
            }
            else {
                array.push(
                    <Image key={ i } style={{ width:13, height:13 }} source={ iconStarInactive } />
                )
            }
        }

        return(
            <View style={{ width:'100%', borderWidth:1, borderRadius:4, borderColor:'gray', paddingHorizontal:20, paddingVertical:10, marginBottom:10 }}>
                <Text style={{ color:'white', fontFamily:Constant.font.black, fontSize:10 }}>{ this.props.name }</Text>
                <View style={{ flex:1, flexDirection:'row', alignItems:'center', paddingVertical:10 }}>
                    { array }
                    <Text style={{ color:'#ddbb1f', fontSize:15, marginHorizontal:10 }}>{`${this.props.rate}.0`}</Text>
                </View>
                <Text style={{ color:'white', fontFamily:Constant.font.roman, fontSize:10 }}>{ this.props.comment }</Text>
                <TouchableOpacity
                  activeOpacity={ 0.8 }
                  style={{ marginTop:10 }}
                  onPress={ () => {this.props.onReply} }>
                    <Text style={{ color:'white', fontSize:10 }}>Reply</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
