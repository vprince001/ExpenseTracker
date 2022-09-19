import { StyleSheet, View, Text } from 'react-native'
import ChoiceItem from '../UI/ChoiceItem'
import { GlobalStyles } from '../../constants/styles'

const CategoryChoice = ({ categories, currentCategory, onSelect, invalid }) => {
  return (
    <>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        Category
      </Text>
      <View style={styles.container}>
        {categories.map((listItem) => {
          return (
            <ChoiceItem
              key={listItem.id}
              name={listItem.description}
              currentItem={currentCategory}
              onSelect={onSelect}
              invalid={invalid}
              style={{ fontSize: 18 }}
            />
          )
        })}
      </View>
    </>
  )
}

export default CategoryChoice

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error200,
  },
})
