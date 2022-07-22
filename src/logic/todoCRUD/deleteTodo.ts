import Todo from '../../models/Todo';

export default async function deleteTodo(id: string, userId: string) {
  const todo = await Todo.findById(id);

  try {
    if (todo.userId === userId) {
      const result = await todo.remove();
      return result;
    }

  } catch (error) {
    throw new Error("Unable to delete");
  }

}