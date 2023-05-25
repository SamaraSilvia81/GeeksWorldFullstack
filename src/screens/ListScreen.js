import React from 'react';
import { View, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ListScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      
      <TouchableOpacity onPress={() => navigation.navigate('MyList')}>
        <Image
          source={require('../../public/MyList.png')}
          style={styles.image}
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16161d',
    padding: 16,
  },
  image: {
    width: 280,
    height: 180,
    marginTop: 50,
    borderRadius: 10,
  }
});

export default ListScreen;