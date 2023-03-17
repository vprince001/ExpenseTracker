import { createNativeStackNavigator } from "@react-navigation/native-stack"
import IconButton from "../components/UI/IconButton"

import ManageCategory from "./ManageCategory"
import CategoryExpenses from "./CategoryExpenses"
import AllCategories from "./AllCategories"

import { GlobalStyles, IconNames, ScreenNames } from "../constants"

const CategoriesStack = createNativeStackNavigator()

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
                color={GlobalStyles.colors.primary600}
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

export default CategoriesStackScreen