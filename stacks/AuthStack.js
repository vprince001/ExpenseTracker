import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignupScreen from '../screens/SignupScreen'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={() => ({
            title: 'Sign Up',
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
  )
}

export default AuthStack
