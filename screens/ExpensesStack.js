import { createNativeStackNavigator } from "@react-navigation/native-stack"
import IconButton from "../components/UI/IconButton"

import AllExpenses from "./AllExpenses"
import ManageExpense from "./ManageExpense"

import { GlobalStyles, IconNames, ScreenNames } from "../constants"

const ExpensesStack = createNativeStackNavigator()

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

export default ExpensesStackScreen