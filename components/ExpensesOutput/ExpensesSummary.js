import { StyleSheet, View, Text } from 'react-native'

const ExpensesSummary = ({ expenses }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total Spends</Text>
      <Text style={styles.text}>{expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
