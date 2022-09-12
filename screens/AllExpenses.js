import { useContext, useEffect, useState } from 'react'

import { ExpensesContext } from './store/expenses-context'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'

const AllExpenses = () => {
  const [isFetching, setIsFetching] = useState(true)
  const expensesCtx = useContext(ExpensesContext)

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      const expenses = await fetchExpenses()
      setIsFetching(false)
      expensesCtx.setExpenses(expenses)
    }

    getExpenses()
  }, [])

  if (isFetching) {
    return <LoadingOverlay />
  }

  return <ExpensesOutput expenses={expensesCtx.expenses} />
}

export default AllExpenses
