'use strict'

// React
import React from 'react'

// React Navigation
import { StackNavigator } from 'react-navigation'

// Screens
import TabBarNavigation from './tabbar/tabbar'
import ArticlePage from './articles/detail'
import Training from './articles/training'

// Create Navigation for Detail Pages
const routeConfiguration = {
  Home: { screen: TabBarNavigation },
  ArticlePage: { screen: ArticlePage },
  Training: { screen: Training }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Home'
}

export const AppNavigator = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
