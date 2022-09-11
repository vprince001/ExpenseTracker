import { View, StyleSheet } from 'react-native';

import ExpensesList from '../components/ExpenseList';

const AllExpenses = () => {
  return (
    <View style={styles.container}>
      <ExpensesList />
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
