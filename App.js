import { initializeApp } from 'firebase/app'
import { NavigationContainer } from '@react-navigation/native'

import { StatusBar } from 'expo-status-bar'
import TabStack from './stacks/TabStack'
import AuthStack from './stacks/AuthStack'
import AppContextProvider from './store/app-context'
import firebaseConfig from './firebase-config'
1
const Navigation = () => {
  const isUserLoggedIn = true
  return (
    <NavigationContainer>
      {isUserLoggedIn ? <TabStack /> : <AuthStack/>}
    </NavigationContainer>
  )
}

const App = () => {
  initializeApp(firebaseConfig)

  return (
    <>
      <StatusBar style="dark" />
      <AppContextProvider>
        <Navigation />
      </AppContextProvider>
    </>
  )
}

export default App
