import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { getTodosAsync, removeAsync,favToogleAsync } from "../Redux/todoSlice";
import FavoriteCounter from "./FavoriteCounter";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";

const FavoritedProjects = () => {
    const todos = useSelector((state) => state.todos.data);
    const status = useSelector((state) => state.todos.status);
  
    let navigate = useNavigate();
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getTodosAsync());
    }, [dispatch]);
  
    const toogle = (name, id, fav) => {
      dispatch(favToogleAsync({ name, id, fav }));
    };
  
    const onDelete = (id) => {
      dispatch(removeAsync(id));
    };

  return (
    <div>
      <div className="flex justify-between">
        <p onClick={() => navigate("/")} className="mt-6 cursor-pointer">
          Total projects: {todos[0] && todos.length}
        </p>
        <FavoriteCounter />
      </div>
      <ul>
        {todos
          .filter((x) => x.favorite === true)
          .map((todo) => (
            <li
            key={v4()}
            className="block p-6 rounded-lg shadow-lg bg-white w-96 mt-5 	"
          >
            <div className="flex justify-between">
              <p className="text-gray-700 mb-4 break-words">{todo.name}</p>
              <button
                onClick={() => onDelete(todo.id)}
                className="mb-5 inline-block px-4 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                <AiOutlineDelete size={15} />
              </button>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => toogle(todo.name, todo.id, todo.favorite)}
                className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
              >
                {todo.favorite ? (
                  <AiFillHeart size={20} />
                ) : (
                  <AiOutlineHeart size={20} />
                )}
              </button>

              <button
                onClick={() => navigate(`/Projects/${todo.id}`)}
                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
              >
                Tasks
              </button>
            </div>
          </li>
          ))}
      </ul>
    </div>
  );
};

export default FavoritedProjects;
