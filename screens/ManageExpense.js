import { useContext, useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../components/UI/IconButton'

import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { ExpensesContext } from './store/expenses-context'
import { GlobalStyles } from '../constants/styles'
import { storeExpense } from '../util/http'

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData)
    } else {
      const id = await storeExpense(expenseData)
      expensesCtx.addExpense({ ...expenseData, id })
    }
    navigation.goBack()
  }

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error200}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.clean,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: 'black',
    alignItems: 'center',
  },
})
