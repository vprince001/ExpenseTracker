import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllExpenses from './screens/AllExpenses'
import ManageExpense from './screens/ManageExpense'

import ExpensesContextProvider from './screens/store/expenses-context'
import { ScreenNames } from './constants/screens'
import IconButton from './components/UI/IconButton'
import { GlobalStyles } from './constants/styles'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={ScreenNames.allExpenseScreen}
              component={AllExpenses}
              options={({ navigation }) => {
                return {
                  title: 'Expenses',
                  headerTitleAlign: 'center',
                  headerRight: () => {
                    return (
                      <IconButton
                        icon={'add'}
                        size={36}
                        color={GlobalStyles.colors.primary300}
                        onPress={() => {
                          navigation.navigate(ScreenNames.manageExpenseScreen)
                        }}
                      />
                    )
                  },
                }
              }}
            />
            <Stack.Screen
              name={ScreenNames.manageExpenseScreen}
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
