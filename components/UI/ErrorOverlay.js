import { StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import { GlobalStyles, IconNames } from '../../constants'

const ErrorOverlay = ({
  message,
  fetchDataAndSetCtx,
  setError,
  setIsFetching,
}) => {

  const reload = async () => {
    setIsFetching(true)
    try {
      await fetchDataAndSetCtx()
      setError('')
    } catch ({ message }) {
      setError(message)
    }
    setIsFetching(false)
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <IconButton
        icon={IconNames.reload}
        size={36}
        color={GlobalStyles.colors.primary600}
        onPress={() => reload()}
      />
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.white,
  },
  text: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
