import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import Input from '../UI/Input'
import IconButton from '../UI/IconButton'

import { GlobalStyles, IconNames } from '../../constants'

const CategoryForm = ({ onSubmit, defaultValues, categories }) => {
  const navigation = useNavigation()
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  })

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setShowErrorMessage(false)
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })
  }

  const submitHandler = () => {
    const categoryData = {
      description: inputs.description.value.trim(),
    }

    const descriptionIsValid = categoryData.description.length > 0

    if (!descriptionIsValid) {
      setInputs((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        }
      })
      return
    }

    const categoryWithSameName = categories.filter(
      (category) =>
        category.description.toLowerCase() ===
        categoryData.description.toLowerCase()
    )

    const categoryExists = categoryWithSameName.length > 0
    if (categoryExists) {
      setShowErrorMessage(true)
      return
    }

    onSubmit(categoryData)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={IconNames.checkamrk}
          size={36}
          color={GlobalStyles.colors.primary300}
          onPress={submitHandler}
        />
      ),
    })
  })

  return (
    <View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
          placeholder: 'Category Name',
        }}
        buttonConfig={{
          icon: IconNames.clear,
          size: 36,
          color: GlobalStyles.colors.gray300,
          onPress: () => {
            setInputs((curInputs) => {
              return {
                ...curInputs,
                description: { value: '', isValid: true },
              }
            })
          },
        }}
      />
      {showErrorMessage ? (
        <View style={styles.errorMsgContainer}>
          <Text style={styles.errorMsgText}>
            Category With Same Name Already Exists
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export default CategoryForm

const styles = StyleSheet.create({
  errorMsgContainer: {
    alignItems: 'center',
  },
  errorMsgText: {
    fontSize: 16,
    color: GlobalStyles.colors.error200,
    fontWeight: 'bold',
  },
})
