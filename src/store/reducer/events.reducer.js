import { ActionTypes } from '../constants/action-types'

const initialState = {
  userEventsData: [{ email: 'test@gmail.com', data: [] }],
}

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_EVENT:
      // filter out by current user email
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
            // delete event
            e.data = e.data.filter((el) => el.id != action.data.id)
          }
          return e
        })

        return {
          userEventsData: [...updatedData],
        }
      }

    case ActionTypes.UPDATE_EVENT:
      const filterUpdate = state.userEventsData.filter(
        (d) => d.email === action.data.email
      )

      if (filterUpdate?.length > 0) {
        // email alreday present
        const updatedData = state.userEventsData.map((e) => {
          if (e.email === action.data.email) {
            e.data = e.data.map((el) => {
              if (el.id === action.data.event.id) {
                el = action.data.event
              }
              return el
            })
          }
          return e
        })

        return {
          userEventsData: [...updatedData],
        }
      }
    default:
      return state
  }
}
