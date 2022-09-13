import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext()
  const { dispatch: workDispatch } = useWorkoutsContext()
  
  const logout = () => {
    // remove user from local storage
    localStorage.removeItem('user')

    // clear user info in context
    authDispatch({ type: 'LOGOUT' })
    workDispatch({ type: 'SET_WORKOUTS', payload: null })
  }
  
  return { logout }
}