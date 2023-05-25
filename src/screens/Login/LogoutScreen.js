import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';
import { useNavigation } from '@react-navigation/native';

import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Paragraph} from 'react-native-paper';

const LogoutScreen = () => {

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const handleCancel = () => {
    hideDialog();
    navigation.navigate('Home');
  };

  useEffect(() => {
    showDialog()
  },[])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      showDialog();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={styles.title}>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.text}>Are you sure you want to logout?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={styles.button}>
            <Button mode="contained" onPress={handleCancel} style={styles.cancel}>Cancel</Button>
            <Button mode="contained" onPress={handleLogout} style={styles.logout}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161d', // 23232e
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    height: 50,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 50,
    color: '#fff',
    backgroundColor: '#0B2D66', // #2A234B 385993
  },
  logout: {
    height: 50,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 50,
    color: '#fff',
    backgroundColor: "#CF2422" // #EF7377
  }
});

export default LogoutScreen;