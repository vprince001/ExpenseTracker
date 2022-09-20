import { useContext, useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import IconButton from '../components/UI/IconButton'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import CategoryForm from '../components/ManageCategory/CategoryForm'

import { CategoriesContext } from '../store/categories-context'
import { addCategory, updateCategory, deleteCategory } from '../util/http'
import { GlobalStyles, IconNames } from '../constants'

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  const categoriesCtx = useContext(CategoriesContext)
  const editedCategoryId = route.params?.categoryId
  const isEditing = !!editedCategoryId

  const selectedCategory = categoriesCtx.categories.find(
    (category) => category.id === editedCategoryId
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Category' : 'Add Category',
    })
  }, [navigation, isEditing])

  const confirmHandler = async (categoryData) => {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        categoriesCtx.updateCategory(editedCategoryId, categoryData)
        await updateCategory(editedCategoryId, categoryData)
      } else {
        const id = await addCategory(categoryData)
        categoriesCtx.addCategory({ ...categoryData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError('Could not save data - please try again later!')
      setIsSubmitting(false)
    }
  }

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true)
    try {
      await deleteCategory(editedCategoryId)
      categoriesCtx.deleteCategory(editedCategoryId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete category - please try again later!')
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
      <CategoryForm
        onSubmit={confirmHandler}
        defaultValues={selectedCategory}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={IconNames.trash}
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
