import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  loading,
  onToggle,
  onDelete,
  actionLoading,
}) => {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>

        <h3>No todos found</h3>

        <p>
          Try changing your search or filter,
          or create a new todo.
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          actionLoading={actionLoading}
        />
      ))}
    </div>
  );
};

export default TodoList;