import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants'

function Button({ children, onPress, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary300,
    marginHorizontal: 4,
    marginTop: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalStyles.colors.white,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.5,
    borderRadius: 5,
  },
})
