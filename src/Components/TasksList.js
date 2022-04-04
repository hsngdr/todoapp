import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { getTaskAsync, deleteTaskAsync } from "../Redux/taskSlice";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
const ProjectList = () => {
  const tasks = useSelector((state) => state.tasks.data);
  const status = useSelector((state) => state.tasks.status);

  const dispatch = useDispatch();
  let params = useParams();

  const deleteTask = (id) => {
    dispatch(deleteTaskAsync(id));
  };

  useEffect(() => {
    dispatch(getTaskAsync(params.ProjectID));
  }, [params.ProjectID, dispatch]);

  return status ==="success"?(
    <ul>
      {tasks
        .filter((x) => x.projectId === parseInt(params.ProjectID))
        .map((task) => (
          <li
            key={v4()}
            className="block p-6 rounded-lg shadow-lg bg-white w-96 mt-5	"
          >
            <p className="text-gray-700 mb-4 break-words">{task.content}</p>

            <div className="flex justify-between">
              <button
                onClick={() => deleteTask(task.id)}
                className="inline-block px-4 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  ):(
    <Loading />
  )
};

export default ProjectList;
