import { createContext, useReducer } from "react";

// create a context
export const WorkoutsContext = createContext();

// define what context can do
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { workouts: action.payload }
    case 'CREATE_WORKOUTS':
      return { workouts: [ action.payload, ...state.workouts ] }
    case 'DELETE_WORKOUT':
      return { workouts: state.workouts.filter((workout)=> workout._id !== action.payload._id) }
    default:
      return state
  }
}

// define init context and how to render context 
export const WorkoutsContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(workoutsReducer, {
    workouts: null
  }) 

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}