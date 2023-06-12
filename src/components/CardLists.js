import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, TextInput, IconButton } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';

import { updateList, deleteList } from '../backend/api';
import { setLists, showMessage, clearMessage } from '../redux/actions/listsActions';

export const CardLists = ({ list, onPress  }) => {

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const lists = useSelector((state) => state.lists.lists);

  const [listname, setListname] = useState(list.listname);
  const [filteredData, setFilteredData] = useState([list]); // Inicialize o estado com os dados iniciais da lista

  const handleEditPress = () => {
    setEditMode(true);
    setListname(list.listname);
  };

  const handleSaveEdit = () => {
    // Aqui você pode chamar a função para atualizar a lista no backend
    updateList(list.id, listname)
      .then(() => {
        setEditMode(false);
        dispatch(showMessage('List edited successfully!'));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 800); 
      })
      .catch((error) => {
        console.log('Error updating list:', error);
      });
  };

  const handleCancelEdit = () => {
    setListname(list.listname || '');
    setEditMode(false);
  };

  const handleDeletePress = () => {
    console.log('Deleting list with ID:', list.id);

    deleteList(list.id)
      .then(() => {
        dispatch(showMessage('List deleted successfully!', 'success'));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 800);

        // Atualize o estado `lists` no Redux para refletir a exclusão da lista
        const updatedLists = lists.filter((item) => item.id !== list.id);
        dispatch(setLists(updatedLists));
      })
      .catch((error) => {
        console.log('Error deleting list:', error);
        dispatch(showMessage('Failed to delete list. Please try again.', 'error'));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 800);
      });
  };

  console.log('list', list);
  console.log('listname', listname);
  
  return (
    <TouchableOpacity onPress={() => onPress(list)}>
      <View style={styles.item}>
        <View style={styles.card}>
          {editMode ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={listname}
                onChangeText={setListname}
              />
              <IconButton
                icon="content-save"
                iconColor="#fff"
                size={20}
                style={styles.saveButton}
                onPress={handleSaveEdit}
              />
              <IconButton
                icon="close"
                iconColor="#fff"
                size={20}
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              />
            </View>
          ) : (
            <>
              <Text variant="headlineMedium" style={styles.titleItem}>
                {listname}
              </Text>
              <View style={styles.buttonContainer}>
                <IconButton
                  icon="pencil"
                  iconColor="#fff"
                  size={20}
                  style={styles.pencil}
                  onPress={handleEditPress}
                />
                <IconButton
                  icon="delete"
                  iconColor="#fff"
                  size={20}
                  style={styles.delete}
                  onPress={handleDeletePress}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#23232e', // 0B2D66
  },
  titleItem: {
    marginTop: 70,
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-end',
    padding: 10,
  },
  pencil: {
    backgroundColor: '#0B2D66',
  },
  delete: {
    backgroundColor: '#CF2422',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#000',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#31977b', // 008000
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#CF2422', // FF0000
  },
});