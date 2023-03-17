import { StyleSheet, View } from 'react-native'
import CategoryList from './CategoryList'
import {GlobalStyles, ScreenNames} from '../../constants'
import IconButton from "../UI/IconButton";
import {useNavigation} from "@react-navigation/native";

const CategoriesOutput = ({ categories, fetchCategoriesAndSetCtx }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <CategoryList
        categories={categories}
        fetchCategoriesAndSetCtx={fetchCategoriesAndSetCtx}
      />
      <View style={styles.addButton}>
        <IconButton
          icon={"add-circle"}
          size={60}
          color={GlobalStyles.colors.primary600}
          onPress={() => {
            navigation.navigate(ScreenNames.manageCategoryScreen)
          }}
        />
      </View>
    </View>
  )
}

export default CategoriesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  }
})
