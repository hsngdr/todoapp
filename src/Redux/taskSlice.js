import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi("92a53cb11989e8a72a0e86a6e079227d6773a5a3");

export const getTaskAsync = createAsyncThunk("getTasks", async () => {
  const data = await api.getTasks();
  return data;
});
export const addTaskAsync = createAsyncThunk("addTask", async (obj) => {
  const data = await api.addTask({
    content: obj.title,
    projectId: obj.project,
  });
  return data;
});
export const deleteTaskAsync = createAsyncThunk(
  "deleteTaskAsync",
  async (id, states) => {
    const status = await api.deleteTask(id);
    const state = states.getState();
    return status
      ? state.tasks.data.filter((x) => x.id !== id)
      : state.tasks.data;
  }
);
const taskSlice = createSlice({
  name: "task",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [getTaskAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
      return state;
    },
    [addTaskAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.data.push(action.payload);
      return state;
    },
    [deleteTaskAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
      return state;
    },
    [getTaskAsync.pending]: (state, action) => {
      state.status = "Loading";
      return state;
    },
    [addTaskAsync.pending]: (state, action) => {
      state.status = "Loading";
      return state;
    },
    [deleteTaskAsync.pending]: (state, action) => {
      state.status = "Loading";
      return state;
    },
  },
});
export default taskSlice.reducer;
