import React, {useState} from "react";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, View, StatusBar, StyleSheet, FlatList } from "react-native";
import { Text } from 'react-native-paper';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";

import { CardCharacters } from "../../components/CardCharacters";
import { getList } from "../../backend/api";

import { useSelector } from 'react-redux';

function CharListScreen () {

  const [myList, setMyList] = useState([]); // Estado para armazenar a lista "mylist"
  const user = useSelector(state => state.auth.userId);
  const [selectedList, setSelectedList] = useState(null); // Estado para armazenar a lista selecionada

  const addToMyList = (character) => {
    setMyList((prevList) => [...prevList, character]); // Adiciona o personagem à lista
  };

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["WorldsGeeksBackend"],
    queryFn: getList,
  });

  const navigation = useNavigation();

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

  const route = useRoute();
  const listId = route.params?.listId;
  
  // Filtra os personagens da lista selecionada
  const filteredCharacters = data
    .find((item) => item.id === listId)
    ?.Characters.map((character) => ({
      ...character,
      List: listId,
    })) || [];

  console.log("filteredCharacters:", filteredCharacters);

  const handleCardPress = (character) => {
    if (character.isMarvel && character.isHero) {
      navigation.navigate('MarvelHeroesChar', { characterId: character.id });
    } else if (character.isMarvel && !character.isHero) {
      navigation.navigate('MarvelVillChar', { characterId: character.id });
    } else if (!character.isMarvel && !character.isHero) {
      navigation.navigate('DcHeroesChar', { characterId: character.id });
    } else {
      navigation.navigate('DcVillChar', { characterId: character.id });
    }
  };  

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
          data={filteredCharacters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardCharacters character={item} onPress={handleCardPress} addToMyList={addToMyList}/>
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
    backgroundColor: '#23232e',
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

export default CharListScreen;