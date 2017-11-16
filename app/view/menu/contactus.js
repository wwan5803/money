'use strict'

//-- React
import React, { Component } from 'react'

//-- React Native
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

//-- Navigation Bar
import NavigationBar from '../../utilities/nav-bar'

//-- Constant
import Constant from '../../constant'

//-- AboutUs Class
export default class AboutUs extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let imgLogo = require('../../asset/logo.png')

        return(
            <View style={styles.container}>
                <NavigationBar
                    title={ 'Contact Us' }
                    onBack={ () => this.props.navigation.goBack() } />

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
})

let description = 'MONEY THEORY 论金\n出版 Publisher\nACY Capital Pty Ltd\n804 / 12 Help St Chatswood Sydney\nNSW Australia 2067\n澳洲联系电话： 1300 729 171\n中国联系电话：950 4059 5638\n其他国家: +61 2 9188 2999\n投稿邮箱：magazine@acyfx.com'
