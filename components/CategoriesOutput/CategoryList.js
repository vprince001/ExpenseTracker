import { FlatList } from 'react-native'

import CategoryItem from './CategoryItem'

const renderCategoryItem = (itemData) => {
  return <CategoryItem {...itemData.item} />
}

const CategoryList = ({ categories }) => {
  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default CategoryList
