import { useContext, useEffect } from 'react'

import IconButton from '../components/UI/IconButton'
import CategoryExpensesOutput from '../components/CategoryExpensesOutput/CategoryExpensesOutput'

import { AppDataContext } from '../store/app-data-context'
import { ExpensesContext } from '../store/expenses-context'

import { ellipsize } from '../util/helperFunctions'
import { GlobalStyles, IconNames, ScreenNames } from '../constants'

const CategoryExpenses = ({ route, navigation }) => {
  const { id: categoryId, description: categoryName } = route.params

  const expensesCtx = useContext(ExpensesContext)
  const appDataCtx = useContext(AppDataContext)

  const navigateToManageCategoryScreen = () => {
    navigation.navigate(ScreenNames.manageCategoryScreen, {
      categoryId,
    })
  }

  useEffect(() => {
    navigation.setOptions({
      title: ellipsize(categoryName, 22),
      headerRight: () => (
        <IconButton
          icon={IconNames.edit}
          size={36}
          color={GlobalStyles.colors.primary600}
          onPress={navigateToManageCategoryScreen}
        />
      ),
    })
  })

  return (
    <CategoryExpensesOutput
      categoryName={categoryName}
      expenses={expensesCtx.expenses}
      selectedMonth={appDataCtx.appData.selectedMonth}
    />
  )
}

export default CategoryExpenses
