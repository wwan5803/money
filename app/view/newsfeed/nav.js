'use strict'

// React
import React from 'react'

// React Native
import { StyleSheet, Image } from 'react-native'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NewsfeedNavigator } from './nav-config'

// Redux
import { connect } from 'react-redux'

// Navigation props
const mapStateToProps = (state) => {
  return {
    navigationState: state.newsfeed
  }
}

let activeIcon = require('../../asset/ico-active-newsfeed.png')
let deactiveIcon = require('../../asset/ico-deactive-newsfeed.png')

//
class NewsfeedNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Newsfeed',
    tabBarIcon: ({ tintColor }) =>
      <Image source={ tintColor=='white' ? activeIcon : deactiveIcon } style={ styles.icon } />
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NewsfeedNavigator
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
export default connect(mapStateToProps)(NewsfeedNavigation)

let styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 22
  }
})
