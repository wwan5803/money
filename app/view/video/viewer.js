
'use strict'

//-- React
import React, { Component } from 'react'

//-- React Native
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native'

//-- Video Player
import VideoPlayer from 'react-native-video-player'

//-- Constant
import Constant from '../../constant'

//-- Video Viewer
export default class VideoViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageCount: 1,
        };
        this.pdf = null;
    }

    render() {
        let iconBack = require('../../asset/ico-back.png')
        return(
            <View style={ styles.container }>
                <View style={ styles.titleBar }>
                    <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
                        <TouchableOpacity
                          style={{ width:40, height:40 }}
                          activeOpacity={ 0.8 }
                          onPress={ () => {this.props.navigation.goBack()} }
                        >
                            <View style={ styles.wrapper }>
                                <Image style={ styles.back } source={ iconBack } />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ flex:1, color:'white', fontSize:15, fontFamily:Constant.font.roman, textAlign:'center' }}>
                          { this.props.navigation.state.params.title }
                        </Text>
                        <TouchableOpacity style={{ width:40, height:40 }} activeOpacity={ 0.8 } />
                    </View>
                </View>
                <View style={{ flex:1, justifyContent:'center' }}>
                    <VideoPlayer
                      endWithThumbnail
                      video={{ uri:this.props.navigation.state.params.uri }}
                      autoplay={ true }
                    />
                </View>
            </View>
        )
    }
}

//-- Styles
let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.background,
        marginTop: Platform.OS == 'ios' ? 20 : 0
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBar: {
        width: '100%',
        height: 40,
        paddingHorizontal:10,
        backgroundColor: 'transparent'
    },
    back: {
        width: 17,
        height: 17
    },
})
