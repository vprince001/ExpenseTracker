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
import AllCategories from './screens/AllCategories'
import ManageCategory from './screens/ManageCategory'

const ExpensesStack = createNativeStackNavigator()
const CategoriesStack = createNativeStackNavigator()
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

const CategoriesStackScreen = () => {
  return (
    <ExpensesStack.Navigator>
      <CategoriesStack.Screen
        name={ScreenNames.allCategoriesScreen}
        component={AllCategories}
        options={({ navigation }) => {
          return {
            title: 'Categories',
            headerTitleAlign: 'center',
            headerRight: () => (
              <IconButton
                icon={'add'}
                size={36}
                color={GlobalStyles.colors.primary300}
                onPress={() => {
                  navigation.navigate('ManageCategory')
                }}
              />
            ),
          }
        }}
      />
      <CategoriesStack.Screen
        name={ScreenNames.manageCategoryScreen}
        component={ManageCategory}
        options={{
          presentation: 'modal',
          headerTitleAlign: 'center',
        }}
      />
    </ExpensesStack.Navigator>
  )
}

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name={ScreenNames.expenseBottomScreen}
            component={ExpensesStackScreen}
          />
          <Tab.Screen
            name={ScreenNames.categoryBottomScreen}
            component={CategoriesStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App
