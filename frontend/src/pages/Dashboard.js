import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo
} from "../store/todosSlice";

import { useNavigate } from "react-router-dom";

import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, adding, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  }

  return (
    <div className="page">
      <div className="container">

        <div className="top-bar">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h2 className="heading">📄 TODOs</h2>

        {error && <p className="error">{error}</p>}

        <TodoForm
          loading={adding}
          onAdd={(data) => dispatch(addTodo(data))}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          items.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={(id) => dispatch(toggleTodo(id))}
              onDelete={(id) => dispatch(deleteTodo(id))}
              onUpdate={(id, payload) =>
                dispatch(updateTodo({ id, payload }))
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
