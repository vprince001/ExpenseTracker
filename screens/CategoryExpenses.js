import { useContext, useEffect } from 'react'

import IconButton from '../components/UI/IconButton'
import CategoryExpensesOutput from '../components/CategoryExpensesOutput/CategoryExpensesOutput'

import { UserContext } from '../store/user-context'
import { ExpensesContext } from '../store/expenses-context'

import { ellipsize } from '../util/helperFunctions'
import { GlobalStyles, IconNames, ScreenNames } from '../constants'

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
      title: ellipsize(categoryName, 22),
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
