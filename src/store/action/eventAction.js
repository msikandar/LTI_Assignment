import { ActionTypes } from '../constants/action-types'

export const createEvent = (data) => {
  return {
    type: ActionTypes.CREATE_EVENT,
    data: data,
  }
}
