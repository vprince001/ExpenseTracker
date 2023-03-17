import React from 'react'
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native'
import { GlobalStyles } from '../../constants'

const ConfirmationModal = ({
  modalVisible,
  setModalVisible,
  onConfirmation,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to delete this item?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => {
                onConfirmation()
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={[styles.textStyle, styles.deleteTextStyle]}>Delete</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[styles.textStyle, styles.cancelTextStyle]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 20,
    padding: 25,
    elevation: 10,
  },
  modalText: {
    fontSize: 22,
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
  },
  button: {
    padding: 10,
    marginLeft: 15,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteTextStyle: {
    color: GlobalStyles.colors.error200,
  },
  cancelTextStyle: {
    color: GlobalStyles.colors.primary600,
  },
})

export default ConfirmationModal
