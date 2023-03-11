import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import MonthChoice from '../CategoriesOutput/MonthChoice'
import ExpensesList from './ExpenseList'
import ExpensesSummary from './ExpensesSummary'

import { AppDataContext } from '../../store/app-data-context'
import { getMonthExpenseLookup } from '../../util/expenses'
import { addAppData, updateAppData } from '../../util/http'
import { sortShortMonthNames } from '../../util/date'
import { GlobalStyles } from '../../constants'

const ExpensesOutput = ({ expenses, fetchDataAndSetCtx }) => {
  const appDataCtx = useContext(AppDataContext)
  const [selectedMonth, setSelectedMonth] = useState(
    appDataCtx.appData.selectedMonth
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
      if (!appDataCtx.appData.selectedMonth) {
        const id = addAppData({ selectedMonth })
        appDataCtx.addAppData({ id, selectedMonth })
      } else {
        appDataCtx.updateAppData({ selectedMonth })
        updateAppData(appDataCtx.appData.id, { selectedMonth })
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
