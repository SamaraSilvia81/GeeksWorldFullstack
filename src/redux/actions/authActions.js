import axios from 'axios';

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://192.168.56.1:3000/user/login', {
        username: username,
        password: password,
      });
      if (response.data.success) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.message });
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: response.data.message });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Erro na autenticação' });
      console.error(error);
    }
  };
};