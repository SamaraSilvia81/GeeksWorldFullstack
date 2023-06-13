import React, { useState, useEffect } from 'react';

import { View, StatusBar, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import { TextInput, Text, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { createUser, getUsers } from '../../backend/api';
import { useMutation } from '@tanstack/react-query';

const SignupScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      dispatch({ type: 'SIGNUP_SUCCESS', payload: data });
      setSuccessMessage('User created successfully!');
      setTimeout(() => {
        navigation.navigate('BottomNavigation');
      }, 800); // Aguarda 2 segundos antes de redirecionar
    },
    onError: (error) => {
      setErrorMessage('Error creating user');
      console.error(error);
    },
  });

  const handleSignup = async () => {
    try {
      const users = await getUsers();
      const existingUser = users.find(
        (user) =>
          user.username === username &&
          user.email === email &&
          user.password === password
      );
      if (existingUser) {
        // Usuário já cadastrado, redirecionar para a página inicial
        navigation.navigate('Home');
        return;
      }
      await createUserMutation.mutateAsync({ username, email, password })
    } catch (error) {
      console.error(error);
    }
  };  

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const keyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#4080ea',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>

      <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            World's Geek
          </Text>
          <Text variant="titleSmall" style={styles.subtitle}>
            made for marvel & DC fans
          </Text>
        </View>

        <View style={styles.formLogin}>
          <TextInput
            style={styles.input}
            type="flat"
            label="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            type="flat"
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            type="flat"
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignup} 
            style={styles.buttonSignUp}
          >
            <Text style={styles.buttonSignUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        {!keyboardVisible && (
          <View style={styles.footer}>
            <Text style={styles.textFooter}>Already have an account?</Text>
            <TouchableOpacity
              onPress={handleLogIn}
              style={styles.buttonLogin}
            >
              <Text style={styles.buttonLoginText}>LogIn</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23232e',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginButton: 10,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
  },
  formLogin: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    color: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  buttonSignUp: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 50,
    backgroundColor: "#0B2D66" // #EF7377
  },
  buttonSignUpText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  textFooter: {
    color: '#fff',
  },
  errorMessage: {
    color: '#EF7377',
    marginTop: 10,
  },
  successMessage: {
    color: '#0B2D66', // 77EF73
    marginTop: 10,
  },
  buttonLogin: {
    marginLeft: 5,
  },
  buttonLoginText: {
    color: '#4080ea', // #2A234B 385993
  },
});

export default SignupScreen;