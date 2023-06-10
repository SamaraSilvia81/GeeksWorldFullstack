import React, {useState} from "react";
import { ActivityIndicator, View, StatusBar, StyleSheet, FlatList } from "react-native";
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { CardCharacters } from "../../components/CardCharacters";
import { getList } from "../../backend/api";
import Icon from 'react-native-vector-icons/MaterialIcons';

function MyList() {

  const [myList, setMyList] = useState([]); // Estado para armazenar a lista "mylist"

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

  // Filtra os personagens de cada lista
  const filteredCharacters = data.flatMap((item) =>
    item.Characters.map((character) => ({
      ...character,
      Lists: item, // Armazena a lista completa no objeto de personagem
    }))
  );

  const handleCardPress = (character) => {
    navigation.navigate('MarvelHeroesChar', { characterId: character.id });
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
});

export default MyList;