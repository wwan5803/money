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
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native'

import RNDeviceToken from 'react-native-device-token'

// Network
import Net from '../../utilities/net'

//-- API
import API from '../../api/api'

// Layout constant
import Constant from '../../constant'

//-- Login Class
export default class Login extends Component {
    constructor(props) {
       super(props)
       this.state = {
         email: '',
         password: '',
         isLoading: false
       }
    }

    // LifeCycle
    componentWillMount() {
      AsyncStorage.getItem('user', (error, result) => {
        if (result !== null) {
          this.props.navigation.navigate('LoggedIn')
        }
      })
    }

    async onBtnSubmit() {
      if ( !Net.isConnected() ) {
        Alert.alert('No internet connection', 'Please check your internet conncetion.')
        return
      }

      let userInfo = {
        email: this.state.email,
        password: this.state.password,
        token: RNDeviceToken
      }

      if (userInfo.email == '' || userInfo.password == '') {
        Alert.alert('Warning', 'Please fill all information')
        return
      }

      this.setState({ isLoading:true })

      try {
        let response = await API.login(userInfo)
        let responseData = await response.json()
        if (responseData.success == 'true') {
          let userData = JSON.stringify(responseData.data[0])
          await AsyncStorage.setItem('user', userData)
          this.setState({ isLoading:false })
          Alert.alert('Login', 'You logged in successfully!')
          this.props.navigation.navigate('LoggedIn')
        }
        else {
          Alert.alert('Login failed', responseData.msg)
          this.setState({ isLoading:false })
        }
      }
      catch(error) {
        Alert.alert('Error', error)
        this.setState({ isLoading:false })
      }
    }

    render() {
        let imgButton = require('../../asset/button-login.png')
        let imgLogo = require('../../asset/logo-white.png')

        return(
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <View style={styles.container}>
                    <View style={{ flex:3, alignItems:'center' }}>
                        <View style={{ width:189, height:'100%' }}>
                            <View style={{ flex:1, paddingVertical:20, alignItems:'center', justifyContent:'flex-end' }}>
                                <Image style={{ width:92, height:59, marginBottom:30 }} source={ imgLogo } />
                                <TextInput
                                  style={ styles.input }
                                  keyboardType='email-address'
                                  underlineColorAndroid={ 'transparent' }
                                  autoCorrect={false}
                                  placeholder={ 'Email' }
                                  returnKeyType='next'
                                  onChangeText={ (text) => this.setState({email: text}) }
                                  onSubmitEditing={ () => {this.refs.password.focus()} } />
                                <TextInput
                                  ref='password'
                                  style={ styles.input }
                                  keyboardType='email-address'
                                  underlineColorAndroid={ 'transparent' }
                                  placeholder={ 'Password' }
                                  secureTextEntry={ true }
                                  returnKeyType='done'
                                  onChangeText={ (text) => this.setState({ password: text }) } />
                                <TouchableOpacity
                                  activeOpacity={ 0.8 }
                                  onPress={ () => {} }>
                                    <Text style={{ color:'white', fontSize:10, fontFamily:Constant.font.roman}}>Forgot password</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                              style={{ width:189, height:27, marginBottom:10 }}
                              activeOpacity={ 0.8 }
                              onPress={ () => {this.onBtnSubmit()} }
                            >
                                <Image style={{ width:'100%', height:'100%', resizeMode:'stretch' }} source={ imgButton }>
                                    <View style={ styles.wrapper}>
                                        <Text style={{ color:'white', fontSize:10, fontFamily:Constant.font.roman, backgroundColor:'transparent' }}>Sign in</Text>
                                        {
                                            this.state.isLoading &&
                                                <ActivityIndicator
                                                  animating={ true }
                                                  size='small' />
                                        }
                                    </View>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                          style={{ width:189, height:27, marginBottom:10 }}
                          onPress={ () => {} }
                        >
                            <Image style={{ width:'100%', height:'100%', resizeMode:'stretch' }} source={ imgButton }>
                                <View style={ styles.wrapper}>
                                    <Text style={{ color:'white', fontSize:10, fontFamily:Constant.font.roman, backgroundColor:'transparent' }}>Sign in with ACY Account</Text>
                                </View>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ width:189, height:27 }}
                          activeOpacity={ 0.8 }
                          onPress={ () => {this.props.navigation.navigate('SignUp')} }
                        >
                            <Image style={{ width:'100%', height:'100%', resizeMode:'stretch' }} source={ imgButton }>
                                <View style={ styles.wrapper}>
                                    <Text style={{ color:'white', fontSize:10, fontFamily:Constant.font.roman, backgroundColor:'transparent' }}>New for Signup</Text>
                                </View>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

// StyleSheet
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.background,
    marginTop: Platform.OS == 'ios' ? 20 : 0
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width:'100%',
    height:33,
    marginVertical:5,
    borderWidth:1,
    borderColor:'gainsboro',
    borderRadius:3,
    backgroundColor:'white',
    fontSize:10,
    fontFamily:Constant.font.roman,
    paddingHorizontal:10
  }
})
