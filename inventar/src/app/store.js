import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import modelReducer from '../features/modal/modalSlice';
import korisnikReducer from '../features/korisnik/korisnikSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    modal: modelReducer,
    korisnik: korisnikReducer,
  },
});
