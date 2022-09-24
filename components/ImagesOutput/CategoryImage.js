import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../constants'

const CategoryImage = ({ path, setPath, isSelectedImage }) => {
  return (
    <TouchableOpacity
      onPress={() => setPath(path)}
      style={[styles.container, isSelectedImage && styles.selectedImage]}
    >
      <Image source={path} style={styles.image} />
    </TouchableOpacity>
  )
}

export default CategoryImage

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: { height: 70, width: 70 },
  selectedImage: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary300,
  },
})
