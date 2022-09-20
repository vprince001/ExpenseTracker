import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import IconButton from './components/UI/IconButton'
import ManageCategory from './screens/ManageCategory'
import ManageExpense from './screens/ManageExpense'
import AllCategories from './screens/AllCategories'
import CategoryExpenses from './screens/CategoryExpenses'
import AllExpenses from './screens/AllExpenses'

import UserContextProvider from './store/user-context'
import ExpensesContextProvider from './store/expenses-context'
import CategoriesContextProvider from './store/categories-context'

import { ScreenNames, GlobalStyles, IconNames } from './constants'

const ExpensesStack = createNativeStackNavigator()
const CategoriesStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const ExpensesStackScreen = () => {
  return (
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
                icon={IconNames.add}
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
  )
}

const CategoriesStackScreen = () => {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name={ScreenNames.allCategoriesScreen}
        component={AllCategories}
        options={({ navigation }) => {
          return {
            title: 'Categories',
            headerTitleAlign: 'center',
            headerRight: () => (
              <IconButton
                icon={IconNames.add}
                size={36}
                color={GlobalStyles.colors.primary300}
                onPress={() => {
                  navigation.navigate(ScreenNames.manageCategoryScreen)
                }}
              />
            ),
          }
        }}
      />
      <CategoriesStack.Screen
        name={ScreenNames.categoryExpensesScreen}
        component={CategoryExpenses}
        options={({ navigation }) => {
          return {
            title: 'Category Expenses',
            headerTitleAlign: 'center',
            headerRight: () => (
              <IconButton
                icon={IconNames.edit}
                size={36}
                color={GlobalStyles.colors.primary300}
                onPress={() => {
                  navigation.navigate(ScreenNames.manageCategoryScreen)
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
    </CategoriesStack.Navigator>
  )
}

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <UserContextProvider>
        <ExpensesContextProvider>
          <CategoriesContextProvider>
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
                      <Ionicons
                        name={IconNames.list}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </CategoriesContextProvider>
        </ExpensesContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App
