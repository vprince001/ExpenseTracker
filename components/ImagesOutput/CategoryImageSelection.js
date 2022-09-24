import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalStyles, IconNames } from '../../constants'
import IconButton from '../UI/IconButton'

const CategoryImageSelection = ({ isImageSelected, path, onPress }) => {
  const label = isImageSelected ? 'Change Image' : 'Select Image'
  const pressHandler = () => onPress(true)

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {isImageSelected ? (
        <TouchableOpacity onPress={pressHandler}>
          <Image source={path} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <IconButton
          icon={IconNames.imagePicker}
          size={100}
          color={GlobalStyles.colors.primary300}
          onPress={pressHandler}
        />
      )}
    </View>
  )
}

export default CategoryImageSelection

const styles = StyleSheet.create({
  label: { fontSize: 18 },
  image: { height: 100, width: 100, marginTop: 10 },
})
