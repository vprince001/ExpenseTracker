import { StyleSheet, View } from 'react-native'

import { GlobalStyles } from '../../constants/styles'
import { sortShortMonthNames } from '../../util/date'
import { getMonthExpenseLookup } from '../../util/expenses'
import MonthChoice from '../CategoriesOutput/MonthChoice'
import ExpensesList from './ExpenseList'
import ExpensesSummary from './ExpensesSummary'

const ExpensesOutput = ({ expenses, selectedMonth, onMonthSelection }) => {
  let filteredExpenses = expenses
  const monthExpenseLookup = getMonthExpenseLookup(expenses)
  if (selectedMonth) {
    filteredExpenses = monthExpenseLookup[selectedMonth] ? monthExpenseLookup[selectedMonth] : expenses
  }

  const shortMonthNames = Object.keys(monthExpenseLookup)

  return (
    <View style={styles.container}>
      <MonthChoice
        months={sortShortMonthNames(shortMonthNames)}
        currentMonth={selectedMonth}
        onSelect={(currentMonth) => onMonthSelection(currentMonth)}
      />
      <ExpensesSummary expenses={filteredExpenses} />
      <ExpensesList expenses={filteredExpenses} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
})
