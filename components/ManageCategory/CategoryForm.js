import { useState } from 'react'
import { View } from 'react-native'

import Input from '../UI/Input'
import Button from '../UI/Button'

const CategoryForm = ({ submitButtonLabel, onSubmit, defaultValues }) => {
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
      <View>
        <Button onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

export default CategoryForm