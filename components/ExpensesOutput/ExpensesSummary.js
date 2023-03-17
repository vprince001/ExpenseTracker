import { StyleSheet, View, Text } from 'react-native'
import { GlobalStyles } from '../../constants'

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
    borderColor: GlobalStyles.colors.primary200,
    borderWidth: 2,
    borderRadius: 5,
    margin: 8,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary600,
  },
})
