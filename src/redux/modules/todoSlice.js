import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  detail: {
    id: "",
    title: "",
  },
  isLoading: false,
  error: null,
};
console.log(initialState);

export const __getTodos = createAsyncThunk(
  "todos/getTodos", //action value
  async (payload, thunkAPI) => {
    //구현하고 싶은 함수가 들어감
    try {
      //통신 (서버에서 가져오는 부분)
      const todos = await axios.get("http://localhost:3001/todos");
      //서버에서 가져온걸 스토어에 넣음
      return thunkAPI.fulfillWithValue(todos.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTodo = createAsyncThunk(
  "todos/getTodo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/todos/${payload}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addTodo = createAsyncThunk(
  "todos/addTodo",
  async (payload, thunkAPI) => {
    try {
      const todo = await axios.post("http://localhost:3001/todos", payload);
      return thunkAPI.fulfillWithValue(todo.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const todo = await axios.delete(`http://localhost:3001/todos/${id}`);
      return thunkAPI.fulfillWithValue(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (id, thunkAPI) => {
    try {
      const todo = await axios.patch(`http://localhost:3001/todos/${id}`);
      return thunkAPI.fulfillWithValue(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    //__getTodos
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
      //네트워크 요청이 시작되면 로딩 상태를 true로 변경
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      //네트워크 요청이 끝났으니 false로 변경
      state.todos = action.payload;
      //store에 있는 todos 서버에서 가져온 todos를 넣음
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      //에러가 발생했지만, 네트워크 요청이 끝났으니 false 로 변경
      state.error = action.payload;
      //catch된 error 객체를 state.error에 넣음
    },
    // __getTodo
    [__getTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__getTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__addTodo
    [__addTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__addTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __deleteTodo
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((value) => {
        return value.id !== action.payload;
      });
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __updateTodo
    [__updateTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((value) => {
        if (value.id === action.payload.id) {
          return action.payload;
        } else {
          return value;
        }
      });
    },
    [__updateTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todoSlice.reducer;
