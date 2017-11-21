export const login = (payload) => ({
    type: 'LOGIN',
    payload
});

export const signUp = (payload) => ({
    type: 'SIGNUP',
    payload
});

export const logout = (payload) => ({
    type: 'LOGOUT',
    payload
});

export const updateVideo = (payload) => ({
    type: 'INCREASE_VIDEO_VIEW',
    payload
});

export const acquireVideos = (payload) => ({
    type: 'ACQUIRE_VIDEOS',
    payload
});

export const updateMagazine = (payload) => ({
    type: 'INCREASE_MAGAZINE_VIEW',
    payload
});

export const acquireMagazines = (payload) => ({
    type: 'ACQUIRE_MAGAZINES',
    payload
});