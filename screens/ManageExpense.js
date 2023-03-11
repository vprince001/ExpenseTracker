import { useContext, useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import IconButton from '../components/UI/IconButton'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import ConfirmationModal from '../components/UI/ConfirmationModal'
import ExpenseForm from '../components/ManageForms/ExpenseForm'

import { ExpensesContext } from '../store/expenses-context'
import { UserContext } from "../store/user-context";
import { addExpense, deleteExpense, updateExpense } from '../util/http'
import { GlobalStyles, IconNames } from '../constants'

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)
  const userCtx = useContext(UserContext)
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

  const confirmHandler = (expenseData) => {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        updateExpense(editedExpenseId, expenseData, userCtx.user.defaultDatabaseId)
      } else {
        const id = addExpense(expenseData, userCtx.user.defaultDatabaseId)
        expensesCtx.addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError('Could not save data - please try again later!')
      setIsSubmitting(false)
    }
  }

  const deleteExpenseHandler = () => {
    setIsSubmitting(true)
    try {
      deleteExpense(editedExpenseId, userCtx.user.defaultDatabaseId)
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete expense - please try again later!')
      setIsSubmitting(false)
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={confirmHandler} defaultValues={selectedExpense} />
      <ConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirmation={deleteExpenseHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={IconNames.trash}
            size={36}
            color={GlobalStyles.colors.error200}
            onPress={() => setModalVisible(true)}
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
    backgroundColor: GlobalStyles.colors.white,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.black,
    alignItems: 'center',
  },
})
