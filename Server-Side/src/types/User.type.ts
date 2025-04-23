import TodoList from "./TodoList.type"; 
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  todoLists: Array<TodoList>;
}
export default User;