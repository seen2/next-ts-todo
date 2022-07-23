import type { NextPage } from "next";

import React, { useEffect, useState } from "react";
import styles from "../../styles/components.module.css";
import TodoCard from "../../components/TodoCard";
import { TodoItem } from "../../types/todo";
import CreateTodoForm from "../../components/CreateTodoForm";
import AppNavBar from "../../components/AppNavBar";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onGetTodos } from "../../redux/actionCreators/todoActions";
import { Loading, Text } from "@nextui-org/react";

const Todos: NextPage = (): JSX.Element => {
  const todos: TodoItem[] = useAppSelector((state: RootState) => state.todos);

  const { loading } = useAppSelector((state: RootState) => state.auth);

  const [createNewTodo, setCreateNewTodo] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => await dispatch(onGetTodos()))();
  }, [createNewTodo, dispatch]);

  return (
    <div>
      <AppNavBar createNewTodo setCreateNewTodo={setCreateNewTodo} />
      {createNewTodo && (
        <CreateTodoForm
          createNewTodo={createNewTodo}
          setCreateNewTodo={setCreateNewTodo}
        />
      )}
      <div className={styles.grid}>
        {!loading ? (
          todos.length > 0 ? (
            todos.map((todo: TodoItem, index) => (
              <TodoCard key={index} index={index} todo={todo} />
            ))
          ) : (
            <div>
              <h1>No Todos...</h1>
            </div>
          )
        ) : (
          <Loading type="points">
            <Text color="white">Fetching List</Text>
          </Loading>
        )}
      </div>
    </div>
  );
};
export default Todos;
