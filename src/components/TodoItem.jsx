const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  actionLoading,
}) => {
  return (
    <div className="todo-item">

      <div
        className={`todo-checkbox ${
          todo.completed ? "checked" : ""
        }`}
        onClick={() => onToggle(todo)}
      >
        {todo.completed && "✓"}
      </div>

      <div className="todo-content">

        <h3
          className={
            todo.completed ? "completed-title" : ""
          }
        >
          {todo.title}
        </h3>

        <div className="todo-meta">

          <span
            className={`status ${
              todo.completed
                ? "completed-status"
                : "pending-status"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>

          <span className="todo-id">
            ID: #{todo.id}
          </span>

          <span className="user-id">
            User: {todo.userId}
          </span>

        </div>

      </div>

      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        disabled={actionLoading}
        title="Delete todo"
      >
        🗑
      </button>

    </div>
  );
};

export default TodoItem;