import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTaskAsync } from "../Redux/taskSlice";
import { removeAsync } from "../Redux/todoSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import TaskList from "./TasksList.js";
import ProjectCounter from "./ProjectCounter.js";

const Project = () => {
  const tasks = useSelector((state) => state.tasks.data);

  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const id = parseInt(params.ProjectID);

  useEffect(() => {
    dispatch(getTaskAsync(params.ProjectID));
  }, [dispatch, params.ProjectID]);

  const onDelete = (id) => {
    dispatch(removeAsync(id));
    navigate("/");
  };
  
  return  (
    <div>
      <div className="flex justify-between mt-6">
        <div>
          <ProjectCounter />
          <p>Total tasks: {tasks.length}</p>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
        >
          <div className="flex">
            Delete project <AiOutlineDelete size={15} />
          </div>
        </button>
      </div>
      <TaskList />
    </div>
  )
};

export default Project;
