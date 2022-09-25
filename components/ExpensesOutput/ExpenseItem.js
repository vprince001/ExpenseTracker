import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles, ScreenNames } from '../../constants'

const ExpenseItem = ({ id, description, amount, category }) => {
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
        <View style={styles.imageAndTextView}>
          <Image source={category.image} style={styles.image} />
          <Text style={styles.text}>{description}</Text>
        </View>
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageAndTextView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  seperator: {
    marginVertical: 4,
    borderBottomColor: GlobalStyles.colors.gray200,
    borderBottomWidth: 2,
  },
})
