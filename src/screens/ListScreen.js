import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StatusBar, StyleSheet, FlatList } from "react-native";
import { Button, Dialog, IconButton, Text, TextInput,} from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";

import { useSelector } from 'react-redux';

import { getList, createList } from "../backend/api";

import { CardLists } from "../components/CardLists";

import Icon from 'react-native-vector-icons/MaterialIcons';

function ListScreen() {

  const userId = useSelector(state => state.auth.userId);
  const message = useSelector(state => state.lists.message);
  const messageType = useSelector(state => state.lists.messageType);

  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const navigation = useNavigation();

  const handleCardPress = (list) => {
    navigation.navigate('CharList', { listId: list.id });
  };

  // Função para abrir o modal
  const handleCreateList = () => {
    setIsCreatingList(true);
  };

  const handleAddList = async () => {
    try {
      //const newList = await createList(newListName, userId);
      const newList = await createList({ listname: newListName, userId: userId });
      console.log("NewList: ",newList);
      setIsCreatingList(false); // Fechar o pop-up após a criação da lista
      setNewListName(''); // Limpar o nome da nova lista
      setFilteredData(prevData => [newList, ...prevData]) // Adicionar a nova lista ao estado filteredData
    } catch (error) {
      console.log('Error creating list:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["WorldsGeekBackend"],
    queryFn: getList,
  });  

  useEffect(() => {
    if (data) {
      const filteredList = data.filter(list => list.UserId === userId);
      setFilteredData(filteredList || []);
    }
  }, [data, userId, message, messageType]);  

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

  return (
    <View style={styles.container}>

      {isFetching && <Text style={styles.fetch}>IS FETCHING</Text>}

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

      <View style={styles.buttonContainer}>
        <IconButton
          icon="plus"
          iconColor="#fff"
          size={30}
          style={styles.addButton}
          onPress={handleCreateList}
        />
      </View>

      {message && (
        <View style={[styles.messageContainer, { backgroundColor: messageType === 'error' ? '#CF2422' : '#31977b' }]}>
          <Text style={styles.messageText}>{message.message}</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={filteredData}
          keyExtractor={(item) => item.id}
          //keyExtractor={(item) => item?.id?.toString()} // Usar item.id.toString() como chave e optional chaining (?.) para evitar o erro
          renderItem={({ item }) => (
            <CardLists list={item} onPress={handleCardPress} />
          )}
        />
      </View>

      <Dialog visible={isCreatingList} onDismiss={() => setIsCreatingList(false)}>
        <Dialog.Title>Create New List</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="List Name"
            value={newListName}
            onChangeText={setNewListName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setIsCreatingList(false)}>Cancel</Button>
          <Button onPress={handleAddList}>Create</Button>
        </Dialog.Actions>
      </Dialog>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#16161d',
  },
  arrowIconContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
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
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  messageContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  messageText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#0B2D66',
  },
  fetch: {
    color: '#fff',
  }
});

export default ListScreen;