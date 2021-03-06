"use strict";

// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../action";

// React Native
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";

// Layout constant
import Constant from "../../constant";

//-- Menu Button Class
class MenuButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={{ width: "100%", height: 40 }}
        underlayColor="#0079b6"
        onPress={this.props.touchUpInside}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

//-- Menu Class
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentWillMount() {
    this.props.navigation.state = { isLoggedIn: false };
    AsyncStorage.getItem("user", (error, result) => {
      if (result !== null) {
        this.setState({ isLoggedIn: true });
      }
    });
  }

  onBtnAboutUs() {
    this.props.navigation.navigate("AboutUs");
  }

  onBtnContactUs() {
    this.props.navigation.navigate("ContactUs");
  }

  onBtnFeedback() {
    this.props.navigation.navigate("Feedback");
  }

  onBtnInbox() {
    this.props.navigation.navigate("Inbox");
  }

  onBtnNotification() {
    if (this.props.account.email) {
      this.props.navigation.navigate("Notification");
      return;
    }
    Alert.alert("Warning", "Please login or register first.");
  }

  onBtnSignOut() {
    this.props.dispatch(logout({}));
    AsyncStorage.removeItem("user", error => {
      this.setState({ isLoggedIn: false });
      Alert.alert("Notification", "You signed out!");
    });
  }

  render() {
    const { account } = this.props;
    let imgLogo = require("../../asset/logo.png");
    return (
      <View style={styles.container}>
        <View style={styles.titleBar} />
        <View style={styles.wrapper}>
          <Image
            source={imgLogo}
            style={{ width: 92, height: 59 }}
            resizeMode="stretch"
          />
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <MenuButton
            title={"About Us"}
            touchUpInside={() => {
              this.onBtnAboutUs();
            }}
          />
          <MenuButton
            title={"Contact Us"}
            touchUpInside={() => {
              this.onBtnContactUs();
            }}
          />
          <MenuButton
            title={"Feedback"}
            touchUpInside={() => {
              this.onBtnFeedback();
            }}
          />
          <MenuButton
            title={"Inbox"}
            touchUpInside={() => {
              this.onBtnInbox();
            }}
          />
          <MenuButton
            title={"Setting Notification"}
            touchUpInside={() => {
              this.onBtnNotification();
            }}
          />
          {account.user_id &&
            <MenuButton
              title={"Sign out"}
              touchUpInside={() => {
                this.onBtnSignOut();
              }}
            />}
        </View>
      </View>
    );
  }
}

export default connect(state => ({ account: state.account }))(Menu);

//-- StyleSheet
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000715",
    marginTop: Platform.OS == "ios" ? 20 : 0
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleBar: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "transparent"
  },
  title: {
    color: "white",
    fontFamily: Constant.font.roman,
    fontSize: 13
  }
});
