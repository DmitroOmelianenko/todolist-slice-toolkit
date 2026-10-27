

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { fetchTodos } from "./services/getTodo.js";
import { addTodo } from "./services/addTodo.js";
import { deleteTodo } from "./services/deleteTodo.js";
import { editTodo } from "./services/editTodo.js";

function App() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) =>
    Array.isArray(state.todos) ? state.todos : []
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const text = form.elements.newTodo.value.trim();

    if (!text) return;

    const result = await dispatch(addTodo(text));

    if (addTodo.fulfilled.match(result)) {
      form.reset();
    }
    console.log(result, "test")
    console.log(text, "test")
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo, e) => {
    const input = e.currentTarget.parentElement.querySelector(".editInput");
    const text = input.value.trim();

    if (!text || text === todo.text) return;

    dispatch(editTodo({ id: todo.id, text }));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>ToDo List</h2>

      <input
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleAdd}>
        <input
          name="newTodo"
          placeholder="Введіть задачу..."
        />
        <button type="submit">Додати</button>
      </form>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>

            <button onClick={() => handleDelete(todo.id)}>
              Видалити
            </button>

            <button onClick={(e) => handleEdit(todo, e)}>
              Редагувати
            </button>

            <input
              className="editInput"
              defaultValue={todo.text}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
