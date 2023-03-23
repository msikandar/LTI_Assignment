import { ActionTypes } from '../constants/action-types'

/**
 *
 * @param {Object} data
 * @returns
 */
export const createEvent = (data) => {
  return {
    type: ActionTypes.CREATE_EVENT,
    data: data,
  }
}

/**
 *
 * @param {Object} data
 * @returns
 */
export const deleteEvent = (data) => {
  return {
    type: ActionTypes.DELETE_EVENT,
    data: data,
  }
}
/**
 *
 * @param {Object} data
 * @returns
 */
export const updateEvent = (data) => {
  return {
    type: ActionTypes.UPDATE_EVENT,
    data: data,
  }
}
