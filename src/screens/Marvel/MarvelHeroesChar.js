import React from "react";

import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { useQuery } from "@tanstack/react-query";

import CardCharacters from "../../components/CardCharacters";
import { getHeroes } from "../../api/marvel";

function MarvelHeroesChar({ route }) {
  const { heroId } = route.params;

  const { isLoading, error, data } = useQuery({
    queryKey: ["WorldsGeeksApi"],
    queryFn: getHeroes,
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

  const selectedHero = data.find((hero) => hero.objectId === heroId);

  if (!selectedHero) {
    return (
      <View style={styles.errorContainer}>
        <Text>No hero found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CardCharacters hero={selectedHero} />
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