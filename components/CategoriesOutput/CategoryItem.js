import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants'

const CategoryItem = ({ id, description, image }) => {
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
        <Image source={image} style={styles.image} />
        <Text ellipsizeMode="tail" numberOfLines={3} style={styles.text}>
          {description}
        </Text>
      </View>
    </Pressable>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.35,
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    maxWidth: 120,
  },
  image: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
})
