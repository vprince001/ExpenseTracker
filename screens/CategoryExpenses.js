import { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import IconButton from '../components/UI/IconButton'

import { UserContext } from '../store/user-context'
import { ExpensesContext } from '../store/expenses-context'

import { GlobalStyles, IconNames, ScreenNames } from '../constants'
import CategoryExpensesOutput from '../components/CategoryExpensesOutput/CategoryExpensesOutput'

const CategoryExpenses = ({ route, navigation }) => {
  const { id: categoryId, description: categoryName } = route.params

  const expensesCtx = useContext(ExpensesContext)
  const userCtx = useContext(UserContext)

  const navigateToManageCategoryScreen = () => {
    navigation.navigate(ScreenNames.manageCategoryScreen, {
      categoryId,
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
          onPress={navigateToManageCategoryScreen}
        />
      ),
    })
  })

  return (
    <CategoryExpensesOutput
      categoryName={categoryName}
      expenses={expensesCtx.expenses}
      selectedMonth={userCtx.userData.selectedMonth}
    />
  )
}

export default CategoryExpenses
