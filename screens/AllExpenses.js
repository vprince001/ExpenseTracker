import { View, Text, FlatList, StyleSheet } from 'react-native';

const expenses = [
  {
    id: 1,
    description: 'first expense',
    amount: 10,
    category: 'first category',
    date: new Date('2022-09-07').toISOString(),
  },
  {
    id: 2,
    description: 'second expense',
    amount: 20,
    category: 'second category',
    date: new Date('2022-09-07').toISOString(),
  },
  {
    id: 3,
    description: 'third expense',
    amount: 30,
    category: 'third category',
    date: new Date('2022-09-07').toISOString(),
  },
  {
    id: 4,
    description: 'fourth expense',
    amount: 40,
    category: 'fourth category',
    date: new Date('2022-09-07').toISOString(),
  },
  {
    id: 5,
    description: 'fifth expense',
    amount: 50,
    category: 'fifth category',
    date: new Date('2022-09-07').toISOString(),
  },
];

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
    <View style={ styles.container}>
      <FlatList
        data={expenses}
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
