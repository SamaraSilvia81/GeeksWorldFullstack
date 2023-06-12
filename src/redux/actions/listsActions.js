export const setLists = (lists) => ({
    type: 'SET_LISTS',
    payload: lists,
});  

export const showMessage = (message, type) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    message,
    type,
  },
});

export const clearMessage = () => ({
  type: 'CLEAR_MESSAGE',
});