import React from 'react';
import { View, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text} from 'react-native-paper';

const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />

      <Text style={styles.titlePage} variant="headlineMedium">World's Geek</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('Marvel')}>
        <Image
          source={require('../../public/Marvel.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DC')}>
        <Image 
          source={require('../../public/DC.png')} 
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
  titlePage: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 280,
    height: 180,
    marginTop: 50,
    borderRadius: 10,
  }
});

export default HomeScreen;