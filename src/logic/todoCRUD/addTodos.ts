import Todo, { ITodo } from '../../models/Todo';

export default async function addTodo(newTodo: { userId: string, title: string, description: string }) {
  const { title, description, userId } = newTodo;
  if (title && description) {
    const newTodoData = new Todo({ userId, title, description });
    await newTodoData.save();
  } else {
    throw new Error("Title and Description is required");

  }


}