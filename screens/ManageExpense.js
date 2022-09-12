import { useContext, useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../components/UI/IconButton'

import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { ExpensesContext } from './store/expenses-context'
import { GlobalStyles } from '../constants/styles'

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData)
    } else {
      expensesCtx.addExpense(expenseData)
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
