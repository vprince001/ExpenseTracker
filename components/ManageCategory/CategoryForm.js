import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import Input from '../UI/Input'
import IconButton from '../UI/IconButton'

import { GlobalStyles } from '../../constants/styles'

const CategoryForm = ({ onSubmit, defaultValues }) => {
  const navigation = useNavigation()
  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  })

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
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
    onSubmit(categoryData)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={'md-checkmark'}
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
      />
    </View>
  )
}

export default CategoryForm