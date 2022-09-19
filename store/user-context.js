import { createContext, useReducer } from 'react'

export const UserContext = createContext({
  userData: {},
  addUserData: ({ selectedMonth }) => {},
})

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
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

  const value = {
    userData: userState,
    addUserData,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
