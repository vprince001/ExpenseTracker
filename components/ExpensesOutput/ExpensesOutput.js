import { StyleSheet, View, Text } from 'react-native'

import ExpensesList from './ExpenseList'

const ExpensesOutput = ({ expenses }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  return (
    <View style={styles.container}>
      <View>
        <Text>Total Spends</Text>
        <Text>{expensesSum.toFixed(2)}</Text>
      </View>
      <ExpensesList />
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
