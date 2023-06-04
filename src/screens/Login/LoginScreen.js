import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { login } from '../../redux/actions/authActions';

const LoginScreen = () => {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    dispatch(login(username, password));
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  useEffect(() => {
    if (auth.loggedIn) {
      navigation.navigate('BottomNavigation');
    }
  }, [auth.loggedIn, navigation]);

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
      primary: '#CF2422', // CF2422 EF7377
    },
  };

  const ovalHeight = keyboardVisible ? 120 : 220;

  useEffect(() => {
    if (auth.error) {
      setErrorMessage(auth.error);

      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [auth.error]);

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

        <View style={[styles.oval, { height: ovalHeight }]} />

        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Welcome
          </Text>
          <Text variant="titleSmall" style={styles.subtitle}>
            Have fun without limits
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
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogin} 
            style={styles.buttonLogin}
          >
            <Button mode="contained" style={styles.buttonLoginText}>Login</Button>
          </TouchableOpacity>
        </View>

        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

        {!keyboardVisible && (
          <View style={styles.footer}>
            <Text style={styles.textFooter}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={handleSignup}
              style={styles.buttonSignup}
            >
              <Text style={styles.buttonSignupText}>SignUp</Text>
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
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 90,
  },
  oval: {
    position: 'absolute',
    top: 0,
    width: '120%',
    backgroundColor: '#23232a',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    zIndex: -1,
  },
  title: {
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    color: '#23232a',
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
  buttonLogin: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 50,
    backgroundColor: "#CF2422" // #EF7377
  },
  buttonLoginText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
  },
  textFooter: {
    color: '#000000',
  },
  errorText: {
    color: '#EF7377',
    marginTop: 10,
  },
  buttonSignup: {
    marginLeft: 5,
  },
  buttonSignupText: {
    color: '#0B2D66', // #2A234B 385993
  },
});

export default LoginScreen;