import { StyleSheet, View } from 'react-native'
import CategoryList from './CategoryList'
import { GlobalStyles } from '../../constants'

const CategoriesOutput = ({ categories }) => {
  return (
    <View style={styles.container}>
      <CategoryList categories={categories} />
    </View>
  )
}

export default CategoriesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
})
