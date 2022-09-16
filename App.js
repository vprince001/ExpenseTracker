import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllExpenses from './screens/AllExpenses'
import ManageExpense from './screens/ManageExpense'

import ExpensesContextProvider from './screens/store/expenses-context'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="AllExpenses"
              component={AllExpenses}
              options={{
                title: 'Expenses',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  )
}

export default App
