import TodoListCard from "../../components/atoms/ToDoListCard"; // adjust path if needed
import useHomePage from "./useHomePage";

const Home = () => {
  const { user, todoLists, handleDeleteList, createNewTodoList, navigate } =
    useHomePage();

  return (
    <div className="min-h-screen bg-#242424 p-8">
      <div className="grid gap-6">
        {todoLists.map((list, index) => (
          <TodoListCard
            key={list.id}
            index={index}
            list={list}
            onDelete={() => {
              handleDeleteList(list.id);
            }}
            onClick={() =>
              navigate(`/todoList/${list.id}`, {
                state: { listId: list.id, user, todoLists },
              })
            } // Pass the list to the TodoListPage
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
