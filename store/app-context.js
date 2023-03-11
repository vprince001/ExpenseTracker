import { createContext } from 'react'

import AuthContextProvider from './auth-context'
import AppDataContextProvider from './app-data-context'
import ExpensesContextProvider from './expenses-context'
import CategoriesContextProvider from './categories-context'
import UserContextProvider from "./user-context";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const appInitialState = {}

  return (
    <AppContext.Provider value={appInitialState}>
      <AuthContextProvider>
        <AppDataContextProvider>
          <UserContextProvider>
              <ExpensesContextProvider>
                  <CategoriesContextProvider>{children}</CategoriesContextProvider>
              </ExpensesContextProvider>
          </UserContextProvider>
        </AppDataContextProvider>
      </AuthContextProvider>
    </AppContext.Provider>
  )
}

export default AppContextProvider
