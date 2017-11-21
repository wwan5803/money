'use strict'

import Constant from '../constant'

export default {

    login: function(data) {
        let url = Constant.host2 + 'v1/login'
        return fetch(url, {method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
            email: data.email,
            password: data.password,
        })})
    },

    signup: function(data) {
        let url = Constant.host2 + 'v1/signup'
        return fetch(url, {method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                username: data.username,
                full_name: data.fullname,
                email: data.email,
                password: data.password
            })})
    },

    forgetPassword: function(data) {
        let url = Constant.host2 + 'v1/forgot_password'
        return fetch(url, {method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                email: data.email
            })})
    },

    getMagazines: function(email) {
        // let url = Constant.host + 'get_magazines.php'
        let url = Constant.host2 + 'v1/get_magazines?user_email=' + email
        return fetch(url)
    },

    getMagazineDetail: function(id, addViewCount) {
        // let canAddView = '';
        // if(hasViewed){
        //     canAddView = 'false'
        // }else{
        //     canAddView = 'true'
        // }
        // let url = Constant.host + 'get_magazine_detail.php?magazine_id=' + id
        let url = Constant.host2 + 'v1/get_magazine_detail?id=' + id + '&add_viewCount=' + addViewCount
        return fetch(url)
    },

    submitCommentForMagazine: function(data) {
        let url = Constant.host2 + 'v1/comment_magazine'
        return fetch(url, {method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                user_id: 1,
                magazine_id: data.magazineId,
                comment: data.comment,
                rates: data.rates
            })})
    },

    getVideos: function() {
        // let url = Constant.host + 'get_videos.php'
        let url = Constant.host2 + 'v1/get_videos'
        return fetch(url)
    },

    getVideoDetail: function(id, addViewCount) {
        console.log('addViewCountaddViewCountaddViewCount', addViewCount)
        // let url = Constant.host + 'get_video_detail.php?video_id=' + id + '&add_viewCount=' + addViewCount
        let url = Constant.host2 + 'v1/get_video_detail?id=' + id + '&add_viewCount=' + addViewCount
        return fetch(url)
    },

    submitCommentForVideo: function(data) {
        let url = Constant.host2 + 'v1/comment_video'

        return fetch(url, {method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                user_id: data.userId,
                video_id: data.videoId,
                comment: data.comment,
                rates: data.rates
            })})
    },

    getNewsfeeds: function() {
        let url = Constant.host2 + 'v1/get_newsfeed'
        return fetch(url)
    },

    setSettings: function(data) {
        let url = Constant.host + 'set_settings.php?user_id=' + data.userId
                                + '&notification_magazine=' + data.notificationMagazine
                                + '&notification_video=' + data.notificationVideo
                                + '&notification_newsfeed=' + data.notificationNewsfeed
        return fetch(url)
    },

    submitFeedback: function(data) {
        let url = Constant.host2 + 'v1/submit_feedback'
        return fetch(url, {method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                user_id: data.userId,
                email: data.email,
                title: data.title,
                descript: data.feedback
            })})
    },

    getInbox: function(userId) {
        let url = Constant.host2 + 'v1/get_inbox?user_id=' + userId
        return fetch(url)
    },

    getMagazineSlider: function() {
        let url = Constant.host2 + 'v1/get_videoSlider'
        return fetch(url)
    },

    getVideoSlider: function() {
        let url = Constant.host2 + 'v1/get_magazineSlider'
        return fetch(url)
    }

}
