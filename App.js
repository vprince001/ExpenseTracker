import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ExpensesStackScreen from './screens/ExpensesStack'
import CategoriesStackScreen from './screens/CategoriesStack'

import AppContextProvider from './store/app-context'
import { ScreenNames, GlobalStyles, IconNames } from './constants'

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <AppContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: GlobalStyles.colors.primary300,
            }}
          >
            <Tab.Screen
              name={ScreenNames.expenseBottomScreen}
              component={ExpensesStackScreen}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return (
                    <Ionicons
                      name={IconNames.wallet}
                      size={size}
                      color={color}
                    />
                  )
                },
              }}
            />
            <Tab.Screen
              name={ScreenNames.categoryBottomScreen}
              component={CategoriesStackScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name={IconNames.list} size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    </>
  )
}

export default App
