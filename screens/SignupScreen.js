import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent'

import { AuthContext } from '../store/auth-context'
import { UserContext } from "../store/user-context";
import { createUser } from '../util/http'
import { GlobalStyles } from '../constants'

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)
  const userCtx = useContext(UserContext)

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    const {token, defaultDatabaseId} = await createUser(email, password)
    userCtx.addUser({email, defaultDatabaseId})
    authCtx.authenticate(token)
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
