'use strict'

import Constant from '../constant'

export default {

    login: function(data) {
        let url = Constant.host + 'login.php?email=' + data.email
                                + '&password=' + data.password
                                + '&token=' + data.token
        return fetch(url)
    },

    signup: function(data) {
        let url = Constant.host + 'signup.php?username=' + data.username
                                + '&full_name=' + data.fullname
                                + '&email=' + data.email
                                + '&password=' + data.password
        return fetch(url)
    },

    getMagazines: function() {
        let url = Constant.host + 'get_magazines.php'
        return fetch(url)
    },

    getMagazineDetail: function(id) {
        let url = Constant.host + 'get_magazine_detail.php?magazine_id=' + id
        return fetch(url)
    },

    submitCommentForMagazine: function(data) {
        let url = Constant.host + 'comment_magazine.php?user_id=' + data.userId
                                + '&magazine_id=' + data.magazineId
                                + '&comment=' + data.comment
                                + '&rates=' + data.rates
        return fetch(url)
    },

    getVideos: function() {
        let url = Constant.host + 'get_videos.php'
        return fetch(url)
    },

    getVideoDetail: function(id) {
        let url = Constant.host + 'get_video_detail.php?video_id=' + id
        return fetch(url)
    },

    submitCommentForVideo: function(data) {
        let url = Constant.host + 'comment_video.php?user_id=' + data.userId
                                + '&video_id=' + data.videoId
                                + '&comment=' + data.comment
                                + '&rates=' + data.rates
        return fetch(url)
    },

    getNewsfeeds: function() {
        let url = Constant.host + 'get_newsfeed.php'
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
        let url = Constant.host + 'submit_feedback.php?user_id=' + data.userId
                                + '&email=' + data.email
                                + '&title=' + data.title
                                + '&descript=' + data.feedback
        return fetch(url)
    },

    getInbox: function(userId) {
        let url = Constant.host + 'feedback_reply.php?user_id=' + userId
        return fetch(url)
    }

}
