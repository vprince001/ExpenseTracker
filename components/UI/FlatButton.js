import { Pressable, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants'

const FlatButton = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  )
}

export default FlatButton

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.35,
  },
  buttonText: {
    textAlign: 'center',
    color: GlobalStyles.colors.primary300,
    fontWeight: 'bold',
  },
})
