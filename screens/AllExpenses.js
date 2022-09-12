import { useContext } from 'react'

import { ExpensesContext } from './store/expenses-context'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  return <ExpensesOutput expenses={expensesCtx.expenses} />
}

export default AllExpenses
