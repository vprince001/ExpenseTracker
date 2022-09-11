import { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import DateTimePicker from '@react-native-community/datetimepicker'
import Input from '../components/UI/Input'

const AddExpense = () => {
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

  return (
    <View>
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: descriptionHandler,
          value: description,
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
          }}
        />
        <Pressable onPress={calendarVisibilityHandler}>
          <View style={styles.calendarView}>
            <Ionicons name="calendar" size={36} />
            <Text>{date.toISOString().slice(0, 10)}</Text>
          </View>
        </Pressable>
      </View>
      {showCalendar && <DateTimePicker value={date} onChange={dateHandler} />}
      <Input
        label="Category"
        textInputConfig={{
          onChangeText: categoryHandler,
          value: category,
        }}
      />
      <View>
        <Pressable onPress={() => {}}>
          <View>
            <Text>Add</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default AddExpense

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
    justifyContent: 'center',
  },
})