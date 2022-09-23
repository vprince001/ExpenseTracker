import { StyleSheet, View } from 'react-native'

import CategoryExpensesSummary from '../ExpensesOutput/ExpensesSummary'
import CategoryExpensesList from './CategoryExpensesList'

import { GlobalStyles } from '../../constants'
import { getCategoryExpenseLookup, getMonthExpenseLookup } from '../../util/expenses'

const CategoryExpensesOutput = ({ categoryName, expenses, selectedMonth }) => {
  const monthExpenseLookup = getMonthExpenseLookup(expenses)
  let monthExpenses = []
  if (selectedMonth) {
    monthExpenses = monthExpenseLookup[selectedMonth]
      ? monthExpenseLookup[selectedMonth]
      : expenses
  }

  const categoryExpenseLookup = getCategoryExpenseLookup(monthExpenses)
  const categoryExpenses = categoryExpenseLookup[categoryName]
    ? categoryExpenseLookup[categoryName]
    : []

  return (
    <View style={styles.container}>
      <CategoryExpensesSummary expenses={categoryExpenses} />
      <CategoryExpensesList expenses={categoryExpenses} />
    </View>
  )
}

export default CategoryExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
})
