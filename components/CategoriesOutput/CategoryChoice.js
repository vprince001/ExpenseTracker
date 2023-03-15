import { StyleSheet, View, Text, ScrollView } from 'react-native'
import ChoiceItem from '../UI/ChoiceItem'
import { GlobalStyles } from '../../constants'

const CategoryChoice = ({ categories, currentCategoryId, onSelect, invalid }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        Choose Category
      </Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        persistentScrollbar
      >
        <View style={styles.categories}>
          {categories.map((category) => {
            return (
              <ChoiceItem
                key={category.id}
                item={category}
                name={category.description}
                image={category.image}
                isSelected={category.id === currentCategoryId}
                onSelect={onSelect}
                invalid={invalid}
                style={{ fontSize: 16 }}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default CategoryChoice

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flex: 1,
  },
  categories: {
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
