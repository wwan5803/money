'use strict'

// Navigation
import { TabNavigator } from 'react-navigation'

// Platform
import { Platform } from 'react-native'

// Tab Navigators
import NewsfeedNavigation from '../newsfeed/nav'
import VideoNavigation    from '../video/nav'
import MagazineNavigation from '../magazine/nav'
import UserNavigation     from '../user/nav'
import MenuNavigation     from '../menu/nav'

// Constant
import Constant from '../../constant'

//
const routeConfiguration = {
  NewsfeedNavigation: { screen: NewsfeedNavigation },
  VideoNavigation   : { screen: VideoNavigation },
  MagazineNavigation: { screen: MagazineNavigation },
  UserNavigation    : { screen: UserNavigation },
  MenuNavigation    : { screen: MenuNavigation }
}

//
const tabBarConfiguration = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  initialRouteName: 'MagazineNavigation',
  tabBarOptions:
    (Platform.OS === 'ios') ? {
      activeTintColor: 'white',
      inactiveTintColor: 'rgb(254,254,254)',
      activeBackgroundColor: 'transparent',
      inactiveBackgroundColor: 'transparent',
      style: { backgroundColor: Constant.color.tabbar },
      labelStyle: { fontFamily: Constant.font.roman}
    } : {
      activeTintColor: 'white',
      inactiveTintColor: 'rgb(254,254,254)',
      activeBackgroundColor: 'transparent',
      inactiveBackgroundColor: 'transparent',
      upperCaseLabel: false,
      labelStyle: { fontSize: 8, fontFamily: Constant.font.roman },
      style: { backgroundColor: Constant.color.tabbar },
      showIcon: true
    }
}

export const TabBar = TabNavigator(routeConfiguration, tabBarConfiguration)

export const tabBarReducer = (state, action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index: 0 }
  }
  else {
    return TabBar.router.getStateForAction(action, state)
  }
}
