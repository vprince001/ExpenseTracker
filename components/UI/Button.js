import { Pressable, StyleSheet, Text, View } from 'react-native'

function Button({ children, onPress, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
  },
  buttonText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.35,
    borderRadius: 4,
  },
})
