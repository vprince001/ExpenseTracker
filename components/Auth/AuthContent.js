import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import FlatButton from '../UI/FlatButton'
import AuthForm from '../ManageForms/AuthForm'

const AuthContent = ({ onAuthenticate, isLogin }) => {
  const navigation = useNavigation()

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.replace('Signup')
    } else {
      navigation.replace('Login')
    }
  }

  const submitHandler = (credentials) => {
    let { email, password } = credentials

    email = email.trim()
    password = password.trim()

    onAuthenticate({ email, password })
  }

  return (
    <View style={styles.authContent}>
      <AuthForm onSubmit={submitHandler} isLogin={isLogin} />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create account' : 'Log in instead'}
        </FlatButton>
      </View>
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
  buttons: {
    marginTop: 8,
  },
})
