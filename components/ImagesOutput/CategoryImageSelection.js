import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import IconButton from '../UI/IconButton'
import ImageModal from './ImageModal'

import { GlobalStyles, IconNames } from '../../constants'

const CategoryImageSelection = ({ path, setPath, invalid }) => {
  const [showImages, setShowImages] = useState()
  const label = path ? 'Change Image' : 'Select Image'

  return (
    <View>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      {path ? (
        <TouchableOpacity onPress={() => setShowImages(true)}>
          <Image source={path} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <IconButton
          icon={IconNames.imagePicker}
          size={100}
          color={GlobalStyles.colors.primary300}
          onPress={() => setShowImages(true)}
        />
      )}
      {showImages ? (
        <ImageModal
          visible={showImages}
          closeModal={() => setShowImages(false)}
          selectedImage={path}
          setPath={setPath}
        />
      ) : null}
    </View>
  )
}

export default CategoryImageSelection

const styles = StyleSheet.create({
  label: { fontSize: 18 },
  invalidLabel: { color: GlobalStyles.colors.error200 },
  image: { height: 100, width: 100, marginTop: 10 },
})
