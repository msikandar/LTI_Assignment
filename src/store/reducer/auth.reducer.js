import { ActionTypes } from '../constants/action-types'

const initialState = {
  loginData: [{ email: 'test@gmail.com', password: 'Qwerty@123' }],
  currentUser: {
    email: null,
    userName: null,
  },
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: {
          email: action.data.email,
          userName: action.data.userName,
        },
      }
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loginData: [...state.loginData, action?.data],
      }
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: {
          email: null,
          userName: null,
        },
      }
    default:
      return state
  }
}
