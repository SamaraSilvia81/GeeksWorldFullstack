import React, { useState, useEffect} from 'react';
import { Modal, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { getCharacter  } from "../backend/api";

export const CharModal = ({ visible, setModalVisible, myList, onAdd }) => {

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [availableCharacters, setAvailableCharacters] = useState([]);

  useEffect(() => {
    getCharacter()
      .then((characters) => {
        const filteredCharacters = characters.filter((character) => {
          return !myList.some((item) => item.id === character.id);
        });
        const sortedCharacters = filteredCharacters.sort((a, b) =>
          a.charname.localeCompare(b.charname)
        );
        setAvailableCharacters(sortedCharacters);
      })
      .catch((error) => {
        console.log('Erro ao obter personagens:', error);
      });
  }, [myList]);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleAddCharacter = () => {
    if (selectedCharacter) {
      onAdd(selectedCharacter);
    }
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setModalVisible(false);
  };  

  return (

    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle} variant="headlineSmall">Characters Available</Text>
          <FlatList
            data={availableCharacters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.characterItem,
                  selectedCharacter?.id === item.id && styles.selectedCharacter,
                ]}
                onPress={() => handleSelectCharacter(item)}
              >
               <Text
                  style={[
                    styles.characterName,
                    { color: selectedCharacter?.id === item.id ? '#000000' : '#FFFFFF' },
                  ]}
                  variant="titleSmall"
                >
                  {item.charname}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.buttonContainer}>
          <Button 
              mode="contained"
              buttonColor='#fff'
              onPress={handleCloseModal}
              style={styles.cancelButton} 
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              buttonColor='#fff'
              onPress={handleAddCharacter}
              disabled={!selectedCharacter}
              style={styles.addButton}
            >
              Add
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // #23232e
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#23232e', // 23232e
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
  },
  modalTitle: {
    color: '#fff',
    paddingBottom: 5,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  characterItem: {
    color: '#fff',
    paddingVertical: 10,
  },
  selectedCharacter: {
    backgroundColor: '#dedee6', // dedee6
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#0B2D66', // 008000 
    color: 'fff',
    width: '50%',
  },
  cancelButton: {
    backgroundColor: '#CF2422', // FF0000
    marginRight: 10,
    width: '50%',
  },
});