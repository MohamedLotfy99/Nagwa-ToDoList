import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip } from "lucide-react";
import useTodoListPage from "./useTodoListPage";

const TodoListPage = () => {
  const {
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
  } = useTodoListPage();

  if (!list) return <p>Loading...</p>;

  return (
    <div className="p-4 px-10 w-full mx-auto">
      <input
        className="text-2xl font-bold mb-4"
        type="text"
        value={title}
        onChange={handleListTitleChange}
      />

      <div className="bg-gray-400 w-full h-4 rounded-3xl overflow-hidden mb-4">
        <div
          className="bg-blue-600 h-full"
          style={{ width: `${calculateProgress()}%` }}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="space-y-2 mb-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable
                  draggableId={task.id.toString()}
                  index={index}
                  key={task.id}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center my-4 justify-between ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-200"
                      } p-5 text-black rounded shadow ${
                        selectedTaskIndex === index
                          ? "ring-5 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedTaskIndex(index)}
                    >
                      <span {...provided.dragHandleProps}>
                        <Grip className="cursor-grab"></Grip>
                      </span>
                      <input
                        type="checkbox"
                        className="ml-3 hover:cursor-pointer"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <input
                        id={`task-input-${index}`}
                        className="flex-1 mx-2 border-b border-gray-300 focus:outline-none"
                        placeholder="New Task"
                        value={task.title}
                        onChange={(e) => updateTask(task.id, e.target.value)}
                      />
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 font-bold text-2xl hover:text-red-800 cursor-pointer"
                        title="Delete task"
                      >
                        ×
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={createNewTask}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
      >
        <span className="text-white text-2xl font-bold">+</span>
        <span className="text-white text-sm mt-1.5">Add Task</span>
      </button>
    </div>
  );
};

export default TodoListPage;
