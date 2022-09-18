import { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Pressable, StyleSheet, Keyboard } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import Input from '../UI/Input'
import IconButton from '../UI/IconButton'
import CategoryChoice from '../CategoriesOutput/CategoryChoice'

import { CategoriesContext } from '../../store/categories-context'
import { getFormattedDate } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

const ExpenseForm = ({ onSubmit, defaultValues }) => {
  const navigation = useNavigation()
  const categoriesCtx = useContext(CategoriesContext)
  const [showCalendar, setShowCalendar] = useState(false)
  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    category: {
      value: defaultValues ? defaultValues.category : '',
      isValid: true,
    },
  })
  const [date, setDate] = useState(
    defaultValues ? new Date(defaultValues.date) : new Date()
  )

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })
  }

  const dateHandler = (event, date) => {
    setShowCalendar(false)
    setDate(date)
    Keyboard.dismiss()
  }

  const calendarVisibilityHandler = () => {
    setShowCalendar(true)
    Keyboard.dismiss()
  }

  const submitHandler = () => {
    const expenseData = {
      description: inputs.description.value.trim(),
      amount: +inputs.amount.value,
      date: new Date(date),
      category: inputs.category.value.trim(),
    }

    const descriptionIsValid = expenseData.description.length > 0
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const categoryIsValid = expenseData.category.length > 0

    if (!descriptionIsValid || !amountIsValid || !categoryIsValid) {
      setInputs((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          category: {
            value: curInputs.category.value,
            isValid: categoryIsValid,
          },
        }
      })
      return
    }
    onSubmit(expenseData)
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
          placeholder: 'Expense Name',
        }}
      />
      <View style={styles.amountNCalendarView}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          inputDirection='row'
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
            keyboardType: 'decimal-pad',
            placeholder: '0.00',
          }}
        />
        <Pressable onPress={calendarVisibilityHandler}>
          <Input
            label="Date"
            textInputConfig={{
              value: getFormattedDate(date),
              editable: false,
              color: GlobalStyles.colors.black,
            }}
          />
        </Pressable>
      </View>
      {showCalendar && <DateTimePicker value={date} onChange={dateHandler} />}
      <CategoryChoice
        categories={categoriesCtx.categories}
        invalid={!inputs.category.isValid}
        currentCategory={inputs.category.value}
        onSelect={(currentCategory) => {
          setInputs((curInputs) => {
            return {
              ...curInputs,
              category: { value: currentCategory, isValid: true },
            }
          })
          Keyboard.dismiss()
        }}
      />
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  amountNCalendarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
