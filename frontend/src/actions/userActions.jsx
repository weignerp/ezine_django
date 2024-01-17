import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"
import { API_USER_LOGIN, API_USER_REGISTER, API_USER_DETAILS, API_USER_UPDATE_PROFILE } from '../constants/apiConstants'
import axios from "axios";

const fetchLoginFail = (error) => {
    return ({
        type: USER_LOGIN_FAIL,
        payload: error.reponse && error.response.data.detail ? error.response.data.detail : error.message
    });
}

const fetchUserLoginRequest = () => {
    return { type: USER_LOGIN_REQUEST };
}

const fetchUserLoginSuccess = (userInfo) => {
    return { type: USER_LOGIN_SUCCESS, payload: userInfo };
}
const fetchUserLogout = () => {
    return {
        type: USER_LOGOUT,
        payload: null
    };
}
const fetchUserRegisterFail = (error) => {
    return ({
        type: USER_REGISTER_FAIL,
        payload: error.reponse && error.response.data.detail ? error.response.data.detail : error.message
    });
}

const fetchUserRegisterRequest = () => {
    return { type: USER_REGISTER_REQUEST };
}

const fetchUserRegisterSuccess = (userInfo) => {
    return { type: USER_REGISTER_SUCCESS, payload: userInfo };
}
const fetchUserDetailsRequest = () => {
    return { type: USER_DETAILS_REQUEST };
}

const fetchUserDetailsSuccess = (user) => {
    return { type: USER_DETAILS_SUCCESS, payload: user };
}

const fetchUserDetailsFail = (error) => {
    return ({
        type: USER_DETAILS_FAIL,
        payload: error.reponse && error.response.data.detail ? error.response.data.detail : error.message
    });
}

const fetchUserDetailsReset = () => {
    return { type: USER_DETAILS_RESET };
}

const fetchUpdateUserProfileRequest = () => {
    return { type: USER_UPDATE_PROFILE_REQUEST };
}

const fetchUpdateUserProfileSuccess = (user) => {
    return { type: USER_UPDATE_PROFILE_SUCCESS, payload: user };
}
const fetchUpdateUserProfileReset = () => {
    return { type: USER_UPDATE_PROFILE_RESET };
}

const fetchUpdateUserProfileFail = (error) => {
    return ({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: error.reponse && error.response.data.detail ? error.response.data.detail : error.message
    });
}

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch(fetchUserLoginRequest())
        //, payload: { username, password }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(API_USER_LOGIN, { username, password }, config);
        dispatch(fetchUserLoginSuccess(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch(fetchLoginFail(error));
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch(fetchUserLogout());
    dispatch(fetchUserDetailsReset());

}
export const register = (firstname, lastname, email, username, password) => async (dispatch) => {
    try {
        dispatch(fetchUserRegisterRequest())
        //, payload: { username, password }
        console.log({ firstname, lastname, email, username, password });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(API_USER_REGISTER, { firstname, lastname, email, username, password }, config);
        dispatch(fetchUserRegisterSuccess(data));
        dispatch(fetchUserLoginSuccess(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch(fetchUserRegisterFail(error));
    }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(fetchUserDetailsRequest())
        console.log({ id });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.get(API_USER_DETAILS, config); //+ `${id}/`
        dispatch(fetchUserDetailsSuccess(data));
    }
    catch (error) {
        dispatch(fetchUserDetailsFail(error));
    }
}
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch(fetchUpdateUserProfileRequest())
        console.log({ user });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.put(API_USER_UPDATE_PROFILE, user, config);
        dispatch(fetchUpdateUserProfileSuccess(data));
        dispatch(fetchUserRegisterSuccess(data));
        dispatch(fetchUserLoginSuccess(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch(fetchUpdateUserProfileFail(error));
    }
}

export const resetUserProfile = () => async (dispatch) => {
    dispatch(fetchUpdateUserProfileReset());
}