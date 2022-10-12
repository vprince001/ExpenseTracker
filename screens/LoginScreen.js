import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent'

import { login } from '../util/http'
import { GlobalStyles } from '../constants'

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    await login(email, password)
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <AuthContent onAuthenticate={loginHandler} isLogin={true} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.white,
  },
})
