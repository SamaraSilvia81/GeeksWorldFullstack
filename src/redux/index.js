import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import listsReducer from './reducers/listsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer,
});

export default rootReducer;