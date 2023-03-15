import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, category, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, category, date }) => {},
  updateExpenses: (categoryId, categoryData) => {},
  deleteExpense: (id) => {},
})

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.payload }, ...state]

    case 'SET':
      const inverted = action.payload.reverse()
      return inverted

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedExpense = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedExpense
      return updatedExpenses

    case 'UPDATE_EXPENSES':
      return state.map((expense) => {
        const { categoryId, categoryData } = action.payload

        if (expense.category.id === categoryId) {
          return { ...expense, category: { ...categoryData, id: categoryId } }
        }
        return expense
      })

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)

    default:
      return state
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses })
  }

  const updateExpense = (id, categoryData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: categoryData } })
  }

  const updateExpenses = (categoryId, categoryData) => {
    dispatch({
      type: 'UPDATE_EXPENSES',
      payload: { categoryId, categoryData },
    })
  }

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    updateExpense,
    updateExpenses,
    deleteExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
