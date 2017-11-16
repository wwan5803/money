'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import Logger from 'redux-logger'

// Navigation
import { AppNavigator }      from './nav-config'
import { NavigatorMedia }    from './articles/nav-config'
import { NavigatorSearch }   from './search/nav-config'
import { NavigatorMyPage }   from './mypage/nav-config'
import { NavigatorFavorite } from './favorite/nav-config'
import { NavigatorSetting }  from './setting/nav-config'
import { TabBar, tabBarReducer } from './tabbar/nav-config'

// Middleware
const middleware = () => {
  return applyMiddleware(Logger)
}

export default createStore(
  combineReducers({
    app       : (state,action) => AppNavigator.router.getStateForAction(action,state),

    tabBar    : tabBarReducer,

    media     : (state,action) => NavigatorMedia.router.getStateForAction(action,state),

    search    : (state,action) => NavigatorSearch.router.getStateForAction(action,state),

    mypage    : (state,action) => NavigatorMyPage.router.getStateForAction(action,state),

    favorite  : (state,action) => NavigatorFavorite.router.getStateForAction(action,state),

    setting   : (state,action) => NavigatorSetting.router.getStateForAction(action,state),
  }),
  middleware(),
)
