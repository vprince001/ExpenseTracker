import { View, Text, StyleSheet } from 'react-native'

const ExpenseItem = ({ description, amount }) => {
  return (
    <>
      <View style={styles.expenseItem}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <View style={styles.seperator} />
    </>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seperator: {
    marginVertical: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
})
