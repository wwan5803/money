"use strict";

// Redux
import { applyMiddleware, combineReducers, createStore } from "redux";
import Logger from "redux-logger";
import thunk from "redux-thunk";
// Navigation
import { MagazineNavigator } from "./magazine/nav-config";
import { NewsfeedNavigator } from "./newsfeed/nav-config";
import { VideoNavigator } from "./video/nav-config";
import { LoginNavigator } from "./user/nav-config";
import { MenuNavigator } from "./menu/nav-config";
import { TabBar, tabBarReducer } from "./tabbar/nav-config";
import { account, videos, magazines } from "./reducer";

// Middleware
const middleware = () => {
  return applyMiddleware(Logger);
};

export default createStore(
  combineReducers({
    tabBar: tabBarReducer,

    newsfeed: (state, action) =>
      NewsfeedNavigator.router.getStateForAction(action, state),

    video: (state, action) =>
      VideoNavigator.router.getStateForAction(action, state),

    magazine: (state, action) =>
      MagazineNavigator.router.getStateForAction(action, state),

    login: (state, action) =>
      LoginNavigator.router.getStateForAction(action, state),

    menu: (state, action) =>
      MenuNavigator.router.getStateForAction(action, state),

    account,

    videos,

    magazines
  }),
  middleware()
);
