// import {createSlice, createReducer, PayloadAction} from '@reduxjs/toolkit';
//
// const initialState = {
//   productReleases: [],
//   loadedProductRelease: null,
//   fetchingState: 'none',
//   creatingState: 'none',
//   loadingState: 'none',
//   error: null,
// };
//
// const counterReducer = createReducer(initialState, {
//   // [productReleasesFetching]: (state, action) => {
//   //   state.fetchingState = 'requesting'
//   // },
//   //
// });
//
// export interface Todo {
//   id?: string;
//   message: string;
//   completed: boolean;
// }
//
// const todos = createSlice({
//   name: 'todos',
//   initialState: [] as Todo[],
//   reducers: {
//     addTodo: (state, action: PayloadAction<string>) => {
//       state.push({message: action.payload, completed: false});
//       return state;
//     },
//     deleteTodo: (state, action: PayloadAction<string>) => state.filter((todo) => todo.id !== action.payload),
//     completeTodo: (state, action: PayloadAction<string>) => {
//       const completedTodo = state.find((todo) => todo.id === action.payload);
//       completedTodo.completed = true;
//       return state;
//     },
//     sort: (state) => state.sort((a, b) => a.message.localeCompare(b.message)),
//   },
// });
//
// export default todos;
