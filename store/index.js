import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import counterReducer from './reducers/counterReducer.js';
import usersReducer from './reducers/users.js';

const rootReducer = combineReducers({
  counterReducer: counterReducer,
  usersReducer: usersReducer,
});

const persistConfig = {
  key: 'test',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};
const middleware = [thunk];
const configureStore = () => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
