// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // Puedes agregar configuraciones adicionales aquí si es necesario
});

export default store;
