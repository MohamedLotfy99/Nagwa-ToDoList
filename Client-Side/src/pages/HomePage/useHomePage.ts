import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TodoList } from "../../types";
 // Adjust the import path as necessary
const useHomePage = () => {  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("user") || "null");

  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
    if (user) {
      fetch(`http://localhost:5000/api/todolists/${user.id}`)
        .then((res) => res.json())
        .then((data) => setTodoLists(data || []))
        .catch((err) => console.error("Error fetching to-do lists:", err));
    }
  }, [navigate, user]);

  const handleDeleteList = async (id: number) => {
    const updatedLists = todoLists.filter((list) => list.id !== id);
    setTodoLists(updatedLists);

    try {
      await fetch(`http://localhost:5000/api/todolists/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLists),
      });
    } catch (err) {
      console.error("Failed to update server after deletion:", err);
    }
  };

  const createNewTodoList = async () => {
    const newList: TodoList = {
      id: Date.now(),
      title: `New List`,
      tasks: [],
    };
    const updatedLists = [...todoLists, newList];
    setTodoLists(updatedLists);

    try {
      await fetch(`http://localhost:5000/api/todolists/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLists),
      });
    } catch (err) {
      console.error("Failed to update server:", err);
      // Optional: revert local state or show error
    }
    
  };
  return {
    todoLists,  
    user,
    navigate,
    handleDeleteList,
    createNewTodoList,  
  };
}; // Add missing closing brace for useHomePage function

export default useHomePage;