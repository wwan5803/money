'use strict'

// React
import React from 'react'

// React Native
import { StyleSheet, Image } from 'react-native'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { MenuNavigator } from './nav-config'

// Redux
import { connect } from 'react-redux'

// Navigation props
const mapStateToProps = (state) => {
  return {
    navigationState: state.menu
  }
}

let activeIcon = require('../../asset/ico-deactive-menu.png')
let deactiveIcon = require('../../asset/ico-deactive-menu.png')

//
class MenuNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Menu',
    tabBarIcon: ({ tintColor }) =>
      <Image source={ tintColor=='white' ? activeIcon : deactiveIcon } style={ styles.icon } />
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <MenuNavigator
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
export default connect(mapStateToProps)(MenuNavigation)

let styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 20
  }
})
