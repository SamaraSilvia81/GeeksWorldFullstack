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
        dispatch({ type: 'LOGIN_SUCCESS', payload: { username, userId: foundUser.id } }); // Inclua o userId no payload
        console.log('Logged in with userId:', foundUser.id); // Exibe o userId no console
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: 'Invalided Credential' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Authentication Error' });
      console.error(error);
    }
  };
};
