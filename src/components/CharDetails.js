import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, FlatList } from 'react-native';

import { Button, Avatar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { createList, addCharacterToList } from '../backend/api';

const CharDetails = ({ character, lists }) => {

  const navigation = useNavigation();
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userId = useSelector((state) => state.auth.userId);
  const userLists = useSelector((state) => state.lists.lists);
  const characterLists = userLists.filter((list) => list.characters.includes(character.id));

  const handleButtonPress = () => {
    setIsButtonPressed((prevState) => !prevState);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const renderList = ({ item }) => (
    <TouchableOpacity onPress={() => handleAddToList(item.id)}>
      <Text style={styles.listItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleAddToList = async (listId) => {
    try {
      await addCharacterToList(character.id, listId, userId);
      setIsModalVisible(false);
    } catch (error) {
      console.log('Error adding character to list:', error);
      // Lógica para lidar com o erro ao adicionar o personagem à lista
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.oval} />

      <View style={styles.arrowIconContainer}>
        <Icon
          name="arrow-back"
          size={25}
          color="#FFFFFF"
          onPress={handleGoBack}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Avatar.Image source={{ uri: character.image }} size={110} />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{character.charname}</Text>
              <Text style={styles.nickname}>{character.alterego}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{character.about}</Text>
            </View>
          </View>
          <View style={styles.tagContainer}>
            <View style={styles.tagItem}>
              <Text style={styles.tagText}>{character.isMarvel ? 'Marvel' : 'DC'}</Text>
            </View>
            <View style={styles.tagItem}>
              <Text style={styles.tagText}>{character.isHero ? 'Hero' : 'Villian'}</Text>
            </View>
        </View>
        </View>
        <View style={styles.actions}>
          <Button
            mode="contained"
            style={[styles.button, isButtonPressed && styles.buttonPressed]}
            onPress={handleButtonPress}
          >
            {isButtonPressed ? 'Added in List' : 'Add to List'}
          </Button>
      </View>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Adicione o Personagem na...</Text>
          <Text style={styles.modalTitle}>Adicione o Personagem na...</Text>
            {characterLists.length > 0 ? (
              <FlatList
                data={lists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleAddToList(item.id)}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text>Nenhuma lista encontrada.</Text>
            )}
            <Button onPress={handleModalClose}>Cancelar</Button>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oval: {
    position: 'absolute',
    top: 0,
    width: '150%',
    height: 150,
    backgroundColor: '#23232e',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    zIndex: -1,
  },
  arrowIconContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
    padding: 5,
    top: 20,
    left: 3,
    zIndex: 1,
  },
  card:{
    marginTop: 30,
  },
  content: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    top: -70,
    left: '40%',
    marginLeft: -40,
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: 100,
    alignItems: 'flex-start',
    textAlign: 'justify'
  },
  nameContainer:{
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'justify',
  },
  nickname: {
    fontSize: 16,
    textAlign: 'justify',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'justify',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tagItem: {
    backgroundColor: '#F2F2F2', // F2F2F2 - 23232e
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 5,
  },
  tagText: {
    fontSize: 16,
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '80%',
    backgroundColor: "#CF2422" // #EF7377
  },
  buttonPressed: {
    backgroundColor: '#2A234B', // #2A234B 385993
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
});

export default CharDetails;