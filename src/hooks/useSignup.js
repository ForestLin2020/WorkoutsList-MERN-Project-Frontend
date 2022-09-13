import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const { dispatch } = useAuthContext()
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    // for dev: http://localhost:4000/api/user/signup
    // for deploy: https://workouts-list-backend.herokuapp.com/api/user/signup
    const response = await fetch('https://workouts-list-backend.herokuapp.com/api/user/signup', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      
      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })
      
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}