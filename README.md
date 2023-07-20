Introduction

React is a powerful and popular JavaScript library for building modern user interfaces. One of the key features that makes React so versatile and efficient is the concept of "hooks." Hooks provide a way to use state and other React features in functional components, allowing developers to create robust applications with less boilerplate code.

In this comprehensive guide, we will explore three fundamental hooks in React: useState, useEffect, and useRef. Understanding these hooks is essential for any React developer, as they significantly enhance the functionality and maintainability of your components.

useState Hook: The useState hook is a built-in React hook that allows functional components to have stateful behavior. With useState, you can add state variables to your components without the need for class-based components and the complexities of managing state manually.

Using the useState hook, you can declare and initialize state variables within your functional components, and React will automatically manage their state across renders. Whenever the state changes, React efficiently updates the UI, ensuring a seamless user experience.

useEffect Hook: The useEffect hook is another crucial built-in hook in React that enables you to perform side effects in functional components. Side effects in React refer to actions that go beyond rendering, such as fetching data from an API, subscribing to events, or interacting with the DOM.

With useEffect, you can handle side effects in a declarative manner. This hook allows you to define functions that execute after every render or only when specific dependencies change. This ensures that side effects are performed at the right times, avoiding unnecessary computations and potential memory leaks.

useRef Hook: The useRef hook provides a way to create a mutable reference to a DOM element or a value that persists across renders. Unlike useState, using useRef does not trigger re-renders when the reference is modified.

useRef is commonly used for accessing and manipulating DOM elements directly. It allows you to retain references to elements and access their properties and methods without the need for class-based component methods like getElementById or querySelector.

Throughout this article, we will dive into each of these hooks, discussing their use cases, best practices, and potential pitfalls. We will build a feature-rich to-do list application step-by-step, illustrating how to leverage these hooks to create efficient and maintainable code. By the end of this guide, you will have a solid understanding of how to utilize useState, useEffect, and useRef effectively in your React projects, empowering you to build sophisticated applications with ease. Let's get started!

Prerequisites

Before diving into the article, make sure you have a basic understanding of JavaScript and React concepts. Familiarity with functional components and JSX syntax will be beneficial.

Setting up the Project

To begin, let's set up the project and create the basic structure of our to-do list application.

Step 1: Create a new react project 

npx create-react-app todoApp

Step 2: Setup your folder structure

Creating the To-Do List Application

Let's proceed with building the to-do list application step by step.

Step 1: Initialize the State with useState Hook

import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Rest of the code...
}


In this step, we imported the useState hook from React and initialized two state variables: todos to manage the list of to-do items and inputValue to keep track of the input field value for adding new to-do items.

Step 2: Rendering the To-Do List

import React, { useState } from 'react';

function App() {
  // ...

  return (
    <div>
      <h1>My To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new to-do item..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}


In this step, we rendered the basic structure of the to-do list application, including an input field, an "Add" button, and a list to display the to-do items. We also mapped over the todos array to render each to-do item as an <li> element in the list.

Step 3: Adding New To-Do Items

import React, { useState } from 'react';

function App() {
  // ...

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setInputValue('');

    }
  };

  // ...

  return (
    <div className="todo-app">
      {/* ... */}
      <button onClick={addTodo}>Add</button>
      {/* ... */}
    </div>
  );
}


In this step, we added the addTodo function to handle the logic for adding new to-do items. We check if the inputValue is not empty and then use the setTodos function to update the todos state with the new to-do item. After adding the item, we reset the inputValue state to an empty string and store the todo's to our localstorage using the localstorage.setItems event.

Step 4: Handling Side Effects with useEffect Hook

import React, { useState, useEffect } from 'react';

function App() {
  // ...

  useEffect(() => {
    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // ...

  return (
    <div className="todo-app">
      {/* ... */}
    </div>
  );
}


In this step, we introduced the useEffect hook to handle side effects. We used it to save the todos state to local storage whenever we load our app. The useEffect hook runs after the initial render. This ensures that our to-do list data persists even after the page is refreshed.

Step 5: Deleting To-Do Items

import React, { useState, useEffect } from 'react';

function App() {
  // ...

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  // ...

  return (
    <div className="todo-app">
      {/* ... */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


In this step, we implemented the deleteTodo function to handle the removal of to-do items. When the "Delete" button is clicked, the corresponding to-do item is removed from the todos state array using the splice method.

Step 6: Marking To-Do Items as Completed

import React, { useState, useEffect } from 'react';

function App() {
  // ...

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = `${todos[index]} (completed)`;
    setTodos(updatedTodos);
  };

  // ...

  return (
    <div className="todo-app">
      {/* ... */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              className={todo.includes('(completed)') ? 'completed' : ''}
              onClick={() => toggleComplete(index)}
            >
              {todo.replace('(completed)', '')}
            </span>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


In this step, we added the toggleComplete function to mark to-do items as completed. When a to-do item is clicked, it is updated with the suffix "(completed)". We also added a class called "completed" to the to-do item's text to apply a CSS style indicating completion.

Step 7: Editing To-Do Items with useRef Hook

import React, { useState, useEffect, useRef } from 'react';

function App() {
  // ...

  const [editingTodoId, setEditingTodoId] = useState(null);
  const editInputRef = useRef(null);

  const editTodo = (index) => {
    setEditingTodoId(index);
  };

  const updateTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editInputRef.current.value;
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  // ...

  return (
    <div className="todo-app">
      {/* ... */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingTodoId === index ? (
              <input
                type="text"
                ref={editInputRef}
                defaultValue={todo}
                onBlur={() => updateTodo(index)}
                autoFocus
              />
            ) : (
              <span
                className={todo.includes('(completed)') ? 'completed' : ''}
                onClick={() => toggleComplete(index)}
              >
                {todo.replace('(completed)', '')}
              </span>
            )}
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


In this final step, we introduced the useRef hook to implement the "Edit" feature. We added an editInputRef ref to handle the editing input field. When the "Edit" button is clicked, we set the editingTodoId state to the index of the to-do item being edited. The input field appears, allowing the user to edit the text.

Conclusion:

In this in-depth guide, we embarked on a journey to master three fundamental React hooks: useState, useEffect, and useRef. By building a feature-rich to-do list application from scratch, we explored the power and versatility of these hooks. Through step-by-step explanations and practical examples, we gained a deeper understanding of how to leverage these hooks effectively in our React projects.

With useState, we learned how to manage component state seamlessly, allowing us to build interactive and dynamic user interfaces without the complexities of class-based components. useEffect enabled us to handle side effects declaratively, ensuring our applications perform efficiently and maintain a clean, readable codebase. Lastly, useRef empowered us to access and modify DOM elements directly, simplifying our interactions with the UI.

Now that you have a solid grasp of these essential React hooks, the possibilities for your React projects are endless. You can apply these concepts to develop sophisticated applications with enhanced state management and optimized performance.

To view the complete project and its source code, you can find it on GitHub. Click on the link below to access the repository:

GitHub Repository - To-Do List App

Additionally, you can find an image of the complete to-do list application with some additional styling below :

With this newfound knowledge and a fully functional to-do list application at your disposal, you're well-equipped to tackle more complex React projects and take your development skills to the next level. Happy coding!
