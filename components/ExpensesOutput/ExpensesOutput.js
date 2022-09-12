import { StyleSheet, View } from 'react-native'

import { GlobalStyles } from '../../constants/styles'
import ExpensesList from './ExpenseList'
import ExpensesSummary from './ExpensesSummary'

const ExpensesOutput = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.clean,
  },
})
