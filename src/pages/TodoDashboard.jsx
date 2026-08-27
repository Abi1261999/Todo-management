import { useEffect, useMemo, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoFilters from "../components/TodoFilters";

const TodoDashboard = () => {
  const [todos, setTodos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      setError("Unable to load todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (title) => {
    try {
      setActionLoading(true);
      setError("");

      const newTodo = await createTodo({
        userId: 1,
        title,
        completed: false,
      });

      setTodos((currentTodos) => [
        {
          ...newTodo,
          id: Date.now(),
        },
        ...currentTodos,
      ]);
    } catch (err) {
      setError("Unable to create todo.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggle = async (todo) => {
    try {
      setActionLoading(true);
      setError("");

      const updatedTodo = await updateTodo(todo.id, {
        ...todo,
        completed: !todo.completed,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === todo.id
            ? {
                ...item,
                completed: updatedTodo.completed,
              }
            : item
        )
      );
    } catch (err) {
      setError("Unable to update todo.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await deleteTodo(id);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id)
      );
    } catch (err) {
      setError("Unable to delete todo.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed);

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingCount = todos.length - completedCount;

  return (
    <div className="dashboard">
      <div className="dashboard-container">

        <header className="dashboard-header">
          <div>
            <p className="eyebrow">PRODUCTIVITY</p>

            <h1>Todo Management</h1>

            <p className="subtitle">
              Organize your tasks and stay productive.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={fetchTodos}
            disabled={loading}
          >
            ↻ Refresh
          </button>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="stats-grid">

          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{todos.length}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>

        </div>

        <TodoForm
          onCreate={handleCreate}
          loading={actionLoading}
        />

        <TodoFilters
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <TodoList
          todos={filteredTodos}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          actionLoading={actionLoading}
        />

      </div>
    </div>
  );
};

export default TodoDashboard;