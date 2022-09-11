import { StyleSheet, View } from 'react-native'

import ExpensesList from './ExpenseList'
import ExpensesSummary from './ExpensesSummary'

const ExpensesOutput = ({ expenses }) => {
  return (
    <View>
      <ExpensesSummary expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  )
}

export default ExpensesOutput
