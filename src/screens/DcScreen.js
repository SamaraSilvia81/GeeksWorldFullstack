import React from 'react';

import { View, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

const DcScreen = ({ navigation }) => {

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />

      <View style={styles.arrowIconContainer}>
        <Icon
          name="arrow-back"
          size={25}
          color="#FFFFFF"
          onPress={handleGoBack}
        />
      </View>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('DCHeroes')}
      >
        <Image
          source={require('../../public/DCHeroes.png')}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text variant="titleLarge" style={styles.title}>Heroes</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('DCVill')}
      >
        <Image
          source={require('../../public/DCVill.png')}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text variant="titleLarge" style={styles.title}>Villains</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23232e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
  },
  img: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  arrowIconContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
    padding: 5,
    top: 20,
    left: 25,
    zIndex: 1,
  },
});

export default DcScreen;