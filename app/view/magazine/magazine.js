"use strict";

// React
import React, { Component } from "react";
import { connect } from "react-redux";
// React Native
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

// Swiper
import Swiper from "react-native-swiper";

// Gradient
import LinearGradient from "react-native-linear-gradient";

import { acquireMagazines } from "../action";
//-- API
import API from "../../api/api";

//-- Loading Indicator
import LoadingIndicator from "../../utilities/loading_indicator";

//-- Constant
import Constant from "../../constant";

//-- Book
class Book extends Component {
  render() {
    let iconEye = require("../../asset/ico-eye.png");
    return (
      <TouchableOpacity
        style={{
          width: Constant.layout.magazineWidth,
          height: "100%",
          padding: 5
        }}
        activeOpacity={0.8}
        onPress={this.props.onSelect}
      >
        <Image
          style={{
            flex: 1,
            width: Constant.layout.magazineWidth - 10,
            backgroundColor: Constant.color.placeholder
          }}
          source={{ uri: this.props.thumbnail }}
          resizeMode="stretch"
        />
        <View
          style={{
            height: 30,
            paddingHorizontal: 10,
            backgroundColor: "black"
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1, color: "white", fontSize: 8 }}>
              {this.props.date.date}
            </Text>
            <View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 12, height: 7, marginBottom: 3 }}
                  source={iconEye}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 8,
                    fontFamily: Constant.font.light
                  }}
                >
                  {this.props.views}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

//-- Magazine Class
class Magazine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      magazines: undefined,
        magazineSlider: undefined,
      index: 0,
      isLoading: false
    };
  }

  // LifeCycle
  componentWillMount() {
    this.getMagazines();
    this.getMagazineSlider();
  }

  // Actions
  onBtnViewMagazine(index) {
    let magazine = this.props.magazines[index];
    this.props.navigation.navigate("MagazineProfile", {
      id: magazine.magazine_id
    });
  }

  async getMagazines() {
    this.setState({ isLoading: true });
    try {
      let response = await API.getMagazines(this.props.account.email);
      let responseData = await response.json();
      this.props.dispatch(acquireMagazines(responseData.data));
      this.setState({
        isLoading: false,
        magazines: responseData.data
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

    async getMagazineSlider() {
        this.setState({ isLoading: true });
        try {
            let response = await API.getMagazineSlider();
            let responseData = await response.json();
            this.setState({
                isLoading: false,
                magazineSlider: responseData.data
            });
        } catch (error) {
            console.error(error);
            this.setState({ isLoading: false });
        }
    }

  // Rendering
  render() {
    let iconNext = require("../../asset/ico-next.png");
    let magazines = this.props.magazines;
    let previews = [
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg",
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg",
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg",
      "http://articalhub.com/upload/01eeaf6ba66dd6f1e7bf91b0dcd0ea3c.jpg"
    ];

    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          {magazines != null &&
            magazines.length !== 0 &&
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

        {magazines != null &&
          magazines.length !== 0 &&
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
                      {magazines[0].title}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <ScrollView style={{ flex: 1 }} horizontal={true}>
              {magazines.map((item, index) => {
                return (
                  <Book
                    key={index}
                    thumbnail={item.thumbnail}
                    views={item.views}
                    date={item.post_date}
                    onSelect={() => {
                      this.onBtnViewMagazine(index);
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

export default connect(state => ({
  magazines: state.magazines,
  account: state.account
}))(Magazine);

// StyleSheet
let styles = StyleSheet.create({
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
      Constant.layout.screenHeight - Constant.layout.magazineWidth * 1.5 - 100
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
