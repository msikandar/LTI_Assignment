import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { loginSuccess, registerSuccess } from '../store/action/authAction'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registeredUsers = useSelector((state) => state.auth.loginData)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    useAuth() ? navigate('/main-screen') : null
  }, [])

  return (
    <div>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          {/* <a
            href='#'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
          >
            <img
              className='w-8 h-8 mr-2'
              src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
              alt='logo'
            />
            Flowbite
          </a> */}
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Login
              </h1>
              <form
                className='space-y-4 md:space-y-6'
                onSubmit={handleSubmit((data) => {
                  const filteredUser = registeredUsers.filter(
                    (e) =>
                      e.email === data.email && e.password === data.password
                  )
                  if (filteredUser.length > 0) {
                    dispatch(
                      loginSuccess({
                        email: data.email,
                        password: data.password,
                        userName: filteredUser[0].userName,
                      })
                    )
                    localStorage.setItem(
                      'user',
                      JSON.stringify({
                        email: data.email,
                        password: data.password,
                        userName: filteredUser[0].userName,
                      })
                    )
                    navigate('/main-screen')
                    reset()
                  } else {
                    toast.error('Invalid Credentials')
                    // alert('email already registered')
                  }
                })}
              >
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Your email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    type='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                  />
                  {errors.email && (
                    <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <input
                    {...register('password')}
                    type='password'
                    autoComplete='on'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                </div>

                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required=''
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='terms'
                      className='font-light text-gray-500 dark:text-gray-300'
                    >
                      I accept the{' '}
                      <a
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        href='#'
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Login
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don't have an account?{' '}
                  <a
                    onClick={() => {
                      navigate('/register-screen')
                    }}
                    className='font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
