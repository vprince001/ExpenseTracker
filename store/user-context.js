import { createContext, useReducer } from 'react'

export const UserContext = createContext({
  userData: {},
  addUserData: ({ id, selectedMonth }) => {},
  setUserData: ({ selectedMonth }) => {},
  updateUserData: ({ selectedMonth }) => {},
})

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload
    case 'SET':
      return action.payload
    case 'UPDATE':
      return action.payload
    default:
      return state
  }
}

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {})

  const addUserData = (userData) => {
    dispatch({ type: 'ADD', payload: userData })
  }

  const setUserData = (userData) => {
    dispatch({
      type: 'SET',
      payload: { ...userState, ...userData },
    })
  }

  const updateUserData = (userData) => {
    dispatch({ type: 'UPDATE', payload: { ...userState, ...userData } })
  }

  const value = {
    userData: userState,
    addUserData,
    setUserData,
    updateUserData,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
