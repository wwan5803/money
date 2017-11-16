'use strict'

// React
import React from 'react'

// React Native
import { StyleSheet, Image } from 'react-native'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { MagazineNavigator } from './nav-config'

// Redux
import { connect } from 'react-redux'

// Navigation props
const mapStateToProps = (state) => {
  return {
    navigationState: state.magazine
  }
}

let activeIcon = require('../../asset/ico-active-magazine.png')
let deactiveIcon = require('../../asset/ico-deactive-magazine.png')

//
class MagazineNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Magazine',
    tabBarIcon: ({ tintColor }) =>
      <Image source={ tintColor=='white' ? activeIcon : deactiveIcon } style={ styles.icon } />
  }

  render() {
    const { navigationState, dispatch } = this.props
    return (
      <MagazineNavigator
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
export default connect(mapStateToProps)(MagazineNavigation)

let styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25
  }
})
