export const account = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload;
        case "SIGNUP":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
};

export const videos = (state = [], action) => {
    switch (action.type) {
        case "INCREASE_VIDEO_VIEW":
            return state.map((item)=> {
                if(item.video_id !== action.payload.video_id){
                    return item;
                }
                return {
                    ...item,
                    ...action.payload
                }
            })
        case "ACQUIRE_VIDEOS":
            return action.payload

        default:
            return state;
    }
};

export const magazines = (state = [], action) => {
    switch (action.type) {
        case "INCREASE_MAGAZINE_VIEW":
            return state.map((item)=> {
                if(item.magazine_id !== action.payload.magazine_id){
                    return item;
                }
                return {
                    ...item,
                    ...action.payload
                }
            })
        case "ACQUIRE_MAGAZINES":
            return action.payload

        default:
            return state;
    }
};