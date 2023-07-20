import React, { useState, useEffect, useRef } from "react";
import "./app.css";
import addImg from "./assets/add.png";
import editImg from "./assets/edit2.png";
import deleteImg from "./assets/delete.png";
import completeImg from "./assets/check.png";
import writeImg from "./assets/implementer.png";
import closeImg from "./assets/close.png";
const App = () => {
  /* The line `const [todos, setTodos] = useState([]);` is using the `useState` hook to create a state
variable called `todos` and a corresponding setter function called `setTodos`. The initial value of
`todos` is set to an empty array `[]`. This state variable is used to store the list of todo items
in the application. The `setTodos` function is used to update the value of the `todos` state
variable. */
  const [todos, setTodos] = useState([]);
  /* The line `const [editingTodoId, setEditingTodoId] = useState(null);` is using the `useState` hook to
create a state variable called `editingTodoId` and a corresponding setter function called
`setEditingTodoId`. The initial value of `editingTodoId` is set to `null`. This state variable is
used to keep track of the ID of the todo item that is currently being edited. */
  const [editingTodoId, setEditingTodoId] = useState(null);
  /* The line `const todoInputRef = useRef(null);` is creating a ref object called `todoInputRef` using
the `useRef` hook. This ref will be used to reference an input element in the component. The initial
value of the ref is set to `null`. */
  const todoInputRef = useRef(null);
  /* The line `const todoEditInputRef = useRef(null);` is creating a ref object called
 `todoEditInputRef` using the `useRef` hook. This ref will be used to reference an input element in
 the component. The initial value of the ref is set to `null`. */
  const todoEditInputRef = useRef(null);

  useEffect(() => {
    // Load todos from local storage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  /**
   * The addTodo function adds a new todo item to the todos array and stores it in local storage.
   */
  const addTodo = () => {
    const todoText = todoInputRef.current.value;
    if (todoText.trim() !== "") {
      const newTodo = { id: Date.now(), complete: false, text: todoText };
      setTodos([...todos, newTodo]);
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      todoInputRef.current.value = "";
    }
  };

  /**
   * The `toggleComplete` function updates the `complete` property of a todo item with the given `id` and
   * saves the updated todos to local storage.
   * @param id - The `id` parameter is the unique identifier of the todo item that needs to be toggled.
   */
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  /**
   * The `deleteTodo` function removes a todo item from an array of todos and updates the todos in local
   * storage and state.
   * @param id - The `id` parameter represents the unique identifier of the todo item that needs to be
   * deleted.
   */
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  /**
   * The `editTodo` function sets the editingTodoId and updates the value of the todoInputRef.
   * @param id - The id parameter represents the unique identifier of the todo item that needs to be
   * edited.
   * @param value - The value parameter represents the new value that you want to set for the todo item
   * with the specified id.
   */
  const editTodo = (id, value) => {
    setEditingTodoId(id);
    todoInputRef.current.value = value;
  };

  /**
   * The `updateTodo` function updates the text of a specific todo item in an array of todos and saves
   * the updated todos to local storage.
   */
  const updateTodo = () => {
    const newText = todoEditInputRef.current.value;
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    todoEditInputRef.current.value = "";
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  /**
   * The function `cancelEdit` sets the `editingTodoId` state to `null`
   */
  const cancelEdit = () => {
    setEditingTodoId(null);
  };

  // ...

  return (
    <div className="main">
      {editingTodoId !== null ? (
        <div className="input">
          <input type="text" ref={todoEditInputRef} placeholder="Add a todo" />
          <button onClick={updateTodo}>
            {" "}
            <span>Update</span> <img src={addImg} alt="add" width="18px" />{" "}
          </button>
          <img
            src={closeImg}
            alt="add"
            width="10px"
            onClick={cancelEdit}
            style={{ marginTop: "-5%", cursor: "pointer" }}
          />{" "}
        </div>
      ) : (
        <div className="input">
          <input type="text" ref={todoInputRef} placeholder="Add a todo" />
          <button onClick={addTodo}>
            {" "}
            <span>Add</span> <img src={addImg} alt="add" width="18px" />{" "}
          </button>
        </div>
      )}

      {todos?.length > 0 ? (
        <div className="list">
          <ul>
            {todos.map((todo, index) => (
              <li key={todo.id}>
                <div>
                  <span className="index">{index + 1} .</span>
                  <span
                    className="text"
                    style={{
                      textDecoration: todo.complete ? "line-through" : "none",
                      opacity: todo.complete ? "0.5" : "1",
                    }}
                  >
                    {todo.text}
                  </span>
                </div>

                <div className="btns">
                  <button onClick={() => toggleComplete(todo.id)}>
                    <img src={completeImg} width="23px" />
                  </button>
                  {todo.complete === false && (
                    <button onClick={() => editTodo(todo.id, todo.text)}>
                      <img src={editImg} width="23px" />
                    </button>
                  )}
                  <button onClick={() => deleteTodo(todo.id)}>
                    <img src={deleteImg} width="23px" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="empty">
          <img src={writeImg} width="100px" style={{ marginTop: "10%" }} />
        </div>
      )}
    </div>
  );
};

export default App;
