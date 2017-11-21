'use strict'

//-- React
import React, { Component } from 'react'

//-- React Native
import {
  StyleSheet,
  Platform,
  View,
  ListView,
  Image,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'

//-- API
import API from '../../api/api'

//-- Loading Indicator
import LoadingIndicator from '../../utilities/loading_indicator'

//-- Constant
import Constant from '../../constant'

//-- Newsfeed Class
export default class Newsfeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
          dataSource: undefined,
          isLoading: false
        }
    }

    componentWillMount() {
        this.getNewsfeed()
    }

    async getNewsfeed() {
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.setState({ isLoading:true })
        try {
            let response = await API.getNewsfeeds()
            let responseData = await response.json()
            console.log('3333333333333333', responseData)
            this.setState({
              isLoading: false,
              dataSource: dataSource.cloneWithRows(responseData.data)
            })
        }
        catch(error) {
            console.error(error)
            this.setState({ isLoading:false })
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return(
            <TouchableHighlight
              style={ styles.news }
              onPress={ () => {this.props.navigation.navigate('NewsfeedDetail', {news:rowData})} }>
                <View style={{ flex:1 }}>
                    <View style={{ flex:1, flexDirection:'row', padding: 15 }}>
                        <Image style={ styles.newsImage } source={{ uri:rowData.thumbnail }} resizeMode='stretch' />
                        <View style={{ flex:1, paddingHorizontal:5 }}>
                            <Text style={{ fontFamily:Constant.font.roman, fontSize:15, color:'white' }}>
                              { rowData.title }
                            </Text>
                            <View style={{ flex:1 }}>
                                <Text style={{ fontFamily:Constant.font.roman, fontSize:10, color:'white' }} numberOfLines={3}>
                                  { rowData.description }
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width:'100%', height:1, backgroundColor:'white' }} />
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return(
            <View style={ styles.container }>
                <View style={ styles.titleView}>
                    <View style={{ flex:1, justifyContent:'center' }} />
                    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
                        <Text style={ styles.title }>Money Theory</Text>
                    </View>
                    <View style={{ flex:1, justifyContent:'center' }} />
                </View>
                <View style={ styles.section }>
                    <View style={{ flex:1, justifyContent:'center' }}>
                        <Text style={ styles.title }>Hot News</Text>
                    </View>
                </View>

                {
                    this.state.dataSource &&
                        <ListView
                          style={{ flex:1 }}
                          dataSource={ this.state.dataSource }
                          renderRow={ this.renderRow.bind(this) } />
                }
                {
                    this.state.isLoading &&
                        <LoadingIndicator
                          animating={ true }
                          size='large' />
                }
            </View>
        )
    }
}

//-- StyleSheet
let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Constant.color.background,
      marginTop: Platform.OS == 'ios' ? 20 : 0
    },
    titleView: {
      width: '100%',
      height: 40,
      backgroundColor: 'transparent'
    },
    title: {
      fontFamily: Constant.font.roman,
      color: 'white',
      fontSize: 15
    },
    section: {
      width: '100%',
      height: 30,
      backgroundColor: '#013493',
      paddingHorizontal: 15
    },
    news: {
      width: '100%',
      height: 80
    },
    newsImage: {
      height: 50,
      width: 75,
      backgroundColor: Constant.color.placeholder
    }
})
