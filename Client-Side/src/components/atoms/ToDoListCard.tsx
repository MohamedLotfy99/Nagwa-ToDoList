import { Task, TodoList } from "../../types";
import { ListTodo } from "lucide-react";

interface Props {
  list: TodoList;
  index: number;
  onClick: () => void;
  onDelete: () => void;
}

const TodoListCard = ({ list, onClick, onDelete, index }: Props) => {
  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div
      className={` ${
        index % 2 === 0 ? "bg-white" : "bg-gray-200"
      } p-4 rounded shadow relative group cursor-pointer transition duration-200 ease-in-out`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering onClick
          onDelete();
        }}
        className="absolute top-2 right-2 text-red-600 font-bold text-2xl hover:text-red-800 cursor-pointer"
        title="Delete list"
      >
        ×
      </button>

      <div onClick={onClick}>
        <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-3">
          <ListTodo className="w-5 h-5 text-blue-600" />
          {list.title}
        </h2>
        <div className="w-full bg-gray-400 h-4 rounded-xl overflow-hidden">
          <div
            className="bg-blue-600 h-full"
            style={{ width: `${calculateProgress(list.tasks)}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2 text-gray-800">
          {calculateProgress(list.tasks)}% completed
        </p>
      </div>
    </div>
  );
};

export default TodoListCard;
