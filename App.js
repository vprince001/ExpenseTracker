import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebase-config'
import { StatusBar } from 'expo-status-bar'
import Navigation from './Navigation'
import AppContextProvider from './store/app-context'

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
