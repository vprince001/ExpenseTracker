import { useState } from 'react'
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
  const [focused, setFocused] = useState(false)
  const containerViewStyle = [
    styles.container,
    inputDirection === 'row' && styles.rowInput,
  ]

  return (
    <View style={containerViewStyle}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          focused && styles.focusedInput,
          invalid && styles.invalidInput,
        ]}
      >
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, invalid && styles.invalidInput]}
          {...textInputConfig}
        />
        {buttonConfig && textInputConfig.value ? (
          <View style={[styles.iconButtonView, invalid && styles.invalidInput]}>
            <IconButton {...buttonConfig} />
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
    backgroundColor: GlobalStyles.colors.gray100,
    borderRadius: 10,
  },
  focusedInput: {
    borderColor: GlobalStyles.colors.primary300,
    borderWidth: 1,
  },
  input: {
    backgroundColor: GlobalStyles.colors.gray100,
    padding: 8,
    fontSize: 18,
    flexGrow: 1,
    maxWidth: 282,
    borderRadius: 10,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error100,
  },
  iconButtonView: {
    backgroundColor: GlobalStyles.colors.gray100,
    justifyContent: 'center',
    borderRadius: 10,
  },
})
