import { createContext, useState } from 'react'

export const AuthContext = createContext({
  token: '',
  isAthenticated: false,
  authenticate: () => {},
  logout: () => {},
})

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState()

  const authenticate = (token) => {
      setAuthToken(token)
      console.log('authenticate token', token)
  }

  const logout = () => {
    setAuthToken(null)
  }

  const value = {
    token: authToken,
    isAthenticated: !!authToken,
    authenticate,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
