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
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AsyncStorage,
  ActivityIndicator,
  Keyboard,
  Alert
} from 'react-native'

//-- API
import API from '../../api/api'

//-- Constant
import Constant from '../../constant'

//-- Feedback Component
export default class Feedback extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        feedback: '',
        flex: 2,
        subject: '',
        isLoading: false,
        isSelected:true,
      }
    }

    // Actions
    async onBtnSubmit() {
      const user = await AsyncStorage.getItem('user')
      if (user == null) {
        Alert.alert('Warning', 'You can submit feedback after logging in.')
        return
      }

      let userData = JSON.parse(user)
      let data = {
        userId: userData.user_id,
        email: this.state.email,
        title: this.state.subject,
        feedback: this.state.feedback,
      }

      if (data.email == '' || data.feedback == '' || data.subject == '') {
        Alert.alert('Warning', 'Please fill all information')
        return
      }

      this.setState({ isLoading:true })

      try {
          console.log('??????', data)
        let response = await API.submitFeedback(data)
          console.log('!!!!!!!!', response)
        let responseData = await response.json()
        if (responseData.success == true) {
          Alert.alert('Thank you', 'Your feedback was submitted successfully!')
          this.setState({ isLoading:false })
          this.props.navigation.goBack()
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
        let imgLogo = require('../../asset/logo.png')
        let iconBack = require('../../asset/ico-back.png')
        let imgButton = require('../../asset/button1.png')
        let iconDropdown = require('../../asset/ico-dropdown.png')

        let titles = ['投稿', '商务合作', '论金', '视频', '新闻', '技术问题', '其他']

        return(
            <TouchableWithoutFeedback onPress={ () => {this._endEditing()} }>
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
                              Feedback
                            </Text>
                            <TouchableOpacity style={{ width:40, height:40 }} />
                        </View>
                    </View>

                    <View style={ styles.wrapper }>
                        <Image source={ imgLogo } style={{ width:92, height:59 }} resizeMode='stretch' />
                    </View>

                    <View style={ [styles.content, {flex:this.state.flex}] }>
                        <ScrollView style={{ flex:1 }}>
                            <Text style={ styles.text }>Email:</Text>
                            <TextInput
                              style={ [styles.input, {height:33}] }
                              keyboardType='email-address'
                              underlineColorAndroid={ 'transparent' }
                              autoCorrect={false}
                              returnKeyType='next'
                              onChangeText={ (text) => this.setState({email: text}) }
                              onSubmitEditing={ () => {this.refs.feedback.focus()} } />
                            <TouchableHighlight
                              style={ styles.picker }
                              underlayColor='transparent'
                              onPress={ () => {this.setState({isSelected:false})} } >
                                <View style={ [styles.wrapper, {flexDirection:'row'}] }>
                                    <Text style={{ flex:1, fontFamily:Constant.font.roman, fontSize:13 }}>{this.state.subject}</Text>
                                    <Image style={{ width:8, height:6 }} source={ iconDropdown } />
                                </View>
                            </TouchableHighlight>
                            {
                                !this.state.isSelected && titles.map((item, index) => {
                                    return(
                                        <TouchableHighlight
                                          key={ index }
                                          style={{ width:'100%', height:33, paddingHorizontal:10, backgroundColor:'gainsboro' }}
                                          underlayColor='transparent'
                                          onPress={ () => {this.setState({isSelected:true, subject:titles[index]})} } >
                                            <View style={{ flex:1, justifyContent:'center' }}>
                                                <Text style={{ flex:1, fontFamily:Constant.font.roman, fontSize:13 }}>{titles[index]}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                })
                            }
                            <Text style={ styles.text }>Your feedback:</Text>
                            <View style={ styles.wrapper }>
                                <TextInput
                                  ref='feedback'
                                  style={ [styles.input, {height:200}] }
                                  underlineColorAndroid={ 'transparent' }
                                  returnKeyType='done'
                                  multiline={ true }
                                  onFocus={ () => this.setState({ flex: 4}) }
                                  onChangeText={ (text) => this.setState({feedback: text}) }
                                  onSubmitEditing={ () => this.setState({ flex: 2}) } />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ width:'100%', height:40, margin:20 }}>
                      <View style={{ flex:1, flexDirection:'row' }}>
                        <TouchableOpacity
                          style={ styles.button }
                          activeOpacity={ 0.8 }
                          onPress={ () => {
                              if (this.state.isLoading == false) { this.onBtnSubmit() }
                            }
                          }
                        >
                          <Image style={{ width:'100%', height:'100%', resizeMode:'stretch' }} source={ imgButton }>
                            <View style={ [styles.wrapper, {flexDirection:'row'}] }>
                              <Text style={{ color:'white', fontSize:12, fontFamily:Constant.font.roman, backgroundColor:'transparent' }}>Submit</Text>
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
            </TouchableWithoutFeedback>
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
      paddingHorizontal:20,
      backgroundColor: 'transparent'
    },
    content: {
      paddingHorizontal: 20,
    },
    input: Platform.OS == 'ios' ? {
      width: '100%',
      marginVertical:5,
      backgroundColor:'white',
      fontSize:13,
      fontFamily:Constant.font.roman,
      paddingHorizontal:10
    } : {
        textAlignVertical: 'top',
        width: '100%',
        marginVertical:5,
        backgroundColor:'white',
        fontSize:13,
        fontFamily:Constant.font.roman,
        paddingHorizontal:10
    },
    picker: {
      width: '100%',
      height:33,
      marginVertical:5,
      backgroundColor:'white',
      paddingHorizontal:10
    },
    text: {
      color: 'white',
      fontFamily: Constant.font.roman,
      fontSize: 13,
      marginTop: 10
    },
    back: {
      width: 17,
      height: 17
    },
    button: {
      width: 102,
      height: 34,
    }
})
