import { createContext, useReducer } from 'react'

import { EXPENSES } from '../../util/data'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, category, date }) => {},
  updateExpense: (id, { description, amount, category, date }) => {},
  deleteExpense: (id) => {},
})

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id }, ...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedExpense = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedExpense
      return updatedExpenses

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload.id)
    default:
      return state
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, EXPENSES)

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: { id } })
  }

  const value = { expenses, addExpense, updateExpense, deleteExpense }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
