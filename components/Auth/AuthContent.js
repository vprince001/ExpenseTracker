import { StyleSheet, View } from 'react-native'
import AuthForm from '../ManageForms/AuthForm'

const AuthContent = ({ onAuthenticate }) => {
  const submitHandler = (credentials) => {
    let { email, password } = credentials

    email = email.trim()
    password = password.trim()

    onAuthenticate({email, password})
  }

  return (
    <View style={styles.authContent}>
      <AuthForm onSubmit={submitHandler} />
    </View>
  )
}

export default AuthContent

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
})
