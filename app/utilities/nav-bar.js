'use strict'

//-- React
import React, { Component } from 'react'

//-- React Native
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'

//-- Constant
import Constant from '../constant'

//-- Navigation Bar
export default class NavigationBar extends Component {
    render() {
        let iconBack = require('../asset/ico-back.png')

        return(
            <View style={ styles.container }>
                <View style={ styles.wrapper }>
                    <TouchableOpacity
                      style={ styles.item }
                      activeOpacity={ 0.8 }
                      onPress={ this.props.onBack }
                    >
                        <View style={ styles.wrapper }>
                            <Image style={ styles.back } source={ iconBack } />
                        </View>
                    </TouchableOpacity>
                    <Text style={ styles.title }>{ this.props.title }</Text>
                    <TouchableOpacity style={{ width:40, height:40 }} />
                </View>
            </View>
        )
    }
}

//-- Styles
let styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        paddingHorizontal:10,
        backgroundColor: 'transparent'
    },
    wrapper: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        flex:1,
        color:'white',
        fontSize:15,
        fontFamily:Constant.font.roman,
        textAlign:'center',
        marginTop: 3
    },
    back: {
        width:17,
        height:17
    }
})
