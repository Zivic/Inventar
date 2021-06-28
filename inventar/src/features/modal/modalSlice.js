import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: true,
  },
  reducers: {
    toggle: state => {
      state.value = !state.value;
    },
    forceOpen: state => {
      state.value = true;
    },
    forceClose: state => {
      state.value = false;
    },
  },
});

export const { toggle, forceOpen, forceClose } = modalSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

//TODO: da li mi ovo treba?
export const selectModal = state => state.modal.value;

export default modalSlice.reducer;
