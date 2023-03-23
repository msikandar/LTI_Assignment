import { ActionTypes } from '../constants/action-types'

export const createEvent = (data) => {
  return {
    type: ActionTypes.CREATE_EVENT,
    data: data,
  }
}

export const deleteEvent = (data) => {
  return {
    type: ActionTypes.DELETE_EVENT,
    data: data,
  }
}
