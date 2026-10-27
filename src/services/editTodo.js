import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "./apiSource";


export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, text }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error("Помилка редагування");
    return response.json();
  }
);