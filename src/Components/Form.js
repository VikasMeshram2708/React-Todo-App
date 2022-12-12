import React, { useCallback, useEffect, useState } from "react";

const Form = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };
  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      if (!newTodo.trim()) return; // prevent from submitting null values
      setTodos([
        {
          // what new value we need to pass in here...
          id: todos.length ? todos[0].id + 1 : 1,
          content: newTodo,
          done: false,
        },
        ...todos,
      ]);
      setNewTodo("");
    },
    [newTodo, todos]
  );
  //   console.log("todos", todos);

  useEffect(() => {
    // console.log("todos", todos);
  }, [todos]);

  const addTodo = useCallback(
    (todo, index) => (event) => {
      // const newTodos = todos.slice();
      const newTodos = [...todos];
      newTodos.splice(index, 1, {
        ...todo,
        done: !todo.done,
      });
      setTodos(newTodos);
      //   console.log(event.target.checked);
    },
    [todos]
  );

  const removeTodo = useCallback(
    (todo) => (event) => {
      // console.log("remove-todo", todo.content);
      setTodos(todos.filter((otherTodo) => otherTodo !== todo));
    },
    [todos]
  );

  const markAllDone = useCallback(() => {
    const updatedTodos = todos.map((todo) => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <>
      <form className="container mt-5 " onSubmit={formSubmitted}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <h3>Enter a Todo</h3>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g wake up early..."
            value={newTodo}
            onChange={onNewTodoChange}
          />
        </div>
        <button className="btn btn-outline-danger rounded" type="submit">
          Add Todo
        </button>

        <button className="btn btn-outline-success mx-2" onClick={markAllDone}>
          Mark All Done
        </button>

        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={todo.id}>
                <input
                  checked={todo.done}
                  type="checkbox"
                  className="mx-3 mt-4"
                  onChange={addTodo(todo, index)}
                />
                <span
                  className={todo.done ? "text-decoration-line-through" : ""}
                >
                  {todo.content}
                </span>
                <button
                  onClick={removeTodo(todo)}
                  className="mx-3 rounded btn btn-danger"
                >
                  Remove Todo
                </button>
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
};

export default Form;
