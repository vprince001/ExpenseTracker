import { useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StatusBar } from 'expo-status-bar'
import TabStack from './stacks/TabStack'
import AuthStack from './stacks/AuthStack'

import AppContextProvider from './store/app-context'
import { AuthContext } from './store/auth-context'
import firebaseConfig from './firebase-config'

const Navigation = ({ isAthenticated }) => {
  return (
    <NavigationContainer>
      {isAthenticated ? <TabStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        authCtx.authenticate(storedToken)
      }
      setAppIsReady(true)
    }

    fetchToken()
  }, [])

  if (!appIsReady) {
    return null
  }

  return <Navigation isAthenticated={authCtx.isAthenticated} />
}

const App = () => {
  initializeApp(firebaseConfig)

  return (
    <>
      <StatusBar style="dark" />
      <AppContextProvider>
        <Root />
      </AppContextProvider>
    </>
  )
}

export default App
