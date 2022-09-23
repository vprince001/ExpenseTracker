import { useContext, useEffect, useState } from 'react'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

import { UserContext } from '../store/user-context'
import { ExpensesContext } from '../store/expenses-context'
import { CategoriesContext } from '../store/categories-context'

import { fetchExpenses, fetchCategories, fetchUserData } from '../util/http'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  const categoriesCtx = useContext(CategoriesContext)
  const userCtx = useContext(UserContext)

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const fetchDataAndSetCtx = async () => {
    const expenses = await fetchExpenses()
    expensesCtx.setExpenses(expenses)
    const categories = await fetchCategories()
    categoriesCtx.setCategories(categories)
    const userData = await fetchUserData()
    !!userData ? userCtx.setUserData(userData) : userCtx.setUserData('')
  }

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        await fetchDataAndSetCtx()
      } catch ({ message }) {
        setError(message)
      }
      setIsFetching(false)
    }

    getExpenses()
  }, [])

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        fetchDataAndSetCtx={fetchDataAndSetCtx}
        setError={setError}
        setIsFetching={setIsFetching}
      />
    )
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      fetchDataAndSetCtx={fetchDataAndSetCtx}
    />
  )
}

export default AllExpenses
