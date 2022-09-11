import { View, Text } from 'react-native';

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

export default ExpenseItem;