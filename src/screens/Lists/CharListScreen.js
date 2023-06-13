import React, {useState} from "react";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, View, StatusBar, StyleSheet, FlatList } from "react-native";
import { IconButton, Text } from 'react-native-paper';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";

import { CardCharacters } from "../../components/CardCharacters";
import { CharModal } from "../../components/CharModal";

import { getList, addCharacterToList, deleteCharacterToList } from "../../backend/api";

import { useSelector } from 'react-redux';

function CharListScreen () {

  const [myList, setList] = useState([]); // Estado para armazenar a lista "mylist"
  const user = useSelector(state => state.auth.userId);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["WorldsGeeksBackend"],
    queryFn: getList,
  });

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleAddCharacter = () => {
    setModalVisible(true);
  };

  const handleSelectCharacter = (character) => {
    setModalVisible(false);
    // Chame a função addCharacterToList com os parâmetros necessários (character.id, listId, user.id)
    addCharacterToList({ characterId: character.id, listId: listId, userId: user.id });
    // Atualize a lista myList com o novo personagem
    setList((prevList) => [...prevList, character]);
    setSelectedCharacters((prevCharacters) => [...prevCharacters, character]);
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      await deleteCharacterToList(characterId, listId); // Adicione o parâmetro listId aqui
      // setList((prevList) => prevList.filter((character) => character.id !== characterId));
      // setSelectedCharacters((prevCharacters) =>
      //   prevCharacters.filter((character) => character.id !== characterId)
      // );
      console.log("Character Deleted:", characterId);
    } catch (error) {
      console.log("Error deleting character:", error);
    }
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
            color="#fff"
            onPress={handleGoBack}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            icon="plus"
            iconColor="#fff"
            size={30}
            style={styles.addButton}
            onPress={handleAddCharacter}
          />
        </View>

        {modalVisible && (
          <CharModal
            visible={modalVisible}
            myList={myList} // Passa a propriedade myList corretamente
            onAdd={handleSelectCharacter}
            setModalVisible={setModalVisible}
          />
        )}

        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={filteredCharacters}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardCharacters 
                character={item} 
                onPress={handleCardPress} 
                onDelete={handleDeleteCharacter} 
                showDeleteButton={true}
              />
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
    marginVertical: 10,
    borderRadius: 100,
    padding: 5,
    top: 20,
    left: 25,
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#0B2D66',
  },
});

export default CharListScreen;