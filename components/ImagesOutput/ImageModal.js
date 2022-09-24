import React from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import CategoryImage from './CategoryImage'
import { GlobalStyles, ImagePaths } from '../../constants'

const ImageModal = ({
  visible,
  closeModal,
  selectedImage,
  setSelectedImage,
  setPath,
}) => {
  const renderImage = (itemData) => {
    const { id, path } = itemData.item

    return (
      <CategoryImage
        id={id}
        path={path}
        isSelectedImage={selectedImage === id}
        onPress={setSelectedImage}
        setPath={setPath}
      />
    )
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <FlatList
            data={ImagePaths}
            renderItem={renderImage}
            keyExtractor={(item) => item.id}
            numColumns={3}
          />
          <Pressable style={styles.button} onPress={closeModal}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: GlobalStyles.colors.white,
    padding: 25,
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary300,
  },
})

export default ImageModal
