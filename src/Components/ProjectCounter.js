import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskAsync } from "../Redux/taskSlice";
import { useParams } from "react-router-dom";

const ProjectCounter = () => {
  const tasks = useSelector((state) => state.tasks.data);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getTaskAsync(params.ProjectID));
  }, [dispatch, params.ProjectID]);

  return (
    <p>
      This project's tasks:
      {tasks.filter((x) => x.projectId === parseInt(params.ProjectID)).length}
    </p>
  );
};

export default ProjectCounter;
