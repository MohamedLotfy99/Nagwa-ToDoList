import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";
import { Task, TodoList } from "../../types"; // Adjust the import path as necessary

const useTodoListPage = () => {  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("user") || "null");

  const [list, setList] = useState<TodoList>();
  const listId = location.state?.listId; // Assuming you pass the list from the HomePage

  const [tasks, setTasks] = useState<Task[]>();
  const [debounceTasks] = useDebounce(tasks, 500); // Assuming you have a debounce function
  const [title, setTitle] = useState(list?.title || "");
  const [allTodoLists, setAllTodoLists] = useState<TodoList[]>(
    location.state?.todoLists || []
  );

  useEffect(() => {
    fetch(`http://localhost:5000/api/todolists/${user.id}/${listId}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setTitle(data?.title); // Set the title from the fetched list
      })
      .catch((err) => console.error("Error fetching to-do lists:", err));
  }, []);

  useEffect(() => {
    if (user) {
      setTasks(list?.tasks);
      fetch(`http://localhost:5000/api/tasks/${user.id}/${listId}`)
        .then((res) => res.json())
        .then((data) => setTasks(data || []))
        .catch((err) => console.error("Error fetching to-do lists:", err));
    }
  }, [user, list]);

  useEffect(() => {
    if (debounceTasks) {
      tasksUpdateAPI(debounceTasks);
    }
  }, [debounceTasks]);

  const tasksUpdateAPI = async (updatedTasks: Task[] | undefined) => {
    setTasks(updatedTasks);
    fetch(`http://localhost:5000/api/tasks/${user.id}/${listId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTasks),
    });
  };

  const createNewTask = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault(); // ✅ This prevents the page reload
    e?.stopPropagation();

    const newTask: Task = {
      id: Date.now(),
      title: `Task #${(tasks?.length || 0) + 1}`,
      completed: false,
    };
    const updatedTasks = [...(tasks || []), newTask];
    // updateTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const updateTask = (id: number, newTitle: string) => {
    setTasks((prev) => {
      const newTasks = prev?.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      );
      // updateTasks(newTasks);
      return newTasks;
    });
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => {
      const newTasks = prev?.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      // updateTasks(newTasks);
      return newTasks;
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => {
      const newTasks = prev?.filter((task) => task.id !== id);
      // updateTasks(newTasks);
      return newTasks;
    });
  };

  const calculateProgress = useCallback(() => {
    if ((tasks?.length || 0) === 0) return 0;
    const completed = tasks?.filter((t) => t.completed).length;

    return Math.round(((completed || 0) / (tasks?.length || 1)) * 100);
  }, [tasks]);

  const handleListTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!list) {
      return;
    }
    setTitle(e.target.value);
    const updatedList = {
      ...list,
      title: e.target.value,
    };
    const updatedTodoLists = allTodoLists.map((l) =>
      l.id === updatedList.id ? updatedList : l
    );
    console.log("debug", updatedTodoLists);
    setAllTodoLists(updatedTodoLists);

    fetch(`http://localhost:5000/api/todolists/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodoLists),
    });
  };
  return {
        list,
        tasks,
        title,
        createNewTask,
        updateTask,
        toggleTask,
        deleteTask,
        calculateProgress,
        handleListTitleChange,
    };
}
    
    

export default useTodoListPage;