import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { createEvent } from '../store/action/eventAction'
import { uniqueId } from '../utils/helper'

function EventForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.currentUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    dispatch(
      createEvent({
        email: user.email,
        event: { ...data, id: uniqueId() },
      })
    )
    navigate('/main-screen')
  }

  useEffect(() => {
    !useAuth() ? navigate('/login-screen') : null
  }, [])

  return useAuth() ? (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-6/12'
      >
        <h2 className='text-2xl text-gray-900 font-bold mb-6'>
          Create an Event
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
          Create Event
        </button>
      </form>
    </div>
  ) : null
}

export default EventForm
