'use strict'

// React
import React from 'react'
import { AppRegistry, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

// Redux
import { Provider } from 'react-redux'
import store from './view/store'

// Navigation
import TabBarNavigation from './view/tabbar/tabbar'

class AppNavigation extends React.Component {
  componentDidMount() {
    if (Platform.OS != 'ios') {
      SplashScreen.hide()
    }
  }

  render() {
    return(
      <Provider store={store}>
        <TabBarNavigation />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('moneytheory', () => AppNavigation)
