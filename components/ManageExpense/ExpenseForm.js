import { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import Input from '../UI/Input'
import Button from '../UI/Button'

const ExpenseForm = ({ submitButtonLabel, onSubmit }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date())

  const descriptionHandler = (description) => setDescription(description)
  const amountHandler = (amount) => setAmount(amount)
  const categoryHandler = (category) => setCategory(category)
  const dateHandler = (event, date) => {
    setDate(date)
    setShowCalendar(false)
  }
  const calendarVisibilityHandler = () => setShowCalendar(true)
  const submitHandler = () => {
    const expenseData = {
      description,
      amount: +amount,
      date: date.toISOString(),
      category,
    }

    onSubmit(expenseData)
  }

  return (
    <View>
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: descriptionHandler,
          value: description,
          placeholder: 'Expense Name',
        }}
      />
      <View style={styles.amountNCalendarView}>
        <Input
          label="Amount"
          style={styles.amountInput}
          textInputConfig={{
            onChangeText: amountHandler,
            value: amount,
            keyboardType: 'decimal-pad',
            placeholder: 'Expense Amount',
          }}
        />
        <Pressable onPress={calendarVisibilityHandler}>
          <Input
            label="Date"
            style={styles.calendarDate}
            textInputConfig={{
              value: date,
              placeholder: date.toISOString().slice(0, 10),
              editable: false,
            }}
          />
        </Pressable>
      </View>
      {showCalendar && <DateTimePicker value={date} onChange={dateHandler} />}
      <Input
        label="Category"
        textInputConfig={{
          onChangeText: categoryHandler,
          value: category,
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
