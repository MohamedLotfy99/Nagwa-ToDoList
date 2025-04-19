import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoListCard from "../atoms/ToDoListCard"; // adjust path if needed

interface Task {
  title: string;
  completed: boolean;
}

interface TodoList {
  id: number;
  title: string;
  tasks: Task[];
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("user") || "null");

  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const createNewTodoList = () => {
    const newList: TodoList = {
      id: Date.now(),
      title: `List #${todoLists.length + 1}`,
      tasks: [],
    };
    setTodoLists([...todoLists, newList]);
  };

  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  return (
    <div className="min-h-screen bg-#242424 p-8">
      <div className="grid gap-6">
        {todoLists.map((list) => (
          <TodoListCard
            key={list.id}
            list={list}
            onClick={() => navigate(`/todo/${list.id}`, { state: { list } })} // Pass the list to the TodoListPage
          />
        ))}
      </div>
      <div className="flex items-center mt-6">
        <button
          onClick={createNewTodoList}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          ➕ Create New To-Do List
        </button>
      </div>
    </div>
  );
};

export default Home;
