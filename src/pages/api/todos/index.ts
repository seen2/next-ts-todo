import type { NextApiRequest, NextApiResponse } from 'next';

import addTodo from '../../../logic/todoCRUD/addTodos';
import deleteTodo from '../../../logic/todoCRUD/deleteTodo';
import fetchTodos from '../../../logic/todoCRUD/getTodos';
import updateTodo from '../../../logic/todoCRUD/updateTodo';
import authenticateUser from '../../../middleware/authenticateUser';
import isDBConnected from "../../../util/connectDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connected: boolean = await isDBConnected();
  if (connected) switch (req.method) {
    case "POST": {
      try {
        const { title, description } = req.body;
        const newTodo = { userId: req.body.user._id as string, title, description };
        await addTodo(newTodo);
        res.status(200).json({ msg: "Task Saved Succesfully" });
      } catch (error: any) {
        res.status(400).json({ msg: "Unable to save", error: error.message });
      }
      break;
    };
    case "GET": {
      try {
        const result = await fetchTodos(req.body.user._id);
        result.length > 0 && res.status(200).json({ result });
      } catch (error) {
        res.status(400).json({ msg: "No Todos" })
      }
      break;
    };
    case "PUT": {
      try {
        if (req.body.user) {
          const { title, description, isCompleted, todoId } = req.body;
          const newTodo = { todoId, userId: req.body.user._id as string, title, description, isCompleted };
          const result = await updateTodo(newTodo, req.body.user._id);
          res.status(200).json({ msg: "Todo Updated" });
        }
      } catch (error) {
        res.status(400).json({ msg: "Unable Update Todo" })
      }
      break;
    };
    case "DELETE": {
      try {
        if (req.body.user) {
          const result = await deleteTodo(req.body.todoId, req.body.user._id);
          res.status(200).json({ msg: "Todo deleted" });
        }
      } catch (error) {
        res.status(400).json({ msg: "Unable delete Todo" })
      }
      break;
    };
    default:
      res.status(400).json({ msg: "Not valid request method" });;
  };
}

export default authenticateUser(handler);