import { useState } from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

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
          style={styles.amountInput}
          invalid={!inputs.amount.isValid}
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
        invalid={!inputs.category.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'category'),
          value: inputs.category.value,
          placeholder: 'Expense Category',
        }}
      />
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error200,
  },
})
