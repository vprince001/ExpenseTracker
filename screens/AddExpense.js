import { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import DateTimePicker from '@react-native-community/datetimepicker'

const AddExpense = () => {
  const [showCalendar, setShowCalendar] = useState(false)

  const calendarVisibilityHandler = () => setShowCalendar(true)

  return (
    <View>
      <Text>Add Expense</Text>
      <View>
        <Text>Description</Text>
        <TextInput />
      </View>
      <View>
        <View>
          <Text>Amount</Text>
          <TextInput keyboardType="decimal" />
        </View>
        <Pressable onPress={calendarVisibilityHandler}>
          <View>
            <Ionicons name="calendar" size={36} />
            <Text>{new Date().toISOString().slice(0, 10)}</Text>
          </View>
        </Pressable>
      </View>
      {showCalendar && (
        <DateTimePicker value={new Date()} onChange={() => {}} />
      )}
    </View>
  )
}

export default AddExpense
