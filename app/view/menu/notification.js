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
  AsyncStorage,
  Switch
} from 'react-native'

//-- Navigation Bar
import NavigationBar from '../../utilities/nav-bar'

//-- Constant
import Constant from '../../constant'

//-- Notification Setting Class
export default class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: [false, false, false]
        }
    }

    // LifeCycle
    componentWillMount() {
        AsyncStorage.getItem('setting', (err, result) => {
            if (result !== null) {
                this.setState({ status:JSON.parse(result) })
            }
        })
    }

    // Actions
    onSwitch(index) {
        let status = this.state.status
        status[index] = status[index] == true ? false : true
        this.setState({ status:status })
        AsyncStorage.setItem('setting', JSON.stringify(status), (err, result) => {

        })
    }

    // Render
    render() {
        let imgLogo = require('../../asset/logo.png')

        return(
            <View style={styles.container}>
                <NavigationBar onBack={ () => this.props.navigation.goBack() } />

                <View style={ styles.wrapper }>
                    <Image source={ imgLogo } style={{ width:92, height:59 }} resizeMode='stretch' />
                </View>
                <View style={{ flex:2, padding:20 }}>
                    <View style={ styles.item }>
                        <View style={ styles.itemContent }>
                            <Text style={ styles.text }>Notification Magazine</Text>
                            <Switch
                              value={ this.state.status[0] }
                              onTintColor={ Constant.color.onOff }
                              onValueChange={ () => {this.onSwitch(0)} } />
                        </View>
                    </View>
                    <View style={ styles.item }>
                        <View style={ styles.itemContent }>
                            <Text style={ styles.text }>Notification Video</Text>
                            <Switch
                              value={ this.state.status[1] }
                              onTintColor={ Constant.color.onOff }
                              onValueChange={ () => {this.onSwitch(1)} } />
                        </View>
                    </View>
                    <View style={ styles.item }>
                        <View style={ styles.itemContent }>
                            <Text style={ styles.text }>Notification Newsfeed</Text>
                            <Switch
                              value={ this.state.status[2] }
                              onTintColor={ Constant.color.onOff }
                              onValueChange={ () => {this.onSwitch(2)} } />
                        </View>
                    </View>
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
    item: {
        width: '100%',
        height: 40
    },
    itemContent: {
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    text: {
        flex:1,
        color:'white',
        fontFamily:Constant.font.roman,
        fontSize:13
    }
})
