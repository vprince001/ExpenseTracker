import { createContext } from 'react'

import AuthContextProvider from './auth-context'
import UserContextProvider from './user-context'
import ExpensesContextProvider from './expenses-context'
import CategoriesContextProvider from './categories-context'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const appInitialState = {}

  return (
    <AppContext.Provider value={appInitialState}>
      <AuthContextProvider>
        <UserContextProvider>
          <ExpensesContextProvider>
            <CategoriesContextProvider>{children}</CategoriesContextProvider>
          </ExpensesContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </AppContext.Provider>
  )
}

export default AppContextProvider
