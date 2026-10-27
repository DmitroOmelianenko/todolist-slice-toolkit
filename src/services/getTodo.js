import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "./apiSource";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Помилка завантаження");
    return response.json();
  }
);