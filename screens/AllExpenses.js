import { useContext, useEffect, useState } from 'react'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

import { ExpensesContext } from '../store/expenses-context'
import { CategoriesContext } from '../store/categories-context'

import { fetchExpenses, fetchCategories, fetchUserData } from '../util/http'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  const categoriesCtx = useContext(CategoriesContext)

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
        const categories = await fetchCategories()
        categoriesCtx.setCategories(categories)
        await fetchUserData()
      } catch (error) {
        setError('Could not fetch data!')
      }
      setIsFetching(false)
    }

    getExpenses()
  }, [])

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return <ExpensesOutput expenses={expensesCtx.expenses} />
}

export default AllExpenses
