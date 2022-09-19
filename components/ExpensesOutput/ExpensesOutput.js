import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import MonthChoice from '../CategoriesOutput/MonthChoice'
import ExpensesList from './ExpenseList'
import ExpensesSummary from './ExpensesSummary'

import { UserContext } from '../../store/user-context'
import { getMonthExpenseLookup } from '../../util/expenses'
import { addUserData } from '../../util/http'
import { sortShortMonthNames } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ({ expenses }) => {
  const userCtx = useContext(UserContext)
  const [selectedMonth, setSelectedMonth] = useState('')

  let filteredExpenses = expenses
  const monthExpenseLookup = getMonthExpenseLookup(expenses)
  if (selectedMonth) {
    filteredExpenses = monthExpenseLookup[selectedMonth]
      ? monthExpenseLookup[selectedMonth]
      : expenses
  }

  const shortMonthNames = Object.keys(monthExpenseLookup)

  const monthSelectionHandler = async (selectedMonth) => {
    try {
      setSelectedMonth(selectedMonth)
      const id = await addUserData({ selectedMonth })
      userCtx.addUserData({ selectedMonth, id })
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <MonthChoice
        months={sortShortMonthNames(shortMonthNames)}
        currentMonth={selectedMonth}
        onSelect={monthSelectionHandler}
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
