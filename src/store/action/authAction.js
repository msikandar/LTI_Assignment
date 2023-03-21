import { ActionTypes } from '../constants/action-types';

export const loginSuccess = (data) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        data: data,
    };
};

export const registerSuccess = (data) => {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
        data: data,
    };
};

export const logoutSuccess = (data) => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS,
        data: data,
    };
};
