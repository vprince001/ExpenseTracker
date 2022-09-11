import { View, Text, FlatList, StyleSheet } from 'react-native';

import { EXPENSES } from '../util/data';

const ExpenseItem = ({ id, description, amount, category, date }) => {
  return (
    <View>
      <Text>{id}</Text>
      <Text>{description}</Text>
      <Text>{amount}</Text>
      <Text>{category}</Text>
      <Text>{date}</Text>
    </View>
  );
};

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const AllExpenses = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={EXPENSES}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
});
