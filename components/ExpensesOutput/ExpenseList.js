import { SectionList, StyleSheet, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'
import { getDateSectionExpenses } from '../../util/utils'

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />
}

const SectionHeader = ({ section: { title } }) => {
  return <Text style={styles.sectionHeader}>{title}</Text>
}

const ExpensesList = ({ expenses }) => {
  const deteSectionExpenses = getDateSectionExpenses(expenses)
  return (
    <SectionList
      sections={deteSectionExpenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
      renderSectionHeader={SectionHeader}
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
