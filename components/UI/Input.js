import { View, Text, TextInput, StyleSheet } from 'react-native'
import IconButton from './IconButton'
import { GlobalStyles } from '../../constants'

function Input({
  label,
  invalid,
  inputDirection,
  textInputConfig,
  buttonConfig,
}) {
  const containerViewStyle = [
    styles.container,
    inputDirection === 'row' && styles.rowInput,
  ]
  return (
    <View style={containerViewStyle}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, invalid && styles.invalidInput]}
          {...textInputConfig}
        />
        {buttonConfig && textInputConfig.value ? (
          <View style={[styles.iconButtonView, invalid && styles.invalidInput]}>
            <IconButton {...buttonConfig}/>
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginTop: 4,
    marginBottom: 16,
  },
  rowInput: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error200,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: GlobalStyles.colors.gray100,
    padding: 8,
    fontSize: 18,
    flexGrow: 1,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error100,
  },
  iconButtonView: {
    backgroundColor: GlobalStyles.colors.gray100,
    justifyContent: 'center'
  },
})
