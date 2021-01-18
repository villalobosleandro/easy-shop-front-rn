import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import FormContainer from './../../Shared/Form/FormContainer';
import Input from './../../Shared/Form/Input';
import Error from './../../Shared/Error';
import baseUrl from './../../assets/common/baseUrl';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    if (
      email === '' ||
      name === '' ||
      phone === '' ||
      password === ''
    ) {
      setError('Please fill in the form correctly')
    }

    let user = {
      name,
      email,
      phone,
      password,
      isAdmin: false
    }

    axios.post(`${baseUrl}users/register`, user)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Registration Succeeded',
            text2: 'Please login into your account'
          });
          setTimeout(() => {
            props.navigation.navigate('Login')
          }, 500)
        }
      })
      .catch((error) => {
        console.log('error register ', error);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again'
        });
      })
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >

      <FormContainer title={'Register'}>
        <Input
          placeholder={'Enter Email'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />

        <Input
          placeholder={'Enter Name'}
          name={'name'}
          id={'name'}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Input
          placeholder={'Enter Phone'}
          name={'phone'}
          id={'phone'}
          keyboardType={'numeric'}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <Input
          placeholder={'Enter Password'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={styles.buttonGroup}>
          {
            error
              ? <Error message={error} />
              : null
          }
        </View>

        <View>
          <Button
            title={'Register'}
            onPress={() => register()}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title={'Back to Login'}
            onPress={() => props.navigation.navigate('login')}
          />
        </View>

      </FormContainer>

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center'
  }
})

export default Register;