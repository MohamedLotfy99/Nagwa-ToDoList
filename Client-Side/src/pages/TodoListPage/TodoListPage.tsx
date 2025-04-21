import useTodoListPage from "./useTodoListPage";

const TodoListPage = () => {
  const {
    list,
    tasks,
    title,
    createNewTask,
    updateTask,
    toggleTask,
    deleteTask,
    calculateProgress,
    handleListTitleChange,
  } = useTodoListPage();

  if (!list) {
    return <p>Loading.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <input
        className="text-2xl font-bold mb-4"
        type="text"
        value={title}
        onChange={(e) => handleListTitleChange(e)}
      ></input>

      <div className="bg-gray-200 w-full h-4 rounded overflow-hidden mb-4">
        <div
          className="bg-blue-600 h-full"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <ul className="space-y-2 mb-4">
        {tasks?.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-white p-5 text-black rounded shadow"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <input
              className="flex-1 mx-2 border-b border-gray-300 focus:outline-none"
              value={task.title}
              onChange={(e) => updateTask(task.id, e.target.value)}
            />
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => createNewTask(e)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
      >
        <span className="text-white text-2xl font-bold">+</span>
        <span className="text-white text-sm mt-1.5">Add Task</span>
      </button>
    </div>
  );
};

export default TodoListPage;
