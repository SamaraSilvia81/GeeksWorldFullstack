import React from "react";

import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { useQuery } from "@tanstack/react-query";

import CharDetails from "../../components/CharDetails";
import { getCharacter } from "../../backend/api";

function MarvelHeroesChar({ route }) {

  const { characterId } = route.params;

  const { isLoading, error, data } = useQuery({
    queryKey: ["WorldsGeekBackend"],
    queryFn: getCharacter,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const selectedCharacter = data.find((character) => character.id === characterId);

  if (!selectedCharacter) {
    return (
      <View style={styles.errorContainer}>
        <Text>No hero found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CharDetails character={selectedCharacter}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcfcfc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MarvelHeroesChar;