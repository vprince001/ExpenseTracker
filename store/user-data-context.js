import { createContext, useReducer } from 'react'

export const UserDataContext = createContext({
  userData: {},
  addUserData: ({ id, selectedMonth }) => {},
  setUserData: ({ email, defaultDatabaseId }) => {},
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

const UserDataContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {})

  const addUserData = (userData) => {
    dispatch({ type: 'ADD', payload: userData })
  }

  const setUserData = (userData) => {
    dispatch({ type: 'SET', payload: userData })
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

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}

export default UserDataContextProvider
