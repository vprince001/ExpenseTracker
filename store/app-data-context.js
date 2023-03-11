import { createContext, useReducer } from 'react'

export const AppDataContext = createContext({
  appData: {},
  addAppData: ({ id, selectedMonth }) => {},
  setAppData: ({ id, selectedMonth }) => {},
  updateAppData: ({ selectedMonth }) => {},
})

const appDataReducer = (state, action) => {
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

const AppDataContextProvider = ({ children }) => {
  const [appDataState, dispatch] = useReducer(appDataReducer, {})

  const addAppData = (appData) => {
    dispatch({ type: 'ADD', payload: appData })
  }

  const setAppData = (appData) => {
    dispatch({ type: 'SET', payload: appData })
  }

  const updateAppData = (appData) => {
    dispatch({ type: 'UPDATE', payload: { ...appDataState, ...appData } })
  }

  const value = {
    appDataState,
    addAppData,
    setAppData,
    updateAppData,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export default AppDataContextProvider
