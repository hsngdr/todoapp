import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAsync } from "../Redux/todoSlice";
import { addTaskAsync } from "../Redux/taskSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Search = () => {
  const [title, setTitle] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  const dispatch = useDispatch();

  const project = parseInt(location.pathname.split("/")[2]);

  const onSave = () => {
    if (location.pathname === "/" || location.pathname === "/Projects"|| location.pathname === "/Favorite") {
      if (title !== "") {
        dispatch(addAsync(title));
      }
    } else {
      if (title !== "") {
        dispatch(addTaskAsync({ title, project }));
      }
    }
    setTitle("");
  };
  
  return (
    <div>
      <p
        onClick={() => navigate("/")}
        className="cursor-pointer flex justify-center mb-10 text-4xl"
      >
        TodoApp
      </p>
      <div className="flex w-96">
        <input
          className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mr-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button
          onClick={onSave}
          className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
        >
          save
        </button>
      </div>
    </div>
  )
};

export default Search;
