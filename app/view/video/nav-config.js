'use strict'

// React
import React from 'react'

// React Navigation
import { StackNavigator } from 'react-navigation'

// Redux
import { connect } from 'react-redux'

// Screens
import Video from './video'
import VideoProfile from './profile'
import VideoViewer from './viewer'

// Route Option
const routeConfiguration = {
  Video: { screen: Video },
  VideoProfile: {
    screen: VideoProfile,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  VideoViewer: {
    screen: VideoViewer,
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
}

// Stack Navigator Option
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Video'
}

// Navigator
export const VideoNavigator = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
