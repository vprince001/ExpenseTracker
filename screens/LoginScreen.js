import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import LoadingOverlay from '../components/UI/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent'

import { AuthContext } from '../store/auth-context'
import { UserContext } from "../store/user-context";
import { login } from '../util/http'
import { GlobalStyles } from '../constants'

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)
  const userCtx = useContext(UserContext)

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    const {token, defaultDatabaseId} = await login(email, password)
    userCtx.setUser({email, defaultDatabaseId})
    authCtx.authenticate(token)
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
