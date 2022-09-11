import { useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../components/UI/IconButton'

import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import Button from '../components/UI/Button'

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const confirmHandler = () => {
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const deleteExpenseHandler = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" size={36} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: 'black',
    alignItems: 'center',
  },
})
