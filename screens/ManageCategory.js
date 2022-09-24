import { useContext, useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import IconButton from '../components/UI/IconButton'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import ConfirmationModal from '../components/UI/ConfirmationModal'
import CategoryForm from '../components/ManageForms/CategoryForm'

import { ExpensesContext } from '../store/expenses-context'
import { CategoriesContext } from '../store/categories-context'

import CategoryImageSelection from '../components/ImagesOutput/CategoryImageSelection'
import ImageModal from '../components/ImagesOutput/ImageModal'

import {
  addCategory,
  updateCategory,
  deleteCategory,
  updateExpenses,
} from '../util/http'
import { GlobalStyles, IconNames } from '../constants'

const ManageCategory = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState()
  const [showImages, setShowImages] = useState(false)
  const [imagePath, setImagePath] = useState()
  const [error, setError] = useState()

  const categoriesCtx = useContext(CategoriesContext)
  const expenseCtx = useContext(ExpensesContext)
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
        expenseCtx.updateExpenses(editedCategoryId, categoryData)
        updateExpenses(editedCategoryId, categoryData, expenseCtx.expenses)
      } else {
        const id = await addCategory(categoryData)
        categoriesCtx.addCategory({ ...categoryData, id })
      }
      navigation.popToTop()
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
      navigation.popToTop()
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
        categories={categoriesCtx.categories}
      />
      <CategoryImageSelection
        isImageSelected={!!selectedImage}
        path={imagePath}
        onPress={setShowImages}
      />
      {showImages ? (
        <ImageModal
          visible={showImages}
          closeModal={() => setShowImages(false)}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setPath={setImagePath}
        />
      ) : null}
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
      <ConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirmation={deleteExpenseHandler}
      />
    </View>
  )
}

export default ManageCategory

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
