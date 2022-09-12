import { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'

const ExpenseForm = ({ submitButtonLabel, onSubmit, defaultValues }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [inputValues, setInputValues] = useState({
    description: defaultValues ? defaultValues.description : '',
    amount: defaultValues ? defaultValues.amount.toString() : '',
    category: defaultValues ? defaultValues.category : '',
  })
  const [date, setDate] = useState(
    defaultValues ? new Date(defaultValues.date) : new Date()
  )

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
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
      description: inputValues.description.trim(),
      amount: +inputValues.amount,
      date: new Date(date),
      category: inputValues.category,
    }

    onSubmit(expenseData)
  }

  return (
    <View>
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputValues.description,
          placeholder: 'Expense Name',
        }}
      />
      <View style={styles.amountNCalendarView}>
        <Input
          label="Amount"
          style={styles.amountInput}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
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
          value: inputValues.category,
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
})
