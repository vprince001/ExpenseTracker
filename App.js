import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AllExpenses from './screens/AllExpenses'
import ManageExpense from './screens/ManageExpense'

import ExpensesContextProvider from './screens/store/expenses-context'
import { ScreenNames } from './constants/screens'
import IconButton from './components/UI/IconButton'
import { GlobalStyles } from './constants/styles'

const ExpensesStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const ExpensesStackScreen = () => {
  return (
    <ExpensesContextProvider>
      <ExpensesStack.Navigator>
        <ExpensesStack.Screen
          name={ScreenNames.allExpenseScreen}
          component={AllExpenses}
          options={({ navigation }) => {
            return {
              title: 'Expenses',
              headerTitleAlign: 'center',
              headerRight: () => (
                <IconButton
                  icon={'add'}
                  size={36}
                  color={GlobalStyles.colors.primary300}
                  onPress={() => {
                    navigation.navigate(ScreenNames.manageExpenseScreen)
                  }}
                />
              ),
            }
          }}
        />
        <ExpensesStack.Screen
          name={ScreenNames.manageExpenseScreen}
          component={ManageExpense}
          options={{
            presentation: 'modal',
            headerTitleAlign: 'center',
          }}
        />
      </ExpensesStack.Navigator>
    </ExpensesContextProvider>
  )
}

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name={'AllExpensesBottomTab'}
              component={ExpensesStackScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
    </>
  )
}

export default App
