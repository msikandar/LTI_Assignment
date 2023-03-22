import Register from '../view/Register'
import Login from '../view/Login'
import MainScreen from '../view/MainScreen'
import useAuth from '../hooks/useAuth'
import EventForm from '../view/EventForm'

function Routes() {
  const user = useAuth()
  let initialRoute = '/login-screen'

  console.log(user, 'user')
  if (user) initialRoute = '/main-screen'
  if (!user) initialRoute = '/login-screen'

  const routes = [
    {
      path: '/login-screen',
      element: Login,
    },
    {
      path: '/register-screen',
      element: Register,
    },
    {
      path: '/main-screen',
      element: MainScreen,
    },
    {
      path: '/event-form-screen',
      element: EventForm,
    },
    {
      path: '*',
      redirectTo: initialRoute,
    },
  ]
  return routes
}

export default Routes
