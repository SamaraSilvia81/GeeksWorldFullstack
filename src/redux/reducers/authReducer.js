// reducers/authReducer.js

const initialState = {
  loggedIn: false,
  signIn: false,
  username: null,
  error: null,
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loggedIn: false,
        username: null,
        error: action.payload,
      };
    case 'SIGNUP_SUCCESS': // Nova ação para indicar o sign up bem-sucedido
      return {
        ...state,
        signIn: true,
        username: action.payload.username,
        error: null,
    };
    case 'SIGNUP_ERROR': // Nova ação para indicar o sign up bem-sucedido
    return {
      ...state,
        signIn: false,
        username: null,
        error: action.payload,
    };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default authReducer;