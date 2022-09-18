import { StyleSheet, View, Text } from 'react-native'
import ChoiceItem from '../UI/ChoiceItem'
import { GlobalStyles } from '../../constants/styles'

const MonthChoice = ({ months, currentMonth, onSelect, invalid }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        Select a Month
      </Text>
      <View style={styles.choiceContainer}>
        {months.map((listItem) => {
          return (
            <ChoiceItem
              name={listItem}
              currentItem={currentMonth}
              onSelect={onSelect}
              invalid={invalid}
            />
          )
        })}
      </View>
    </View>
  )
}

export default MonthChoice

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  choiceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
  },
  label: {
    fontSize: 18,
    margin: 8,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error200,
  },
})
