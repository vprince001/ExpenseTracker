import { View, Text, StyleSheet, Pressable } from 'react-native'

const ExpenseItem = ({ description, amount }) => {
  const expensePressHandler = () => {}

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{amount.toFixed(2)}</Text>
      </View>
      <View style={styles.seperator} />
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.35,
  },
  expenseItem: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seperator: {
    marginVertical: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
})
