import React, { useState } from "react";
import { ActivityIndicator, View, StatusBar, StyleSheet, FlatList } from "react-native";
import { Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";

import { CardCharacters } from "../../components/CardCharacters";
import { getCharacter } from "../../backend/api";

import Icon from 'react-native-vector-icons/MaterialIcons';

function MarvelHeroes() {
  const [characterType, setCharacterType] = useState("hero"); // Estado local para controlar o tipo de personagem (herói ou vilão)

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["WorldsGeekBackend"],
    queryFn: getCharacter,
  });

  const navigation = useNavigation();

  const handleCardPress = (character) => {
    navigation.navigate('MarvelHeroesChar', { characterId: character.id });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // Filtra os personagens com base no tipo selecionado
  const filteredData = data.filter((character) => {
    if (character.isMarvel && character.isHero && characterType === "hero") {
      return true;
    } else if (character.isMarvel && !character.isHero && characterType === "villain") {
      return true;
    }
    return false;
  });

  return (
    <View style={styles.container}>
      {isFetching && <Text>IS FETCHING</Text>}

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

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardCharacters character={item} onPress={handleCardPress} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fcfcfc',
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});

export default MarvelHeroes;