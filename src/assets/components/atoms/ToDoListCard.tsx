interface Task {
  title: string;
  completed: boolean;
}

interface TodoList {
  id: number;
  title: string;
  tasks: Task[];
}

interface Props {
  list: TodoList;
  onClick: () => void;
}

const TodoListCard = ({ list, onClick }: Props) => {
  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div onClick={onClick} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{list.title}</h2>
      <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
        <div
          className="bg-blue-600 h-full"
          style={{ width: `${calculateProgress(list.tasks)}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2 text-gray-800">
        {calculateProgress(list.tasks)}% completed
      </p>
    </div>
  );
};

export default TodoListCard;
