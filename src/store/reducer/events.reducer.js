import { ActionTypes } from '../constants/action-types'

const initialState = {
  userEventsData: [{ email: 'test@gmail.com', data: [] }],
}

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_EVENT:
      const filterData = state.userEventsData.filter(
        (d) => d.email === action.data.email
      )
      if (filterData?.length > 0) {
        // email alreday present
        const updatedData = state.userEventsData.map((e) => {
          if (e.email === action.data.email) {
            e.data.push(action.data.event)
          }
          return e
        })

        return {
          userEventsData: [...updatedData],
        }
      } else {
        //new user
        const newUpdEvents = [
          ...state.userEventsData,
          { email: action.data.email, data: [action.data.event] },
        ]
        console.log(newUpdEvents, 'newupt')
        return {
          userEventsData: [...newUpdEvents],
        }
      }

    case ActionTypes.DELETE_EVENT:
      const filterDel = state.userEventsData.filter(
        (d) => d.email === action.data.email
      )

      if (filterDel?.length > 0) {
        // email alreday present
        const updatedData = state.userEventsData.map((e) => {
          if (e.email === action.data.email) {
            console.log(
              e.data.filter((el) => el.id != action.data.id),
              'e'
            )
            e.data = e.data.filter((el) => el.id != action.data.id)
          }
          return e
        })

        console.log(updatedData, 'updated ')
        return {
          userEventsData: [...updatedData],
        }
      }

    // case ActionTypes.LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     currentUser: {
    //       email: null,
    //       userName: null,
    //     },
    //   }
    default:
      return state
  }
}
