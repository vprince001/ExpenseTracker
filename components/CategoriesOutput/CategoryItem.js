import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames, GlobalStyles } from '../../constants'

const CategoryItem = ({ id, description }) => {
  const navigation = useNavigation()

  const categoryPressHandler = () => {
    navigation.navigate(ScreenNames.categoryExpensesScreen, { id, description })
  }

  return (
    <Pressable
      onPress={categoryPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.categoryItem}>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View style={styles.seperator} />
    </Pressable>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.35,
  },
  categoryItem: {
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
    borderBottomColor: GlobalStyles.colors.gray200,
    borderBottomWidth: 2,
  },
})
