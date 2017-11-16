'use strict'

// React
import React from 'react'

// React Native
import { AsyncStorage } from 'react-native'

// React Navigation
import { StackNavigator } from 'react-navigation'

// Redux
import { connect } from 'react-redux'

// Screens
import Login from './login'
import SignUp from './signup'
import LoggedIn from './loggedin'

// Route Option
const routeConfiguration = {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    LoggedIn: {
      screen: LoggedIn,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
}

// Stack Navigator Option
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Login'
}

// Navigator
export const LoginNavigator = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
