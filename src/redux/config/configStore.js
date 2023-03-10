import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../modules/todoSlice";

const store = configureStore({
  reducer: { todos: todoReducer },
});

export default store;
