import { useState } from 'react'
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native'

import CategoryItem from './CategoryItem'

const CategoryList = ({ categories, fetchCategoriesAndSetCtx }) => {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchCategoriesAndSetCtx()
    setRefreshing(false)
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        {categories.map((category) => (
          <CategoryItem key={category.id} {...category} />
        ))}
      </View>
    </ScrollView>
  )
}

export default CategoryList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
})
