import type { NextPage } from 'next';

import TodoDetailForm from '../../components/TodoDetailForm';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/hooks';
import { TodoItem } from '../../types/todo';
import { useEffect } from 'react';

const TodosItem: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;
  const [todo] = useAppSelector(state => state.todos).filter((todoItem: TodoItem) => todoItem._id === id);
  const {_id} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!_id) {
      router.push("/");
    }
  }, [router,_id])


  return todo ? <TodoDetailForm todo={todo} />: null;
}

export default TodosItem;