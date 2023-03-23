import { ActionTypes } from '../constants/action-types'

/**
 *
 * @param {Object} data
 * @returns Object
 */
export const loginSuccess = (data) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    data: data,
  }
}

/**
 *
 * @param {Object} data
 * @returns
 */
export const registerSuccess = (data) => {
  return {
    type: ActionTypes.REGISTER_SUCCESS,
    data: data,
  }
}

/**
 *
 * @param {Object} data
 * @returns
 */
export const logoutSuccess = (data) => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
    data: data,
  }
}
