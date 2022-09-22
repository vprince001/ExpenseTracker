import { StyleSheet, View, Text } from 'react-native'
import ChoiceItem from '../UI/ChoiceItem'

const MonthChoice = ({ months, currentMonth, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>
        Select a Month
      </Text>
      <View style={styles.choiceContainer}>
        {months.map((listItem) => {
          return (
            <ChoiceItem
              key={listItem}
              item={listItem}
              itemName={listItem}
              onSelect={onSelect}
              isSelected={currentMonth === listItem}
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
})
