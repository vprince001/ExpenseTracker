import { SectionList, StyleSheet, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'
import { getDateExpenseLookup, getDateSectionExpenses, sortDescending } from '../../util/expenses'

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />
}

const SectionHeader = ({ section: { title } }) => {
  return <Text style={styles.sectionHeader}>{title}</Text>
}

const ExpensesList = ({ expenses }) => {
  const dateExpenseLookup = getDateExpenseLookup(expenses)
  const dateSectionExpenses = getDateSectionExpenses(dateExpenseLookup)
  const sortedDateSectionExpenses = sortDescending(dateSectionExpenses)
  return (
    <SectionList
      sections={sortedDateSectionExpenses}
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
