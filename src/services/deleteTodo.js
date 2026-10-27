import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "./apiSource";

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Помилка видалення");
    return id;
  }
);