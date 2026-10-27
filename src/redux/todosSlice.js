
import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "../services/getTodo.js";
import { addTodo } from "../services/addTodo.js";
import { deleteTodo } from "../services/deleteTodo.js";
import { editTodo } from "../services/editTodo.js";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},

  // reducers: (builder) => {
  //   builder
  //   .addCase()   !!!!Для синхронних операцій!!!!
  // }

  extraReducers: (builder) => {                                        //ExtraReducers для асинхронних операцій, а звичайні reducres для синхронних
    builder
      .addCase(fetchTodos.fulfilled, (_, action) => action.payload)
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) =>
        state.filter((todo) => todo.id !== action.payload)
      )
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) state[index] = action.payload;    
      });
  },
});

export default todosSlice.reducer;
