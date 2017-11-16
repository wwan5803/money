'use strict'

// React
import React from 'react'

// React Native
import { StyleSheet, Image } from 'react-native'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { LoginNavigator } from './nav-config'

// Redux
import { connect } from 'react-redux'

// Navigation props
const mapStateToProps = (state) => {
  return {
    navigationState: state.login
  }
}

let activeIcon = require('../../asset/ico-active-login.png')
let deactiveIcon = require('../../asset/ico-deactive-login.png')

//
class UserNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({ tintColor }) =>
      <Image source={ tintColor=='white' ? activeIcon : deactiveIcon } style={ styles.icon } />
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <LoginNavigator
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
export default connect(mapStateToProps)(UserNavigation)

let styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 25
  }
})
