import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;


export interface ITodo {
  userId: String,
  title: String,
  description: String,
  isCompleted: Boolean
};

const todoSchema: any = new Schema<ITodo>({

  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const Todo = models.Todo || model<ITodo>('Todo', todoSchema);

export default Todo;