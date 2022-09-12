import { View, Text, TextInput, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

function Input({ label, textInputConfig }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...textInputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginTop: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: GlobalStyles.colors.gray100,
    padding: 8,
    borderRadius: 5,
    fontSize: 18,
  },
})
