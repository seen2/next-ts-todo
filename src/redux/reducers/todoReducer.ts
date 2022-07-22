import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from '../../types/todo';

export const initialState: TodoItem = {
  _id: "",
  userId: "",
  title: "",
  description: "",
  isCompleted: false
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [initialState],

  reducers: {
    addTodo: (state: TodoItem[] , action: PayloadAction<TodoItem>) => ([...state, { ...action.payload }]),
    deleteTodo: (state: TodoItem[], action: PayloadAction<TodoItem>) => ([...state.filter(todo => todo._id != action.payload._id)]),

    updateTodo: (state: TodoItem[], action: PayloadAction<TodoItem>) => {
      state = (state.filter(todo => todo._id != action.payload._id));

      return ([...state, { ...action.payload }]);

    },
    getTodos: (state: TodoItem[], action: PayloadAction<TodoItem[] | []>) => ([...action.payload])

  }

})

export const { addTodo, deleteTodo, updateTodo, getTodos } = todoSlice.actions;
export default todoSlice.reducer;