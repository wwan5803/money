'use strict'

// React
import React from 'react'

// React Navigation
import { StackNavigator } from 'react-navigation'

// Redux
import { connect } from 'react-redux'

// Screens
import Newsfeed from './newsfeed'
import NewsfeedDetail from './detail'

// Route Option
const routeConfiguration = {
  Newsfeed: { screen: Newsfeed },
  NewsfeedDetail: {
    screen: NewsfeedDetail,
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
}

// Stack Navigator Option
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Newsfeed'
}

// Navigator
export const NewsfeedNavigator = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
