import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, category, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, category, date }) => {},
  deleteExpense: (id) => {},
})

const expensesReducer = (state, action) => {
  const expenses = state.expenses

  switch (action.type) {
    case 'SET':
      return { ...state, expenses: action.payload.reverse() }

    case 'ADD':
      return { ...state, expenses: [{ ...action.payload }, ...expenses] }

    case 'UPDATE':
      const updatableExpenseIndex = expenses.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = expenses[updatableExpenseIndex]
      const updatedExpense = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...expenses]
      updatedExpenses[updatableExpenseIndex] = updatedExpense
      return { ...state, expenses: updatedExpenses }

    case 'DELETE':
      const expensesAfterDelete = expenses.filter(
        (expense) => expense.id !== action.payload.id
      )
      return { ...state, expenses: expensesAfterDelete }

    default:
      return state
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, {})

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses })
  }

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: { id } })
  }

  const value = {
    expenses: expensesState.expenses,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
