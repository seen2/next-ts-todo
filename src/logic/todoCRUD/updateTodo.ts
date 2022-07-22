import Todo from '../../models/Todo';

export default async function updateTodo(newTodo: any, currentUserId: string) {
  const { title, description, userId, isCompleted, todoId } = newTodo;
  if (title && description) {
    const result = await Todo.updateOne({ "_id": todoId, userId: currentUserId }, { $set: { title, description, userId, isCompleted } });
    return result;
  } else {
    throw new Error("Error While Update");
  }
}