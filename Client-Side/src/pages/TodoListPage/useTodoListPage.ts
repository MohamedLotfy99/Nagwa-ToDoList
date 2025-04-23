import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";
import { Task, TodoList } from "../../types";

const useTodoListPage = () => {
  // Get routing info and extract user and list ID from state or localStorage
  const location = useLocation();
  const user = location.state?.user || JSON.parse(localStorage.getItem("user") || "null");
  const [list, setList] = useState<TodoList>();
  const listId = location.state?.listId;

  // Main task state and supporting states
  const [tasks, setTasks] = useState<Task[]>([]);
  const [debounceTasks] = useDebounce(tasks, 500); // Delay sending updates to API
  const [title, setTitle] = useState("");
  const [allTodoLists, setAllTodoLists] = useState<TodoList[]>(location.state?.todoLists || []);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 🔑 Keyboard shortcut handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + N to add new task
      if ((e.altKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        createNewTask();
      }

      // Arrow keys to navigate tasks
      if (selectedTaskIndex !== null && tasks.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedTaskIndex((prev) =>
            prev === null || prev >= tasks.length - 1 ? 0 : prev + 1
          );
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedTaskIndex((prev) =>
            prev === null || prev <= 0 ? tasks.length - 1 : prev - 1
          );
        }

        // Space to toggle completion if not editing
        if (!isEditing && e.key === " ") {
          e.preventDefault();
          const task = tasks[selectedTaskIndex];
          if (task) toggleTask(task.id);
        }

        // Delete key to remove task
        if (e.key === "Delete") {
          e.preventDefault();
          const task = tasks[selectedTaskIndex];
          if (task) deleteTask(task.id);
        }

        // Alt + E or Enter to focus/edit task input
        if ((e.altKey && e.key === "e") || e.key === "Enter") {
          e.preventDefault();
          const taskInput = document.getElementById(`task-input-${selectedTaskIndex}`);
          if (taskInput){
            if (document.activeElement === taskInput){
              taskInput.blur();
            } else {
              taskInput.focus();
            }
          }
        }
      }
    };

    // Attach and clean up key listener
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [tasks, selectedTaskIndex, isEditing]);

  // 🗂 Fetch current todo list data when the page loads
  useEffect(() => {
    fetch(`http://localhost:5000/api/todolists/${user.id}/${listId}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setTitle(data?.title);
        setTasks(data?.tasks || []);
      })
      .catch((err) => console.error("Error fetching list:", err));
  }, []);

  // 💾 Update tasks on server only when user stops editing (debounced)
  useEffect(() => {
    if (debounceTasks && list) {
      tasksUpdateAPI(debounceTasks);
    }
  }, [debounceTasks]);

  // 🔄 POST updated tasks to the backend
  const tasksUpdateAPI = async (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    await fetch(`http://localhost:5000/api/tasks/${user.id}/${listId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTasks),
    });
  };

  // ➕ Add a new empty task
  const createNewTask = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    const newTask: Task = {
      id: Date.now(),
      title: undefined,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  // ✏️ Update the title of a specific task
  const updateTask = (id: number, newTitle: string) => {
    setTasks((prev) => prev.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  // ✅ Toggle completion status of a task
  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // ❌ Remove a task by ID
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 🟰 Handle task reordering after drag and drop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reordered] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reordered);

    setTasks(newTasks); // trigger debounce update
  };

  // 📊 Calculate the percentage of completed tasks
  const calculateProgress = useCallback(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  // 📝 Handle renaming the todo list title and syncing with server
  const handleListTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!list) return;
    const newTitle = e.target.value;
    setTitle(newTitle);

    const updatedList = { ...list, title: newTitle };
    const updatedTodoLists = allTodoLists.map((l) =>
      l.id === updatedList.id ? updatedList : l
    );
    setAllTodoLists(updatedTodoLists);

    fetch(`http://localhost:5000/api/todolists/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodoLists),
    });
  };

  // 🔁 Expose all state and functions to the component
  return {
    list,
    tasks,
    title,
    selectedTaskIndex,
    isEditing,
    setIsEditing,
    setSelectedTaskIndex,
    createNewTask,
    updateTask,
    toggleTask,
    deleteTask,
    handleDragEnd,
    calculateProgress,
    handleListTitleChange,
  };
};

export default useTodoListPage;
