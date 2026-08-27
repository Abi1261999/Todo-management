const TodoFilters = ({
  search,
  setSearch,
  filter,
  setFilter,
}) => {
  return (
    <div className="filters">

      <div className="search-wrapper">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-buttons">

        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>

    </div>
  );
};

export default TodoFilters;