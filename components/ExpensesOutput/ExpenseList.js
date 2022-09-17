import { SectionList, Text } from 'react-native'
import { getDateSectionExpenses } from '../../util/utils'

import ExpenseItem from './ExpenseItem'

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />
}

const ExpensesList = ({ expenses }) => {
  const deteSectionExpenses = getDateSectionExpenses(expenses)
  return (
    <SectionList
      sections={deteSectionExpenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text>{title}</Text>
      )}
    />
  )
}

export default ExpensesList
