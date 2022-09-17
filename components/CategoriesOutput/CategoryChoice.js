import { StyleSheet, View, Text, Pressable } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const ChoiceItem = ({ name, currentItem, onSelect, invalid }) => {
  return (
    <Pressable onPress={() => onSelect(name)}>
      <View
        style={[
          styles.itemView,
          name === currentItem && styles.selectedItem,
          invalid && styles.invalidItem,
        ]}
      >
        <Text style={styles.item}>{name}</Text>
      </View>
    </Pressable>
  )
}

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
              name={listItem.name}
              currentItem={currentCategory}
              onSelect={onSelect}
              invalid={invalid}
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
  itemView: {
    margin: 4,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.gray200,
  },
  item: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  selectedItem: {
    backgroundColor: GlobalStyles.colors.primary300,
  },
  invalidItem: {
    backgroundColor: GlobalStyles.colors.error100,
  },
})
