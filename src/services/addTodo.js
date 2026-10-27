import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "./apiSource";

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text) => {
    console.log(text)
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error("Помилка додавання");
    return response.json();
  }
);