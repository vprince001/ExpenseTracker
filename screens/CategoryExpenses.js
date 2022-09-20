import { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import IconButton from '../components/UI/IconButton'
import ExpensesList from '../components/ExpensesOutput/ExpenseList'

import { UserContext } from '../store/user-context'
import { ExpensesContext } from '../store/expenses-context'

import {
  getCategoryExpenseLookup,
  getMonthExpenseLookup,
} from '../util/expenses'

import { GlobalStyles, IconNames, ScreenNames } from '../constants'

const CategoryExpenses = ({ route, navigation }) => {
  const id = route.params.id
  const categoryName = route.params.description

  const expensesCtx = useContext(ExpensesContext)
  const userCtx = useContext(UserContext)
  const selectedMonth = userCtx.userData.selectedMonth

  let monthExpenses = expensesCtx.expenses
  const monthExpenseLookup = getMonthExpenseLookup(monthExpenses)
  if (selectedMonth) {
    monthExpenses = monthExpenseLookup[selectedMonth]
      ? monthExpenseLookup[selectedMonth]
      : expenses
  }

  const categoryExpenseLookup = getCategoryExpenseLookup(monthExpenses)
  const categoryExpenses = categoryExpenseLookup[categoryName]
    ? categoryExpenseLookup[categoryName]
    : []

  const navigateToManageExpenseScreen = () => {
    navigation.navigate(ScreenNames.manageCategoryScreen, {
      categoryId: id,
    })
  }

  useEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerRight: () => (
        <IconButton
          icon={IconNames.edit}
          size={36}
          color={GlobalStyles.colors.primary300}
          onPress={navigateToManageExpenseScreen}
        />
      ),
    })
  })

  return (
    <View style={styles.container}>
      <ExpensesList expenses={categoryExpenses} />
    </View>
  )
}

export default CategoryExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
})
