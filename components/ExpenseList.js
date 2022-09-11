import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';
import { EXPENSES } from '../util/data';

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = () => {
  return (
    <FlatList
      data={EXPENSES}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
