import { useState } from 'react'
import { FlatList } from 'react-native'

import CategoryItem from './CategoryItem'

const renderCategoryItem = (itemData) => {
  return <CategoryItem {...itemData.item} />
}

const CategoryList = ({ categories, fetchCategoriesAndSetCtx }) => {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchCategoriesAndSetCtx()
    setRefreshing(false)
  }

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  )
}

export default CategoryList
