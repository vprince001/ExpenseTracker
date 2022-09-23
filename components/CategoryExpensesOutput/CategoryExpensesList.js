import { FlatList } from 'react-native'
import CategoryExpenseItem from './CategoryExpenseItem'

const renderCategoryExpenseItem = (itemData) => {
  return <CategoryExpenseItem {...itemData.item} />
}

const CategoryExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderCategoryExpenseItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default CategoryExpensesList