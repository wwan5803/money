'use strict'

// React
import React from 'react'

// React Navigation
import { StackNavigator } from 'react-navigation'

// Redux
import { connect } from 'react-redux'

// Screens
import Menu from './menu'
import AboutUs from './aboutus'
import ContactUs from './contactus'
import Notification from './notification'
import Feedback from './feedback'
import Inbox from './inbox'

// Route Option
const routeConfiguration = {
    Menu      : { screen: Menu },
    AboutUs   : {
      screen: AboutUs,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    ContactUs : {
      screen: ContactUs,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Inbox: {
      screen: Inbox,
      navigationOptions: {
        gesturesEnabled: false,
      },
    }
}

// Stack Navigator Option
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Menu'
}

// Navigator
export const MenuNavigator = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
