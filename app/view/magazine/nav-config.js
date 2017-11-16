'use strict'

// React
import React from 'react'

// React Navigation
import { StackNavigator } from 'react-navigation'

// Redux
import { connect } from 'react-redux'

// Screens
import Magazine from './magazine'
import MagazineProfile from './profile'
import MagazineViewer from './viewer'

// Route Option
const routeConfiguration = {
  Magazine: { screen: Magazine },
  MagazineProfile: {
    screen: MagazineProfile,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  MagazineViewer: {
    screen: MagazineViewer,
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
}

// Stack Navigator Option
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Magazine'
}

// Navigator
export const MagazineNavigator = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
