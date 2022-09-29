import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import MonthChoice from '../CategoriesOutput/MonthChoice'
import ExpensesList from './ExpenseList'
import ExpensesSummary from './ExpensesSummary'

import { UserContext } from '../../store/user-context'
import { getMonthExpenseLookup } from '../../util/expenses'
import { addUserData, updateUserData } from '../../util/http'
import { sortShortMonthNames } from '../../util/date'
import { GlobalStyles } from '../../constants'

const ExpensesOutput = ({ expenses, fetchDataAndSetCtx }) => {
  const userCtx = useContext(UserContext)
  const [selectedMonth, setSelectedMonth] = useState(
    userCtx.userData.selectedMonth
  )

  let filteredExpenses = expenses
  const monthExpenseLookup = getMonthExpenseLookup(expenses)
  if (selectedMonth) {
    filteredExpenses = monthExpenseLookup[selectedMonth]
      ? monthExpenseLookup[selectedMonth]
      : expenses
  }

  const shortMonthNames = Object.keys(monthExpenseLookup)

  const monthSelectionHandler = (selectedMonth) => {
    try {
      setSelectedMonth(selectedMonth)
      if (!userCtx.userData.selectedMonth) {
        const id = addUserData({ selectedMonth })
        userCtx.addUserData({ id, selectedMonth })
      } else {
        userCtx.updateUserData({ selectedMonth })
        updateUserData(userCtx.userData.id, { selectedMonth })
      }
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      {shortMonthNames.length > 1 ? (
        <MonthChoice
          months={sortShortMonthNames(shortMonthNames)}
          currentMonth={selectedMonth}
          onSelect={monthSelectionHandler}
        />
      ) : null}
      <ExpensesSummary expenses={filteredExpenses} />
      <ExpensesList
        expenses={filteredExpenses}
        fetchDataAndSetCtx={fetchDataAndSetCtx}
      />
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
