import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";
import { Task, TodoList } from "../../types";

const useTodoListPage = () => {
  const location = useLocation();
  const user = location.state?.user || JSON.parse(localStorage.getItem("user") || "null");
  const [list, setList] = useState<TodoList>();
  const listId = location.state?.listId;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [debounceTasks] = useDebounce(tasks, 500);
  const [title, setTitle] = useState("");
  const [allTodoLists, setAllTodoLists] = useState<TodoList[]>(location.state?.todoLists || []);
  
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    
    if ((e.altKey || e.metaKey) && e.key === "n" ) {
      e.preventDefault();
      createNewTask();
    }

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

      if (e.key === " ") {
        e.preventDefault();
        const task = tasks[selectedTaskIndex];
        if (task) toggleTask(task.id);
      }

      if (e.key === "Delete") {
        e.preventDefault();
        const task = tasks[selectedTaskIndex];
        if (task) deleteTask(task.id);
      }

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

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [tasks, selectedTaskIndex]);


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

  useEffect(() => {
    if (debounceTasks && list) {
      tasksUpdateAPI(debounceTasks);
    }
  }, [debounceTasks]);

  const tasksUpdateAPI = async (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    await fetch(`http://localhost:5000/api/tasks/${user.id}/${listId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTasks),
    });
  };

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

  const updateTask = (id: number, newTitle: string) => {
    setTasks((prev) => prev.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reordered] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reordered);

    setTasks(newTasks); // will trigger debounce update
  };

  const calculateProgress = useCallback(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  const handleListTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!list) return;
    const newTitle = e.target.value;
    setTitle(newTitle);

    const updatedList = { ...list, title: newTitle };
    const updatedTodoLists = allTodoLists.map((l) =>
      l.id === updatedList.id ? updatedList : l
    );
    setAllTodoLists(updatedTodoLists);
    // console.log("debug2", updatedTodoLists)
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
    selectedTaskIndex,
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
