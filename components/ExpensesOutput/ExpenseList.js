import { SectionList, StyleSheet, Text, View } from 'react-native'
import ExpenseItem from './ExpenseItem'
import {
  getDateExpenseLookup,
  getDateSectionExpenses,
  sortDescending,
} from '../../util/expenses'
import { useState } from 'react'

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />
}

const SectionHeader = ({ section: { title, sum } }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeader}>{title}</Text>
      <Text style={styles.sectionHeader}>{sum}</Text>
    </View>
  )
}

const ExpensesList = ({ expenses, fetchDataAndSetCtx }) => {
  const [refreshing, setRefreshing] = useState(false)

  const dateExpenseLookup = getDateExpenseLookup(expenses)
  const dateSectionExpenses = getDateSectionExpenses(dateExpenseLookup)
  const sortedDateSectionExpenses = sortDescending(dateSectionExpenses)

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDataAndSetCtx()
    setRefreshing(false)
  }

  return (
    <SectionList
      sections={sortedDateSectionExpenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
      renderSectionHeader={SectionHeader}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
})
