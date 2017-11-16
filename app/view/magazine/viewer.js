
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

//-- PDF Viewer
import Pdf from 'react-native-pdf'

//-- Constant
import Constant from '../../constant'

//-- Definition
let PDF = require('./MTFebOld.pdf')

//-- Magazine Viewer
export default class MagazineViewer extends Component {
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
                          Money Theory | June 2017
                        </Text>
                        <TouchableOpacity style={{ width:40, height:40 }} activeOpacity={ 0.8 } />
                    </View>
                </View>
                <Pdf ref={ (pdf) => {this.pdf = pdf} }
                    source={ PDF }
                    page={ 1 }
                    horizontal={false}
                    onLoadComplete={ (pageCount) => {
                        this.setState({ pageCount:pageCount });
                        console.log(`total page count: ${pageCount}`);
                    }}
                    onPageChanged={ (page,pageCount) => {
                        this.setState({ page:page });
                        console.log(`current page: ${page}`);
                    }}
                    onError={ (error) => {
                        console.log(error);
                    }}
                    style={ styles.pdf }/>
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
    pdf: {
       flex: 1,
    }
})
