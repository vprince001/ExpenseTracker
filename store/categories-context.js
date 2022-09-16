import { createContext, useReducer } from 'react'

export const CategoriesContext = createContext({
  categories: [],
  addCategory: ({ description }) => {},
  setCategories: (categories) => {},
  updateCategory: (id, { description }) => {},
  deleteCategory: (id) => {},
})

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.payload }, ...state]

    case 'SET':
      return action.payload

    case 'UPDATE':
      const updatableCategoryIndex = state.findIndex(
        (category) => category.id === action.payload.id
      )
      const updatableCategory = state[updatableCategoryIndex]
      const updatedCategory = { ...updatableCategory, ...action.payload.data }
      const updatedCategories = [...state]
      updatedCategories[updatableCategoryIndex] = updatedCategory
      return updatedCategories

    case 'DELETE':
      return state.filter((category) => category.id !== action.payload.id)
    default:
      return state
  }
}

const CategoriesContextProvider = ({ children }) => {
  const [categoriesState, dispatch] = useReducer(categoriesReducer, [])

  const addCategory = (categoryData) => {
    dispatch({ type: 'ADD', payload: categoryData })
  }

  const setCategories = (categories) => {
    dispatch({ type: 'SET', payload: categories })
  }

  const updateCategory = (id, categoryData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: categoryData } })
  }

  const deleteCategory = (id) => {
    dispatch({ type: 'DELETE', payload: { id } })
  }

  const value = {
    categories: categoriesState,
    addCategory,
    setCategories,
    updateCategory,
    deleteCategory,
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesContextProvider
