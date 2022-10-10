import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { GlobalStyles } from '../../constants'
import { getFormattedDate } from '../../util/date'

const CategoryExpenseItem = ({ date, description, amount }) => {
  const dateToDisplay = getFormattedDate(new Date(date)).split(',')[0]
  return (
    <>
      <View style={styles.container}>
        <View style={styles.dateAndDesc}>
          <Text style={styles.date}>{dateToDisplay}</Text>
          <Text style={styles.desc}>
            {description}
          </Text>
        </View>
        <Text style={styles.amount}>{amount.toFixed(2)}</Text>
      </View>
      <View style={styles.seperator} />
    </>
  )
}

export default CategoryExpenseItem

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 14,
  },
  desc: {
    fontSize: 16,
    fontWeight: '500',
    maxWidth: Dimensions.get('window').width - 80
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seperator: {
    marginVertical: 4,
    borderBottomColor: GlobalStyles.colors.gray200,
    borderBottomWidth: 2,
  },
})
