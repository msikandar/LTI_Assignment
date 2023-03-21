import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function MainScreen() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.currentUser)

  useEffect(() => {
    !useAuth() ? navigate('/login-screen') : null
    console.log(user)
  }, [])

  return useAuth() ? <div>MainScreen {user.email}</div> : null
}

export default MainScreen
