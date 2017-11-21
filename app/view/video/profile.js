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

import { updateVideo } from "../action";

//-- API
import API from "../../api/api";

//-- Loading Indicator
import LoadingIndicator from "../../utilities/loading_indicator";

//-- Comment
import Comment from "../magazine/utility/comment";

//-- Rating
import Rating from "../magazine/utility/rating";

//-- Constant
import Constant from "../../constant";

// Video Profile Class
class VideoProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.id,
      rate: 0,
      modalVisible: false,
      comment: "",
      comments: [],
      video: undefined
    };
  }

  componentWillMount() {
    this.getVideoDetail();
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
      videoId: this.state.video.video_id,
      comment: this.state.comment,
      rates: rate
    };

    try {
      console.log("datadatadatadatadata", data);
      let response = await API.submitCommentForVideo(data);
      let responseData = await response.json();
      console.log("333333333333333", responseData);
      if (responseData.success == true) {
        this.setState({ modalVisible: false });
        this.getVideoDetail();
      } else {
        Alert.alert("Warning", "Commenting failed. Please try to resubmit.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Commenting Failed", error);
    }
  }

  async getVideoDetail() {
    let addViewCountVideoObjString = await AsyncStorage.getItem(
      "addViewCountVideo"
    );
    let addViewCountVideoObj = JSON.parse(addViewCountVideoObjString);

    if (!addViewCountVideoObj) {
      addViewCountVideoObj = {};
    }
    if (
      !addViewCountVideoObj[this.state.id] ||
      addViewCountVideoObj[this.state.id] === ""
    ) {
      addViewCountVideoObj[this.state.id] = "true";
    }

    this.setState({ isLoading: true });
    try {
      let response = await API.getVideoDetail(this.state.id, addViewCountVideoObj[this.state.id]);
      let responseData = await response.json();
      let video = responseData.data;
      this.props.dispatch(updateVideo(video));
      addViewCountVideoObj[this.state.id] = "false";
      await AsyncStorage.setItem(
        "addViewCountVideo",
        JSON.stringify(addViewCountVideoObj)
      );
      this.setState({
        rate: parseInt(video.rates),
        video: video,
        comments: video.user_rates == null ? [] : video.user_rates,
        isLoading: false
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

  render() {
    let imgMagazine = require("../../asset/magazine1.png");
    let imgNew = require("../../asset/new.png");
    let imgPreview = require("../../asset/preview2.png");
    let imgButton = require("../../asset/button.png");
    let iconBack = require("../../asset/ico-back.png");
    let iconStarActive = require("../../asset/ico-star-active.png");
    let iconStarInactive = require("../../asset/ico-star-inactive.png");
    let iconComment = require("../../asset/ico-comment.png");

    let video = this.state.video;

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

        {video &&
          <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#ddbb1f",
                    fontSize: 17,
                    fontFamily: Constant.font.roman
                  }}
                >
                  {video.title}
                </Text>
              </View>
              {/*<Image*/}
              {/*style={{ width: 55, height: 55 }}*/}
              {/*source={imgNew}*/}
              {/*resizeMode="stretch"*/}
              {/*/>*/}
            </View>
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
                  <Image
                    style={{
                      width: Constant.layout.screenWidth,
                      height: Math.round(
                        (Constant.layout.magazineWidth - 10) * 1.5
                      ),
                      backgroundColor: Constant.color.placeholder
                    }}
                    source={{ uri: video.thumbnail }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1, padding: 10 }}>
                  <View style={{ width: "100%" }}>
                    <Text style={styles.description}>
                      Topic cover: {"\n" + video.description}
                    </Text>
                    {/*<Text style={[styles.description, { marginVertical: 15 }]}>*/}
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
                          {video.rates + ".0"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {video.previews.length > 0 &&
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
                  {video.previews.map((item, index) => {
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
                  onPress={() => {
                    this.props.navigation.navigate("VideoViewer", {
                      uri: video.uri,
                      title: video.title
                    });
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
                        Play Video
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
                  rate={8}
                  comment={item.comment}
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

export default connect()(VideoProfile);

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
