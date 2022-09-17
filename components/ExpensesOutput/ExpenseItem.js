import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '../../constants/styles'
import { ScreenNames } from '../../constants/screens'

const ExpenseItem = ({ id, description, amount }) => {
  const navigation = useNavigation()

  const expensePressHandler = () => {
    navigation.navigate(ScreenNames.manageExpenseScreen, {
      expenseId: id,
    })
  }

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
  },
  seperator: {
    marginVertical: 4,
    borderBottomColor: GlobalStyles.colors.gray200,
    borderBottomWidth: 2,
  },
})
