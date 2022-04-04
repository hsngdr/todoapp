import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import taskSlice from "./taskSlice";

const store = configureStore({
    reducer: {
        todos:todoSlice,
        tasks:taskSlice
    }
})

export default store;
