import { useState } from "react";

const TodoForm = ({ onCreate, loading }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    await onCreate(title.trim());

    setTitle("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "+ Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;