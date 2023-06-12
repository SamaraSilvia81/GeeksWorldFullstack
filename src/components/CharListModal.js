import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

export const CharListModal = ({ visible, characters, onSelect, onAdd }) => {
    
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleAddCharacter = () => {
    onAdd(selectedCharacter);
    setSelectedCharacter(null);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Characters Available</Text>
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.characterItem, selectedCharacter?.id === item.id && styles.selectedCharacter]}
                onPress={() => handleSelectCharacter(item)}
              >
                <Text style={styles.characterName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <Button
            title="Add"
            onPress={handleAddCharacter}
            disabled={!selectedCharacter}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  characterItem: {
    paddingVertical: 10,
  },
  selectedCharacter: {
    backgroundColor: 'lightblue',
  },
  characterName: {
    fontSize: 16,
  },
});