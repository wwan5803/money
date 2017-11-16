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
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'

//-- API
import API from '../../api/api'

//-- Layout constant
import Constant from '../../constant'

//-- SignUp Component
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: '',
          fullname: '',
          email: '',
          password: '',
          flex: 2,
          isLoading: false
        }
    }

    async onBtnSubmit() {
        let userInfo = {
            username: this.state.username,
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
        }

        if (userInfo.username == '' || userInfo.fullname == '' || userInfo.email == '' || userInfo.password == '') {
            Alert.alert('Warning', 'Please fill all information')
            return
        }

        this.setState({ isLoading:true })

        try {
            let response = await API.signup(userInfo)
            let responseData = await response.json()
            if (responseData.success == 'true') {
              Alert.alert('Sign up', 'User registered successfully!')
              await AsyncStorage.setItem('user', JSON.stringify(responseData.data[0]))
              this.setState({ isLoading:false })
              this.props.navigation.navigate('LoggedIn')
            }
            else {
              Alert.alert('SignUp failed', responseData.msg)
              this.setState({ isLoading:false })
            }
        }
        catch(error) {
          Alert.alert('Warning', error)
          this.setState({ isLoading:false })
        }
    }

    _endEditing() {
        Keyboard.dismiss()
        this.setState({ flex:2 })
    }

    render() {
        let imgButton = require('../../asset/button-login.png')
        let imgLogo = require('../../asset/logo-white.png')
        let iconBack = require('../../asset/ico-back.png')
        console.log(this.state.fullname)

        return(
            <TouchableWithoutFeedback onPress={ () => {this._endEditing()} }>
                <View style={styles.container}>
                    <View style={{ flex:1, alignItems:'center' }}>
                        <View style={ styles.titleBar }>
                            <TouchableOpacity
                              style={{ width:40, height:40 }}
                              activeOpacity={ 0.8 }
                              onPress={ () => {this.props.navigation.goBack()} }
                            >
                                <View style={ styles.wrapper }>
                                    <Image style={ styles.back } source={ iconBack } />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width:189, height:'100%' }}>
                            <View style={ styles.wrapper }>
                                <Image style={{ width:92, height:59 }} source={ imgLogo } />
                            </View>
                            <View style={{ flex:this.state.flex }}>
                                <TextInput
                                  style={ styles.input }
                                  underlineColorAndroid={ 'transparent' }
                                  autoCorrect={ false }
                                  placeholder={ 'User Name' }
                                  returnKeyType='next'
                                  onFocus={ () => this.setState({ flex: 4}) }
                                  onChangeText={ (text) => this.setState({username: text}) }
                                  onSubmitEditing={ () => {this.refs.fullName.focus()} } />
                                <TextInput
                                  ref='fullName'
                                  style={ styles.input }
                                  underlineColorAndroid={ 'transparent' }
                                  autoCorrect={false}
                                  placeholder={ 'Full Name' }
                                  returnKeyType='next'
                                  onFocus={ () => this.setState({ flex: 4}) }
                                  onChangeText={ (text) => this.setState({fullname: text}) }
                                  onSubmitEditing={ () => {this.refs.email.focus()} } />
                                <TextInput
                                  ref='email'
                                  style={ styles.input }
                                  keyboardType='email-address'
                                  underlineColorAndroid={ 'transparent' }
                                  autoCorrect={false}
                                  placeholder={ 'Email' }
                                  returnKeyType='next'
                                  onFocus={ () => this.setState({ flex: 4}) }
                                  onChangeText={ (text) => this.setState({email: text}) }
                                  onSubmitEditing={ () => {this.refs.password.focus()} } />
                                <TextInput
                                  ref='password'
                                  style={ styles.input }
                                  placeholder={ 'Password' }
                                  secureTextEntry={ true }
                                  underlineColorAndroid={ 'transparent' }
                                  returnKeyType='done'
                                  onFocus={ () => this.setState({ flex: 4}) }
                                  onChangeText={ (text) => this.setState({password: text}) }
                                  onSubmitEditing={ () => this.setState({ flex: 2}) } />
                                <TouchableOpacity
                                  style={{ width:189, height:27, marginVertical:20 }}
                                  activeOpacity={ 0.8 }
                                  onPress={ () => {this.onBtnSubmit()} }
                                >
                                    <Image style={{ width:'100%', height:'100%', resizeMode:'stretch' }} source={ imgButton }>
                                        <View style={ styles.wrapper}>
                                            <Text style={{ color:'white', fontSize:10, fontFamily:Constant.font.roman, backgroundColor:'transparent' }}>Create Account</Text>
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
    titleBar: {
      width: '100%',
      height: 40,
      paddingHorizontal:10,
      backgroundColor: 'transparent'
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
    },
    back: {
      width: 17,
      height: 17
    }
})
