import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import FormContainer from './../../Shared/Form/FormContainer';
import Input from './../../Shared/Form/Input';
import Error from './../../Shared/Error';
import { loginUser } from './../../Context/actions/Auth.actions';
import AuthGlobal from './../../Context/store/AuthGlobal';
import EasyButton from './../../Shared/StyledComponents/EasyButton';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated) {
      props.navigation.navigate('User Profile');
    }
  }, [context.stateUser.isAuthenticated])

  const handleSubmit = () => {
    console.log('click login');
    const data = {
      email,
      password
    }

    if (email === "" || password === "") {
      setError('Please fill in your credentials');
    } else {
      loginUser(data, context.dispatch);
    }
  }

  return (
    <FormContainer title={'Login'}>
      <Input
        placeholder={'Enter Email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
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
        <EasyButton
          primary
          large
          onPress={() => handleSubmit()}
        >
          <Text style={{ color: 'white' }}>Login</Text>
        </EasyButton>
      </View>

      <View style={[styles.buttonGroup, { marginTop: 40 }]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate('Register')}
        >
          <Text style={{ color: 'white' }}>Register</Text>
        </EasyButton>
      </View>

    </FormContainer>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center'
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center'
  }
})

export default Login;