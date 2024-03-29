import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import Input from '../UI/Input'
import IconButton from '../UI/IconButton'
import CategoryImageSelection from '../ImagesOutput/CategoryImageSelection'

import { GlobalStyles, IconNames } from '../../constants'

const CategoryForm = ({ onSubmit, defaultValues, categories }) => {
  const navigation = useNavigation()
  const [categoryExists, setCategoryExists] = useState(false)

  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    image: {
      value: defaultValues ? defaultValues.image : '',
      isValid: true,
    },
  })

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setCategoryExists(false)
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
      image: inputs.image.value,
    }

    const descriptionIsValid = categoryData.description.length > 0
    const imageIsSelected = !!categoryData.image

    if (!descriptionIsValid || !imageIsSelected) {
      setInputs((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          image: {
            value: curInputs.image.value,
            isValid: imageIsSelected,
          },
        }
      })
      return
    }

    const categoryWithSameName = categories.filter(
      (category) =>
        category.description.toLowerCase() ===
        categoryData.description.toLowerCase()
    )[0]

    if (categoryWithSameName && categoryWithSameName.id !== defaultValues?.id) {
      setCategoryExists(true)
      setInputs((curInputs) => {
        return {
          ...curInputs,
          description: { ...curInputs.description, isValid: categoryExists },
        }
      })
      return
    }

    onSubmit(categoryData)
  }

  const getClearButtonConfig = (attribute) => ({
    icon: IconNames.clear,
    size: 36,
    color: GlobalStyles.colors.gray300,
    onPress: () => {
      setInputs((curInputs) => {
        return {
          ...curInputs,
          [attribute]: { value: '', isValid: true },
        }
      })
    },
  })

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={IconNames.checkmark}
          size={36}
          color={GlobalStyles.colors.primary600}
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
        buttonConfig={getClearButtonConfig('description')}
      />
      {categoryExists ? (
        <Text style={styles.errorMsgText}>This category already exists</Text>
      ) : null}
      <CategoryImageSelection
        path={inputs.image.value}
        setPath={inputChangedHandler.bind(this, 'image')}
        invalid={!inputs.image.isValid}
      />
    </View>
  )
}

export default CategoryForm

const styles = StyleSheet.create({
  errorMsgText: {
    fontSize: 16,
    color: GlobalStyles.colors.error200,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
})
