import { createContext, useReducer } from 'react'

export const UserContext = createContext({
  user: {},
  addUser: ({ email, defaultDatabaseId }) => {},
  setUser: ({ email, defaultDatabaseId }) => {},
})

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {})

  const addUser = user => {
    dispatch({ type: 'ADD', payload: user })
  }

  const setUser = user => {
    dispatch({ type: 'SET', payload: user })
  }

  const value = {
    user: userState,
    addUser,
    setUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
