import { useContext, useEffect, useState } from 'react'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import MonthChoice from '../components/CategoriesOutput/MonthChoice'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

import { ExpensesContext } from '../store/expenses-context'
import { CategoriesContext } from '../store/categories-context'
import { fetchExpenses, fetchCategories } from '../util/http'
import { getMonthExpenseLookup } from '../util/expenses'
import { sortShortMonthNames } from '../util/date'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  const categoriesCtx = useContext(CategoriesContext)

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()
  const [selectedMonth, setSelectedMonth] = useState('')
  const [expensesOfSelectedMonth, setExpensesOfSelectedMonth] = useState(
    expensesCtx.expenses
  )

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
        const categories = await fetchCategories()
        categoriesCtx.setCategories(categories)
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

  const monthExpenseLookup = getMonthExpenseLookup(expensesCtx.expenses)
  const shortMonthNames = Object.keys(monthExpenseLookup)

  return (
    <>
      <MonthChoice
        months={sortShortMonthNames(shortMonthNames)}
        currentMonth={selectedMonth}
        onSelect={(currentMonth) => {
          setSelectedMonth(currentMonth)
          setExpensesOfSelectedMonth(monthExpenseLookup[currentMonth])
        }}
      />
      <ExpensesOutput expenses={expensesOfSelectedMonth} />
    </>
  )
}

export default AllExpenses
