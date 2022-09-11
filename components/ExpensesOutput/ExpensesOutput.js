import { StyleSheet, View } from 'react-native'

import ExpensesList from './ExpenseList'
import ExpensesSummary from './ExpensesSummary'

const ExpensesOutput = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
})
