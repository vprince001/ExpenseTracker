import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent'

import { createUser } from '../util/http'
import { GlobalStyles } from '../constants'

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    await createUser(email, password)
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.white,
  },
})
