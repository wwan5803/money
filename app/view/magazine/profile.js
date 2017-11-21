"use strict";

//-- React
import React, { Component } from "react";
import { connect } from "react-redux";
//-- React Native
import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";

//-- API
import API from "../../api/api";

import { updateMagazine, updateMagazineHasView } from "../action";

//-- Loading Indicator
import LoadingIndicator from "../../utilities/loading_indicator";

//-- Comment
import Comment from "./utility/comment";

//-- Rating
import Rating from "./utility/rating";

//-- Constant
import Constant from "../../constant";

//-- Magazin Profile Class
class MagazineProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
      modalVisible: false,
      comment: "",
      comments: [],
      id: this.props.navigation.state.params.id,
      magazine: undefined,
      isLoading: false
    };
  }

  componentWillMount() {
    this.getMagazineDetail();
  }

  // Actions
  onBtnReply() {}

  async onBtnSubmit(rate) {
    if (this.state.comment == "") {
      Alert.alert("Warning", "Please insert your comment.");
      return;
    }

    const user = await AsyncStorage.getItem("user");
    if (user == null) {
      Alert.alert("Warning", "You can submit comment after logging in.");
      return;
    }

    let userData = JSON.parse(user);
    let data = {
      userId: userData.user_id,
      magazineId: this.state.magazine.magazine_id,
      comment: this.state.comment,
      rates: rate
    };

    try {
      let response = await API.submitCommentForMagazine(data);
      let responseData = await response.json();
      if (responseData.success == true) {
        this.setState({ modalVisible: false });
        this.getMagazineDetail();
      } else {
        Alert.alert("Warning", "Commenting failed. Please try to resubmit.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Commenting Failed", error);
    }
  }

  async getMagazineDetail() {
    let addViewCountObjString = await AsyncStorage.getItem("addViewCount");
    let addViewCountObj = JSON.parse(addViewCountObjString);

    if (!addViewCountObj) {
      addViewCountObj = {};
    }
    if (
      !addViewCountObj[this.state.id] ||
      addViewCountObj[this.state.id] === ""
    ) {
      addViewCountObj[this.state.id] = "true";
    }

    this.setState({ isLoading: true });
    try {
      let response = await API.getMagazineDetail(
        this.state.id,
        addViewCountObj[this.state.id]
      );
      let responseData = await response.json();

      let magazine = responseData.data;
      this.props.dispatch(updateMagazine(magazine));
      // this.props.dispatch(updateMagazineHasView(magazine));
      addViewCountObj[this.state.id] = "false";
      await AsyncStorage.setItem(
        "addViewCount",
        JSON.stringify(addViewCountObj)
      );
      this.setState({
        rate: parseInt(magazine.rates),
        magazine: magazine,
        comments: magazine.comments == null ? [] : magazine.comments,
        isLoading: false
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

  // Rendering
  render() {
    let imgMagazine = require("../../asset/magazine1.png");
    let imgNew = require("../../asset/new.png");
    let imgPreview = require("../../asset/preview2.png");
    let imgButton = require("../../asset/button.png");
    let iconBack = require("../../asset/ico-back.png");
    let iconStarActive = require("../../asset/ico-star-active.png");
    let iconStarInactive = require("../../asset/ico-star-inactive.png");
    let iconComment = require("../../asset/ico-comment.png");

    let magazine = this.state.magazine;

    var array = [];
    for (let i = 0; i < 10; i++) {
      if (i < this.state.rate) {
        array.push(
          <Image
            key={i}
            style={{ width: 13, height: 13, marginRight: 2 }}
            source={iconStarActive}
          />
        );
      } else {
        array.push(
          <Image
            key={i}
            style={{ width: 13, height: 13 }}
            source={iconStarInactive}
          />
        );
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={{ width: 40, height: 40 }}
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <View style={styles.wrapper}>
                <Image style={styles.back} source={iconBack} />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                color: "white",
                fontSize: 15,
                fontFamily: Constant.font.roman,
                textAlign: "center"
              }}
            >
              Money Theory
            </Text>
            <TouchableOpacity
              style={{ width: 40, height: 40 }}
              activeOpacity={0.8}
            />
          </View>
        </View>

        {magazine &&
          <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={{ width: "100%" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    width: Constant.layout.magazineWidth,
                    height: "100%",
                    padding: 5
                  }}
                  activeOpacity={0.8}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <TouchableOpacity
                      style={{
                        width: Constant.layout.magazineWidth - 10,
                        height: Math.round(
                          (Constant.layout.magazineWidth - 10) * 1.5
                        )
                      }}
                      activeOpacity={0.8}
                      onPress={() => {
                        this.props.navigation.navigate("MagazineViewer");
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: Constant.color.placeholder
                        }}
                        source={{ uri: magazine.thumbnail }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                  <View style={{ width: "100%" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <Text
                          style={{
                            color: "#ddbb1f",
                            fontSize: 17,
                            fontFamily: Constant.font.roman
                          }}
                        >
                          {magazine.title}
                        </Text>
                      </View>
                      {/*<Image style={{ width:55, height:55 }} source={ imgNew } resizeMode='stretch' />*/}
                    </View>
                    {magazine.description.length < 30 &&
                      <Text style={styles.description}>
                        Topic cover: {"\n" + magazine.description}
                      </Text>}

                    {/*<Text style={[styles.description, {marginVertical:15}]}>*/}
                    {/*How long to read: 30min*/}
                    {/*</Text>*/}
                    <View style={{ width: "100%", marginVertical: 15 }}>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        {array}
                        <Text
                          style={{
                            color: "#ddbb1f",
                            fontSize: 15,
                            marginHorizontal: 10
                          }}
                        >
                          {magazine.rates + ".0"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {magazine.description.length >= 30 &&
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  fontFamily: Constant.font.roman,
                  marginVertical: 20
                }}
              >
                {magazine.description}
              </Text>}

            {magazine.previews.length > 0 &&
              <View
                style={{
                  width: "100%",
                  height: (Constant.layout.screenWidth - 40) / 3
                }}
              >
                <ScrollView
                  style={{ flex: 1, flexDirection: "row" }}
                  horizontal={true}
                >
                  {magazine.previews.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        style={{
                          width: (Constant.layout.screenWidth - 40) / 3,
                          height: "100%",
                          marginRight: 10,
                          backgroundColor: Constant.color.placeholder,
                          resizeMode: "stretch"
                        }}
                        source={{ uri: item }}
                      />
                    );
                  })}
                </ScrollView>
              </View>}

            <View
              style={{
                width: "100%",
                marginVertical: 30,
                marginHorizontal: (Constant.layout.screenWidth - 20 - 244) / 3
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: 122,
                    height: 27,
                    marginRight: (Constant.layout.screenWidth - 20 - 244) / 3
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.props.navigation.navigate("MagazineViewer");
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
                    <View
                      style={[
                        styles.wrapper,
                        { paddingTop: Platform.OS == "ios" ? 3 : 0 }
                      ]}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: Constant.font.book,
                          fontSize: 10,
                          backgroundColor: "transparent"
                        }}
                      >
                        Read Magazine
                      </Text>
                    </View>
                  </Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: 122, height: 27 }}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ modalVisible: true });
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
                    <View
                      style={[
                        styles.wrapper,
                        {
                          flexDirection: "row",
                          paddingTop: Platform.OS == "ios" ? 3 : 0
                        }
                      ]}
                    >
                      <Image
                        style={{ width: 19, height: 14, marginRight: 5 }}
                        source={iconComment}
                      />
                      <Text
                        style={{
                          color: "white",
                          fontFamily: Constant.font.book,
                          fontSize: 10,
                          backgroundColor: "transparent"
                        }}
                      >
                        Rate/Comment
                      </Text>
                    </View>
                  </Image>
                </TouchableOpacity>
              </View>
            </View>

            {this.state.comments.map((item, index) => {
              return (
                <Comment
                  key={index}
                  name={"Alan Tang"}
                  rate={item.rates}
                  comment={item.comments}
                  onReply={() => this.onBtnReply()}
                />
              );
            })}
          </ScrollView>}

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.wrapper}>
            <Rating
              onChangeComment={text => this.setState({ comment: text })}
              onBtnSubmit={rate => {
                this.onBtnSubmit(rate);
              }}
              onCancel={() => this.setState({ modalVisible: false })}
            />
          </View>
        </Modal>

        {this.state.isLoading &&
          <LoadingIndicator animating={true} size="large" top={44} />}
      </View>
    );
  }
}

export default connect(state => ({ magazines: state.magazines }))(
  MagazineProfile
);

//-- Styles
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.background,
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
  description: {
    color: "white",
    fontSize: 10,
    fontFamily: Constant.font.roman,
    marginTop: 10
  },
  back: {
    width: 17,
    height: 17
  }
});
