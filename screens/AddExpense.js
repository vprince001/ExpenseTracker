import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import DateTimePicker from '@react-native-community/datetimepicker'
import Input from '../components/UI/Input'

const AddExpense = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  const descriptionHandler = (description) => setDescription(description)
  const amountHandler = (amount) => setAmount(amount)
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
      <View>
        <Input
          label="Amount"
          textInputConfig={{
            onChangeText: amountHandler,
            value: amount,
            keyboardType: 'decimal-pad',
          }}
        />
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
      <View>
        <Pressable>
          <View>
            <Text>Add</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default AddExpense
