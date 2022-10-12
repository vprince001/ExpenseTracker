import { useState } from 'react'
import { View } from 'react-native'

import Button from '../UI/Button'
import Input from '../UI/Input'

const AuthForm = ({ onSubmit, isLogin }) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('')

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue)
        break
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue)
        break
      case 'password':
        setEnteredPassword(enteredValue)
        break
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue)
        break
    }
  }

  const submitHandler = () => {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    })
  }

  return (
    <View>
      <Input
        label="Email Address"
        textInputConfig={{
          onChangeText: updateInputValueHandler.bind(this, 'email'),
          value: enteredEmail,
          keyboardType: 'email-address',
          placeholder: 'abc@gmail.com',
        }}
      />
      {!isLogin ? (
        <Input
          label="Confirm Email Address"
          textInputConfig={{
            onChangeText: updateInputValueHandler.bind(this, 'confirmEmail'),
            value: enteredConfirmEmail,
            keyboardType: 'email-address',
            placeholder: 'abc@gmail.com',
          }}
        />
      ) : null}
      <Input
        label="Password"
        textInputConfig={{
          onChangeText: updateInputValueHandler.bind(this, 'password'),
          value: enteredPassword,
        }}
      />
      {!isLogin ? (
        <Input
          label="Confirm Password"
          textInputConfig={{
            onChangeText: updateInputValueHandler.bind(this, 'confirmPassword'),
            value: enteredConfirmPassword,
          }}
        />
      ) : null}
      <Button onPress={submitHandler}>{isLogin ? 'Login' : 'Sign Up'}</Button>
    </View>
  )
}

export default AuthForm
