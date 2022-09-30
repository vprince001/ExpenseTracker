import { StyleSheet, View, Text, ScrollView } from 'react-native'
import ChoiceItem from '../UI/ChoiceItem'
import { GlobalStyles } from '../../constants'

const CategoryChoice = ({ categories, currentCategory, onSelect, invalid }) => {
  return (
    <>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        Choose Category
      </Text>
      <ScrollView>
        <View style={styles.container}>
          {categories.map((listItem) => {
            return (
              <ChoiceItem
                key={listItem.id}
                item={listItem}
                name={listItem.description}
                image={listItem.image}
                isSelected={listItem.id === currentCategory.id}
                onSelect={onSelect}
                invalid={invalid}
                style={{ fontSize: 16 }}
              />
            )
          })}
        </View>
      </ScrollView>
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
