import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EventForm from '../view/EventForm'
import useAuth from '../hooks/useAuth'
import TicketCard from '../components/TicketCard'

function MainScreen() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.currentUser)
  const userData = useSelector((state) => state.events.userEventsData)

  console.log(userData, 'userData')

  useEffect(() => {
    !useAuth() ? navigate('/login-screen') : null
    console.log(user)
  }, [])

  const getEventsByEmail = (email, data) => {
    return data.filter((d) => d.email === email)[0].data
  }
  console.log(getEventsByEmail(user.email, userData), 'data')
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
        {getEventsByEmail(user.email, userData).map((el) => (
          <TicketCard
            title={el.name}
            description={el.description}
            date={el.date}
            price={'$ ' + `${el.price}`}
            type={el.booking_type}
            onEdit={() => console.log('Edit button clicked')}
            onDelete={() => console.log('Delete button clicked')}
          />
        ))}
      </div>

      {/* <EventForm /> */}
    </>
  ) : null
}

export default MainScreen
