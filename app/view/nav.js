'use strict'

// React
import React from 'react'

// React Navigation
import { addNavigationHelpers } from 'react-navigation'
import { AppNavigator } from './nav-config'

// Redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    navigationState: state.app
  }
}

class AppNavigation extends React.Component {
  render() {
    const { navigationState, dispatch } = this.props
    return(
      <AppNavigator
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
export default connect(mapStateToProps)(AppNavigation)
