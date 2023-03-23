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
    console.log(user)
  }, [])

  const getEventsByEmail = (email, data) => {
    const filter = data.filter((el) => email === el.email)

    if (filter.length > 0) {
      console.log(filter[0].data, 'filter')
      return filter[0].data
    } else {
      return []
    }
  }

  const handleEdit = (email, id) => {
    console.log(email, id)
  }
  const handleDelete = (email, id) => {
    console.log(email, id)
    dispatch(deleteEvent({ email, id }))
  }

  return useAuth() ? (
    <>
      <p>{user.userName}</p>
      <button
        onClick={() => {
          navigate('/event-form-screen')
        }}
        className='inline-flex items-center px-4 ml-12 mb-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md'
      >
        Create Event
      </button>
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
              onEdit={(id) => handleEdit(user?.email, id)}
              onDelete={(id) => handleDelete(user?.email, id)}
            />
          </div>
        ))}
      </div>
    </>
  ) : null
}

export default MainScreen
