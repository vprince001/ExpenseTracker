import { View, FlatList, StyleSheet } from 'react-native';

import ExpenseItem from '../components/ExpenseItem';
import { EXPENSES } from '../util/data';

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
