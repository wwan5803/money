"use strict";

// React
import React, { Component } from "react";
import { connect } from "react-redux";

// React Native
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  TouchableHighlight,
  Modal
} from "react-native";
import { login } from "../action";

// import RNDeviceToken from 'react-native-device-token'

// Network
import Net from "../../utilities/net";

//-- API
import API from "../../api/api";

// Layout constant
import Constant from "../../constant";

//-- Login Class
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      modalVisible: false,
      privateEmail: "",
      type: "stepOne"
    };
  }

  // LifeCycle
  componentWillMount() {
    AsyncStorage.getItem("user", (error, result) => {
      if (result) {
        this.props.dispatch(login(JSON.parse(result)));
      }
    });
    if (this.props.account.email) {
      this.props.navigation.navigate("LoggedIn");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account.email) {
      nextProps.navigation.navigate("LoggedIn");
    }
  }

  async onBtnSubmit() {
    if (!Net.isConnected()) {
      Alert.alert(
        "No internet connection",
        "Please check your internet conncetion."
      );
      return;
    }

    let userInfo = {
      email: this.state.email,
      password: this.state.password
    };

    if (userInfo.email == "" || userInfo.password == "") {
      Alert.alert("Warning", "Please fill all information");
      return;
    }

    this.setState({ isLoading: true });

    try {
      let response = await API.login(userInfo);
      let responseData = await response.json();
      if (responseData.success == true) {
        let userData = JSON.stringify(responseData.data);
        this.props.dispatch(login(responseData.data));
        await AsyncStorage.setItem("user", userData);
        this.setState({ isLoading: false });
        this.setState({ password: "" });
        Alert.alert("Login", "You logged in successfully!");
        this.props.navigation.navigate("LoggedIn");
      } else {
        Alert.alert("Login failed", responseData.msg);
        this.setState({ isLoading: false });
      }
    } catch (error) {
      Alert.alert("Error", error);
      this.setState({ isLoading: false });
    }
  }

  setEmail(text) {
    this.setState({ privateEmail: text });
  }

  async requestNewPassword() {
    if (!Net.isConnected()) {
      Alert.alert(
        "No internet connection",
        "Please check your internet conncetion."
      );
      return;
    }

    let userInfo = {
      privateEmail: this.state.privateEmail
    };

    if (userInfo.privateEmail == "") {
      Alert.alert("Warning", "Please fill all information");
      return;
    }

    this.setState({ type: "stepTwo" });

    try {
      let response = await API.forgetPassword(userInfo);
      let responseData = await response.json();
      console.log("responseDataresponseDataresponseData", responseData);
      if (responseData.success == true) {
        this.setState({ type: "stepTwo" });
        // alert("Success! Please check your email to modify your password.");
      }
    } catch (error) {
      Alert.alert("Error", error);
    }
    console.log("1231312312312312312", this.state.privateEmail);
    // this.setState({ modalVisible: false });
  }

  cancel() {
    this.setState({ modalVisible: false });
  }

  render() {
    let imgButton = require("../../asset/button-login.png");
    let imgLogo = require("../../asset/logo-white.png");

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ForgotPassword
            type={this.state.type}
            imgButton={imgButton}
            modalVisible={this.state.modalVisible}
            setEmail={this.setEmail.bind(this)}
            requestNewPassword={() => this.requestNewPassword()}
            cancel={() => this.cancel()}
          />
          <View style={{ flex: 3, alignItems: "center" }}>
            <View style={{ width: 189, height: "100%" }}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 20,
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Image
                  style={{ width: 92, height: 59, marginBottom: 30 }}
                  source={imgLogo}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  underlineColorAndroid={"transparent"}
                  autoCorrect={false}
                  placeholder={"Email"}
                  returnKeyType="next"
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={() => {
                    this.refs.password.focus();
                  }}
                />
                <TextInput
                  ref="password"
                  style={styles.input}
                  keyboardType="email-address"
                  underlineColorAndroid={"transparent"}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ type: "stepOne" });
                    this.setState({ modalVisible: true });
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontFamily: Constant.font.roman
                    }}
                  >
                    Forgot password
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ width: 189, height: 27, marginBottom: 10 }}
                activeOpacity={0.8}
                onPress={() => {
                  this.onBtnSubmit();
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "stretch"
                  }}
                  source={imgButton}
                >
                  <View style={styles.wrapper}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontFamily: Constant.font.roman,
                        backgroundColor: "transparent"
                      }}
                    >
                      Sign in
                    </Text>
                    {this.state.isLoading &&
                      <ActivityIndicator animating={true} size="small" />}
                  </View>
                </Image>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              style={{ width: 189, height: 27, marginBottom: 10 }}
              onPress={() => {}}
            >
              <Image
                style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
                source={imgButton}
              >
                <View style={styles.wrapper}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontFamily: Constant.font.roman,
                      backgroundColor: "transparent"
                    }}
                  >
                    Sign in with ACY Account
                  </Text>
                </View>
              </Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 189, height: 27 }}
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <Image
                style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
                source={imgButton}
              >
                <View style={styles.wrapper}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontFamily: Constant.font.roman,
                      backgroundColor: "transparent"
                    }}
                  >
                    New for Signup
                  </Text>
                </View>
              </Image>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(state => ({ account: state.account }))(Login);

const ForgotPassword = ({
  type,
  imgButton,
  modalVisible,
  setEmail,
  requestNewPassword,
  cancel
}) =>
  <Modal animationType="slide" transparent={true} visible={modalVisible}>
    <View style={styles.wrapper}>
      <View style={styles.modalContainer}>
          {type === "stepOne" &&
            <StepOne
              imgButton={imgButton}
              modalVisible={modalVisible}
              setEmail={setEmail}
              requestNewPassword={requestNewPassword}
              cancel={cancel}
            />}
          {type === "stepTwo" &&
            <StepTwo
              imgButton={imgButton}
              modalVisible={modalVisible}
              cancel={cancel}
            />}
      </View>
    </View>
  </Modal>;

const StepOne = ({
  imgButton,
  modalVisible,
  setEmail,
  requestNewPassword,
  cancel
}) =>
  <View style={{
      alignItems: "center",
      marginTop: 10
  }}>
    <Text>Forgot Password?</Text>
    <Text style={{ marginTop: 10, textAlign: "center" }}>
      Enter your email address to request a password reset.
    </Text>
    <TextInput
      style={styles.inputEmail}
      keyboardType="email-address"
      underlineColorAndroid={"transparent"}
      autoCorrect={false}
      placeholder={"Enter your email address"}
      returnKeyType="next"
      onChangeText={text => setEmail(text)}
    />
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <TouchableOpacity
        style={{ width: 120, height: 27, marginRight: 10 }}
        activeOpacity={0.8}
        onPress={() => {
          requestNewPassword();
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "stretch"
          }}
          source={imgButton}
        >
          <View style={styles.wrapper}>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontFamily: Constant.font.roman,
                backgroundColor: "transparent"
              }}
            >
              REQUEST
            </Text>
          </View>
        </Image>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ width: 120, height: 27 }}
        activeOpacity={0.8}
        onPress={() => {
          cancel();
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "stretch"
          }}
          source={imgButton}
        >
          <View style={styles.wrapper}>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontFamily: Constant.font.roman,
                backgroundColor: "transparent"
              }}
            >
              CANCEL
            </Text>
          </View>
        </Image>
      </TouchableOpacity>
    </View>
  </View>;

const StepTwo = ({ imgButton, modalVisible, cancel }) =>
  <View style={{
      alignItems: "center",
      marginTop: 10
  }}>
    <Text>Password Request Sent</Text>
    <Text style={{ marginVertical: 10, textAlign: "center" }}>
      Check your email for the link to reset your password.
    </Text>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <TouchableOpacity
        style={{ width: 120, height: 27, marginRight: 10 }}
        activeOpacity={0.8}
        onPress={() => {
          cancel();
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "stretch"
          }}
          source={imgButton}
        >
          <View style={styles.wrapper}>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontFamily: Constant.font.roman,
                backgroundColor: "transparent"
              }}
            >
              OKEY
            </Text>
          </View>
        </Image>
      </TouchableOpacity>
    </View>
  </View>;

// StyleSheet
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.background,
    marginTop: Platform.OS == "ios" ? 20 : 0
  },

  modalContainer: {
    width: Constant.layout.screenWidth - 80,
    height: 220,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: "100%",
    height: 33,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 3,
    backgroundColor: "white",
    fontSize: 10,
    fontFamily: Constant.font.roman,
    paddingHorizontal: 10
  },

  inputEmail: {
    width: "70%",
    height: 33,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 3,
    backgroundColor: "lightgrey",
    fontSize: 10,
    fontFamily: Constant.font.roman,
    paddingHorizontal: 10
  }
});
