import { useState } from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'

const ExpenseForm = ({ submitButtonLabel, onSubmit, defaultValues }) => {
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
  }

  const calendarVisibilityHandler = () => setShowCalendar(true)

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
          category: { value: curInputs.category.value, isValid: categoryIsValid },
        }
      })
      return
    }
    onSubmit(expenseData)
  }

  const formIsInvalid =
    !inputs.description.isValid ||
    !inputs.amount.isValid ||
    !inputs.category.isValid

  return (
    <View>
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
          placeholder: 'Expense Name',
        }}
      />
      <View style={styles.amountNCalendarView}>
        <Input
          label="Amount"
          style={styles.amountInput}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
            keyboardType: 'decimal-pad',
            placeholder: 'Expense Amount',
          }}
        />
        <Pressable onPress={calendarVisibilityHandler}>
          <Input
            label="Date"
            style={styles.calendarDate}
            textInputConfig={{
              placeholder: getFormattedDate(date),
              editable: false,
            }}
          />
        </Pressable>
      </View>
      {showCalendar && <DateTimePicker value={date} onChange={dateHandler} />}
      <Input
        label="Category"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'category'),
          value: inputs.category.value,
          placeholder: 'Expense Category',
        }}
      />
      {formIsInvalid && (
        <Text>Invalid input values - please check your entered data!</Text>
      )}
      <View>
        <Button onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  amountNCalendarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountInput: {
    flex: 1,
  },
  calendarView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarDate: {
    fontSize: 18,
  },
})
