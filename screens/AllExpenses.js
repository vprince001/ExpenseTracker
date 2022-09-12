import { useContext, useEffect } from 'react'

import { ExpensesContext } from './store/expenses-context'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { fetchExpenses } from '../util/http'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses()
      expensesCtx.setExpenses(expenses)
    }

    getExpenses()
  }, [])
  return <ExpensesOutput expenses={expensesCtx.expenses} />
}

export default AllExpenses
