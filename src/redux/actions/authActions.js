import { getUsers } from '../../backend/api';

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const users = await getUsers();

      const foundUser = users.find(
        (user) =>
          user.username.trim().toLowerCase() === username.trim().toLowerCase() &&
          user.password.trim() === password
      );

      if (foundUser) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: 'Credenciais válidas' });
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: 'Credenciais inválidas' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Erro na autenticação' });
      console.error(error);
    }
  };
};