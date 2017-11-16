'use strict'

// React
import React from 'react'

// React Native
import { StyleSheet, Image } from 'react-native'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { VideoNavigator } from './nav-config'

// Redux
import { connect } from 'react-redux'

// Navigation props
const mapStateToProps = (state) => {
  return {
    navigationState: state.video
  }
}

let activeIcon = require('../../asset/ico-active-video.png')
let deactiveIcon = require('../../asset/ico-deactive-video.png')

//
class VideoNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Video',
    tabBarIcon: ({ tintColor }) =>
      <Image source={ tintColor=='white' ? activeIcon : deactiveIcon } style={ styles.icon } />
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <VideoNavigator
        navigation = {
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(VideoNavigation)

let styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 21
  }
})
