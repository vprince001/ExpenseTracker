import { Pressable, View, Text, StyleSheet, Image } from 'react-native'
import { GlobalStyles } from '../../constants'

const ChoiceItem = ({
  name,
  image,
  item,
  onSelect,
  invalid,
  isSelected,
  style,
}) => {
  return (
    <Pressable onPress={() => onSelect(item)}>
      <View
        style={[
          styles.container,
          isSelected && styles.selectedItem,
          invalid && styles.invalidItem,
        ]}
      >
        {image && <Image source={image} style={styles.image} />}
        <Text
          style={[
            styles.item,
            style && { ...style },
            isSelected && styles.selectedItemText,
          ]}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  )
}

export default ChoiceItem

const styles = StyleSheet.create({
  container: {
    margin: 4,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: GlobalStyles.colors.gray200,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  item: {
    fontSize: 15,
  },
  image: {
    height: 30,
    width: 30,
    paddingTop: 8,
    marginRight: 5,
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
