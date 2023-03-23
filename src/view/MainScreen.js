import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import TicketCard from '../components/TicketCard'
import { deleteEvent } from '../store/action/eventAction'

function MainScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.currentUser)
  const userData = useSelector((state) => state.events.userEventsData)

  useEffect(() => {
    !useAuth() ? navigate('/login-screen') : null
  }, [])

  /**
   *
   * @param {String} email
   * @param {Object} data
   * @returns
   */
  const getEventsByEmail = (email, data) => {
    const filter = data.filter((el) => email === el.email)

    if (filter.length > 0) {
      return filter[0].data
    } else {
      return []
    }
  }

  /**
   * edit event handler
   * @param {Object} event
   */
  const handleEdit = (event) => {
    navigate('/event-form-screen', {
      state: {
        event,
      },
    })
  }
  /**
   * delete event handler
   * @param {String} email
   * @param {String} id
   */
  const handleDelete = (email, id) => {
    dispatch(deleteEvent({ email, id }))
  }

  return useAuth() ? (
    <>
      <div>
        <button
          onClick={() => {
            navigate('/event-form-screen')
          }}
          className='inline-flex mt-4 items-center px-4 ml-12 mb-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md'
        >
          Create Event
        </button>
        <span>
          <button className='px-4 ml-96 py-2 bg-gray-100  text-black text-sm font-medium rounded-full'>
            {user.email}
          </button>
        </span>
        <span>
          <button
            onClick={() => {
              console.log('logout')
              localStorage.removeItem('user')
              navigate('/login-screen')
            }}
            className='px-4 ml-86 py-2 bg-gray-500 hover:bg-gray-400 text-white text-sm font-medium rounded-full'
          >
            Logout
          </button>
        </span>
      </div>
      <div className='grid grid-cols-4 md:grid-cols-4 gap-2 px-12'>
        {getEventsByEmail(user?.email, userData).map((el, index) => (
          <div key={index}>
            <TicketCard
              id={el.id}
              title={el.name}
              description={el.description}
              date={el.date}
              price={'$ ' + `${el.price}`}
              type={el.booking_type}
              onEdit={(id) => handleEdit(el)}
              onDelete={(id) => handleDelete(user?.email, id)}
            />
          </div>
        ))}
      </div>
    </>
  ) : null
}

export default MainScreen
