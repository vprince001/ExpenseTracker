import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AllExpenses from './screens/AllExpenses'
import ManageExpense from './screens/ManageExpense'

import { GlobalStyles } from './constants/styles'
import IconButton from './components/UI/IconButton'
import ExpensesContextProvider from './screens/store/expenses-context'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.clean },
        tabBarStyle: { backgroundColor: GlobalStyles.colors.clean },
        tabBarActiveTintColor: GlobalStyles.colors.primary300,
        headerRight: () => (
          <IconButton
            icon="add"
            size={36}
            onPress={() => navigation.navigate('ManageExpense')}
            color={GlobalStyles.colors.primary300}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: 'modal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  )
}

export default App
