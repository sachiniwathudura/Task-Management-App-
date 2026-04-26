import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo
} from "../store/todosSlice";


import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading, adding, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

return (
  <div className="page">
    <div className="container">
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
