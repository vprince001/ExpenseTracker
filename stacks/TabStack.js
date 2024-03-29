
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ExpensesStackScreen from '../screens/ExpensesStack'
import CategoriesStackScreen from '../screens/CategoriesStack'

import { ScreenNames, GlobalStyles, IconNames } from '../constants'

const Tab = createBottomTabNavigator()

const TabStack = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: GlobalStyles.colors.primary600,
        }}
      >
        <Tab.Screen
          name={ScreenNames.expenseBottomScreen}
          component={ExpensesStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <Ionicons name={IconNames.wallet} size={size} color={color} />
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
  )
}

export default TabStack
