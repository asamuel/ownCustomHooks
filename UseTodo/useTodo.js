import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-UseReducer/todoReducer";

const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handlerNewTodo = (todo) => {
    const action = {
      type: "[TODO] add todo",
      payload: todo,
    };
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] delete todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "[TODO] toggle todo",
      payload: id,
    });
  };

  return {
    todos,
    allTodos: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
    handlerNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
