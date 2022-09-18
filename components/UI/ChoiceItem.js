import { Pressable, View, Text, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const ChoiceItem = ({ name, currentItem, onSelect, invalid }) => {
  const isSelected = name === currentItem
  return (
    <Pressable onPress={() => onSelect(name)}>
      <View
        style={[
          styles.container,
          isSelected && styles.selectedItem,
          invalid && styles.invalidItem,
        ]}
      >
        <Text style={[styles.item, isSelected && styles.selectedItemText]}>{name}</Text>
      </View>
    </Pressable>
  )
}

export default ChoiceItem

const styles = StyleSheet.create({
  container: {
    margin: 4,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.gray200,
  },
  item: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 15,
  },
  selectedItem: {
    backgroundColor: GlobalStyles.colors.primary300,
  },
  selectedItemText: {
    color: GlobalStyles.colors.white,
    fontWeight: '500',
  },
  invalidItem: {
    backgroundColor: GlobalStyles.colors.error100,
  },
})
