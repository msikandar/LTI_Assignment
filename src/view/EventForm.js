import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { createEvent, updateEvent } from '../store/action/eventAction'
import { uniqueId } from '../utils/helper'

function EventForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const user = useSelector((state) => state.auth.currentUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  /**
   *
   * @param {Object} data
   */
  const onSubmit = (data) => {
    if (!state) {
      dispatch(
        createEvent({
          email: user.email,
          event: { ...data, id: uniqueId() },
        })
      )
      navigate('/main-screen')
    } else {
      dispatch(
        updateEvent({
          event: { ...data, id: state.event.id },
          email: user.email,
        })
      )
      navigate('/main-screen')
    }
  }

  useEffect(() => {
    !useAuth() ? navigate('/login-screen') : null
    if (state) {
      // prepopulate the data for edit event
      setValue('name', state.event.name)
      setValue('date', state.event.date)
      setValue('description', state.event.description)
      setValue('booking_type', state.event.booking_type)
      setValue('price', state.event.price)
    }
  }, [])

  return useAuth() ? (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-6/12'
      >
        <div className='cursor-pointer' onClick={() => navigate(-1)}>
          <svg
            width='56'
            height='56'
            viewBox='0 0 56 56'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='0.5'
              y='0.5'
              width='55'
              height='55'
              rx='27.5'
              fill='blue'
            />
            <path
              d='M20.9999 28.7778H36.5555C36.7618 28.7778 36.9596 28.6959 37.1055 28.55C37.2513 28.4042 37.3333 28.2063 37.3333 28.0001C37.3333 27.7938 37.2513 27.5959 37.1055 27.4501C36.9596 27.3042 36.7618 27.2223 36.5555 27.2223H20.9999C20.7937 27.2223 20.5958 27.3042 20.45 27.4501C20.3041 27.5959 20.2222 27.7938 20.2222 28.0001C20.2222 28.2063 20.3041 28.4042 20.45 28.55C20.5958 28.6959 20.7937 28.7778 20.9999 28.7778Z'
              fill='white'
            />
            <path
              d='M21.3219 28.0001L27.7728 21.5507C27.9189 21.4047 28.0009 21.2066 28.0009 21.0001C28.0009 20.7935 27.9189 20.5954 27.7728 20.4494C27.6268 20.3033 27.4287 20.2213 27.2222 20.2213C27.0156 20.2213 26.8175 20.3033 26.6715 20.4494L19.6715 27.4494C19.5991 27.5216 19.5416 27.6075 19.5024 27.702C19.4632 27.7965 19.443 27.8977 19.443 28.0001C19.443 28.1024 19.4632 28.2037 19.5024 28.2982C19.5416 28.3926 19.5991 28.4785 19.6715 28.5507L26.6715 35.5507C26.8175 35.6968 27.0156 35.7788 27.2222 35.7788C27.4287 35.7788 27.6268 35.6968 27.7728 35.5507C27.9189 35.4047 28.0009 35.2066 28.0009 35C28.0009 34.7935 27.9189 34.5954 27.7728 34.4494L21.3219 28.0001Z'
              fill='white'
            />
          </svg>
        </div>
        <h2 className='text-2xl text-gray-900 font-bold mb-6'>
          {!state ? 'Create an Event' : 'Update an Event'}
        </h2>

        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Event Name:
          </label>
          <input
            type='text'
            id='name'
            {...register('name', { required: true })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter event name'
          />
          {errors.name && (
            <p className='text-red-500 text-xs italic mt-1'>
              This field is required
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='date' className='block text-gray-700 font-bold mb-2'>
            Event Date:
          </label>
          <input
            type='date'
            id='date'
            {...register('date', { required: true })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter event date'
          />
          {errors.date && (
            <p className='text-red-500 text-xs italic mt-1'>
              This field is required
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Event Description:
          </label>
          <textarea
            id='description'
            {...register('description', { required: true })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter event description'
            rows={4}
          />
          {errors.description && (
            <p className='text-red-500 text-xs italic mt-1'>
              This field is required
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
            Base Price:
          </label>
          <div className='flex items-center'>
            <span className='mr-2'>$</span>
            <input
              type='number'
              id='price'
              {...register('price', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter base price'
            />
          </div>
          {errors.price && (
            <p className='text-red-500 text-xs italic mt-1'>
              This field is required
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='booking_type'
            className='block text-gray-700 font-bold mb-2'
          >
            Booking Type:
          </label>
          <div>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                id='normal'
                {...register('booking_type')}
                value='normal'
                className='form-radio h-5 w-5 text-blue-600'
              />
              <span className='ml-2 text-gray-700 font-bold'>Normal</span>
            </label>
            <label className='inline-flex items-center ml-6'>
              <input
                type='radio'
                id='premium'
                {...register('booking_type')}
                value='premium'
                className='form-radio h-5 w-5 text-blue-600'
              />
              <span className='ml-2 text-gray-700 font-bold'>Premium</span>
            </label>
          </div>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='terms'
            className='inline-flex items-center text-gray-700 font-bold'
          >
            <input
              type='checkbox'
              id='terms'
              {...register('terms', { required: true })}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <span className='ml-2'>I accept the terms and conditions</span>
          </label>
          {errors.terms && (
            <p className='text-red-500 text-xs italic mt-1'>
              You must accept the terms and conditions
            </p>
          )}
        </div>

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          {!state ? 'Create Event' : 'Update Event'}
        </button>
      </form>
    </div>
  ) : null
}

export default EventForm
