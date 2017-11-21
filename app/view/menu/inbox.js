"use strict";

// React
import React, { Component } from "react";

// React Native
import {
  StyleSheet,
  Platform,
  View,
  ListView,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Modal
} from "react-native";

//-- API
import API from "../../api/api";

//-- Loading Indicator
import LoadingIndicator from "../../utilities/loading_indicator";

//-- Constant
import Constant from "../../constant";

export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
      isLoading: false,
      modalVisible: false,
      modalContent: ""
    };
  }

  componentWillMount() {
    this.getInbox();
  }

  setModalVisible = visible => this.setState({ modalVisible: visible });

  async getInbox() {
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const user = await AsyncStorage.getItem("user");
    if (user != null) {
      let userJson = JSON.parse(user);
      this.setState({ isLoading: true });
      try {
        console.log("1111111", userJson);

        let response = await API.getInbox(userJson.user_id);
        console.log("2222222", response);
        let responseData = await response.json();
        if (responseData.success == null) {
          this.setState({
            isLoading: false,
            dataSource: dataSource.cloneWithRows([])
          });
        } else {
          this.setState({
            isLoading: false,
            dataSource: dataSource.cloneWithRows(responseData.data)
          });
        }
      } catch (error) {
        console.error(error);
        this.setState({ isLoading: false });
      }
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        style={styles.message}
        onPress={() => {
          this.setState({ modalContent: rowData.content });
          this.setModalVisible(true);
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row", padding: 15 }}>
            <Image
              style={styles.newsImage}
              source={{ uri: rowData.image }}
              resizeMode="stretch"
            />
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <Text style={{ fontFamily: Constant.font.roman, fontSize: 15 }}>
                {rowData.title}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: Constant.font.roman,
                    fontSize: 10,
                    color: "black"
                  }}
                  numberOfLines={1}
                >
                  {rowData.content}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ width: "100%", height: 1, backgroundColor: "white" }}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    let imgLogo = require("../../asset/logo.png");
    let iconBack = require("../../asset/ico-back.png");

    return (
      <View style={styles.container}>
        <InboxModal
          modalVisible={this.state.modalVisible}
          modalContent={this.state.modalContent}
          setModalVisible={this.setModalVisible}
        />

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
                textAlign: "center",
                paddingTop: 3
              }}
            >
              Inbox
            </Text>
            <TouchableOpacity style={{ width: 40, height: 40 }} />
          </View>
        </View>

        <View style={styles.wrapper}>
          <Image
            source={imgLogo}
            style={{ width: 92, height: 59 }}
            resizeMode="stretch"
          />
        </View>

        <View style={{ flex: 2 }}>
          {this.state.dataSource &&
            <ListView
              style={{ flex: 1 }}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />}
        </View>
      </View>
    );
  }
}

const InboxModal = ({ modalVisible, modalContent, setModalVisible }) =>
  <Modal animationType="slide" transparent={false} visible={modalVisible}>
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableHighlight
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text>X</Text>
        </TouchableHighlight>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>
          {modalContent}
        </Text>
      </View>
    </View>
  </Modal>;

//-- StyleSheet
var styles = StyleSheet.create({
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
  text: {
    color: "white",
    fontFamily: Constant.font.roman,
    fontSize: 13
  },
  back: {
    width: 17,
    height: 17
  },
  message: {
    height: 50,
    backgroundColor: "gainsboro"
  }
});

let description =
  "Money Theory 会持续为广大读者提供含金量更多的文章，让我们的行动为您披云雾，睹青天，让我们的专长成就您财务自由的梦想。";
