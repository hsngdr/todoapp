import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodosAsync } from "../Redux/todoSlice";
import { useNavigate } from "react-router-dom";

const FavoriteCounter = () => {
  const todos = useSelector((state) => state.todos.data);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <p onClick={() => navigate("/Favorite")} className="mt-6 cursor-pointer">
      Favorited projects:
      {todos.filter((x) => x.favorite === true).length}
    </p>
  );
};

export default FavoriteCounter;
