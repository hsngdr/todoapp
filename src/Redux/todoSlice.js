import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi("92a53cb11989e8a72a0e86a6e079227d6773a5a3");

export const getTodosAsync = createAsyncThunk("getTodos", async () => {
  const data = await api.getProjects();
  return data;
});
export const addAsync = createAsyncThunk("addAsync", async (content) => {
  const add = await api.addProject({ name: content });
  return add;
});
export const removeAsync = createAsyncThunk(
  "removeAsync",
  async (id, states) => {
    const status = await api.deleteProject(id);
    const state = states.getState();
    return status
      ? state.todos.data.filter((x) => x.id !== id)
      : state.todos.data;
  }
);
export const favToogleAsync = createAsyncThunk(
  "favToogleAsync",
  async (obj) => {
    await api.updateProject(obj.id, {
      name: obj.name,
      favorite: !obj.fav,
    });
    return obj.id;
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
      return state;
    },

    [addAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.data.push(action.payload);
      return state;
    },

    [removeAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
      return state;
    },

    [favToogleAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.data.map((todo) => {
        if (todo.id === action.payload) {
          todo.favorite = !todo.favorite;
        }
        return state;
      });
      return state;
    },
    [getTodosAsync.pending]: (state, action) => {
      state.status = "Loading";
      return state;
    },
    [addAsync.pending]: (state, action) => {
      state.status = "Loading";
      return state;
    },
    [removeAsync.pending]: (state, action) => {
      state.status = "Loading";
      return state;
    },
    [favToogleAsync.pending]: (state, action) => {
      state.status = "Loading";
      return state;
    },
  },
});
export const { add, remove, toogleCompleted } = todoSlice.actions;
export default todoSlice.reducer;
