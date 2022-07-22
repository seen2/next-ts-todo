import Todo from '../../models/Todo';

export default async function fetchTodos(userId: string) {
  if (userId) {
    const result = await Todo.find({ userId });
    if (result.length > 0) {
      return result;
    } else {
      throw new Error("No Todos Found");
    }
  } else {
    throw new Error("Unable to find todos");

  }


}