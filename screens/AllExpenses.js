import { useContext, useEffect, useState } from 'react'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

import { AppDataContext } from '../store/app-data-context'
import { ExpensesContext } from '../store/expenses-context'
import { CategoriesContext } from '../store/categories-context'

import { fetchExpenses, fetchCategories, fetchAppData } from '../util/http'
import {UserDataContext} from "../store/user-data-context";

const AllExpenses = () => {
  const userDataCtx = useContext(UserDataContext)
  const expensesCtx = useContext(ExpensesContext)
  const categoriesCtx = useContext(CategoriesContext)
  const appDataCtx = useContext(AppDataContext)

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const fetchDataAndSetCtx = async () => {
    const expenses = await fetchExpenses(userDataCtx.userData.defaultDatabaseId)
    expensesCtx.setExpenses(expenses)
    const categories = await fetchCategories()
    categoriesCtx.setCategories(categories)
    const appData = await fetchAppData()
    !!appData ? appDataCtx.setAppData(appData) : appDataCtx.setAppData('')
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
