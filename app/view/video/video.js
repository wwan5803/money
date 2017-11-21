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
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

//-- Swiper
import Swiper from "react-native-swiper";

//-- Gradient
import LinearGradient from "react-native-linear-gradient";

//-- API
import API from "../../api/api";

//-- Loading Indicator
import LoadingIndicator from "../../utilities/loading_indicator";

//-- Constant
import Constant from "../../constant";

import { acquireVideos } from "../action";

//-- Video
class VideoCover extends Component {
  render() {
    let iconEye = require("../../asset/ico-eye.png");
    return (
      <TouchableOpacity
        style={{
          width: Constant.layout.videoWidth,
          height: "100%",
          padding: 5
        }}
        activeOpacity={0.8}
        onPress={this.props.onSelect}
      >
        <Image
          style={{
            flex: 1,
            width: Constant.layout.videoWidth - 10,
            backgroundColor: Constant.color.placeholder
          }}
          source={{ uri: this.props.thumbnail }}
          resizeMode="stretch"
        />
        <View
          style={{
            height: 30,
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: "black"
          }}
        >
          <Text
            style={{ flex: 1, color: "white", fontSize: 8 }}
            numberOfLines={1}
          >
            {this.props.title}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <Image
              style={{ width: 12, height: 7, marginRight: 3 }}
              source={iconEye}
            />
            <Text
              style={{
                color: "white",
                fontSize: 8,
                fontFamily: Constant.font.light,
                marginTop: 3
              }}
            >
              {this.props.views}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

//-- Video Class
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: undefined,
      videoSlider: undefined,
      index: 0,
      isLoading: false
    };
  }

  componentWillMount() {
    this.getVideos();
    this.getVideoSlider();
  }

  // Actions
  onBtnViewVideo(index) {
    let video = this.props.videos[index];
    this.props.navigation.navigate("VideoProfile", { id: video.video_id });
  }

  async getVideos() {
    await AsyncStorage.removeItem("addViewCountVideo");
    this.setState({ isLoading: true });
    try {
      let response = await API.getVideos();
      let responseData = await response.json();
      this.props.dispatch(acquireVideos(responseData.data));
      this.setState({
        isLoading: false,
        videos: responseData.data
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

  async getVideoSlider() {
    this.setState({ isLoading: true });
    try {
      let response = await API.getVideoSlider();
      let responseData = await response.json();
      this.setState({
        isLoading: false,
        videoSlider: responseData.data
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

  // Rendering
  render() {
    let iconNext = require("../../asset/ico-next.png");
    let videos = this.props.videos;
    console.log("1231231231231", this.props.videos);
    let previews = [
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg",
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg",
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg",
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg"
    ];

    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          {videos != null &&
            videos.length !== 0 &&
            <Swiper dotColor="white" autoplay={true}>
              {previews.map((item, index) => {
                return (
                  <Image
                    key={index}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: Constant.color.placeholder
                    }}
                    source={{ uri: item }}
                    resizeMode="stretch"
                  >
                    <LinearGradient
                      style={{ flex: 1 }}
                      start={{ x: 0.5, y: 0.6 }}
                      end={{ x: 0.5, y: 1 }}
                      colors={["transparent", Constant.color.background]}
                    />
                  </Image>
                );
              })}
            </Swiper>}
        </View>

        {videos != null &&
          videos.length !== 0 &&
          <View style={{ flex: 1 }}>
            <View style={styles.titleView}>
              <View style={[styles.wrapper, { marginHorizontal: 10 }]}>
                <View style={styles.wrapper}>
                  <View style={{ width: "100%", height: 17 }}>
                    <Text
                      style={{
                        flex: 1,
                        color: "white",
                        fontFamily: Constant.font.black,
                        marginTop: 2
                      }}
                    >
                      {videos[0].title}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <ScrollView style={{ flex: 1 }} horizontal={true}>
              {videos.map((item, index) => {
                return (
                  <VideoCover
                    key={index}
                    thumbnail={item.thumbnail}
                    views={item.views}
                    title={item.title}
                    onSelect={() => {
                      this.onBtnViewVideo(index);
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>}

        {this.state.isLoading &&
          <LoadingIndicator animating={true} size="large" />}
      </View>
    );
  }
}

export default connect(state => ({ videos: state.videos }))(Video);

// StyleSheet
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.background,
    marginTop: Platform.OS == "ios" ? 20 : 0
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  preview: {
    width: Constant.layout.screenWidth,
    height:
      Constant.layout.screenHeight - Constant.layout.videoWidth / 1.2 - 100
  },
  titleView: {
    width: "100%",
    height: 40
  },
  next: {
    width: 17,
    height: 17
  }
});
