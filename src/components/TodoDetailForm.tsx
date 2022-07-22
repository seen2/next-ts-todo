import { Button, Checkbox, Input, Loading, Text, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { TodoItem } from "../types/todo"

import styles from "../styles/auth.module.css";
import AppNavBar from './AppNavBar';
import CreateTodoForm from './CreateTodoForm';
import { onDeleteTodo, onUpdateTodo } from '../redux/actionCreators/todoActions';
import Router, { useRouter } from 'next/router';

export default function TodoDetailForm({ todo }: { todo: TodoItem }) {

  const [createNewTodo, setCreateNewTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [title, setTitle] = useState(todo?.title);
  const { loading } = useAppSelector(state => state.auth);
  const [description, setDescription] = useState(todo?.description);
  const [isCompleted, setIsCompleted] = useState(todo?.isCompleted);
  const dispatch = useAppDispatch();
  const router = useRouter();


  const onClickDeleteTodo = async () => {
    const newTodo = todo;
    await dispatch(onDeleteTodo(newTodo));
    setCreateNewTodo(false);
    router.push("/todos")
  }

  const onClickUpdateTodo = async () => {
    const newTodo = { ...todo, title, description, isCompleted };
    await dispatch(onUpdateTodo(newTodo));
    setCreateNewTodo(false);
    router.push("/todos")
  }
  useEffect(() => {

  }, [title, description]);


  return (
    <div>
      <AppNavBar createNewTodo setCreateNewTodo={setCreateNewTodo} />
      {createNewTodo && <CreateTodoForm createNewTodo={createNewTodo} setCreateNewTodo={setCreateNewTodo} />}
      {todo && (<div className={styles.auth} >

        <h3>Task Details</h3>

        <Input
          onChange={(event) => setTitle(event.target.value)}
          required
          bordered={!editTodo}
          status="primary"
          label='Title'
          style={{ width: 300 }}
          color={"primary"}
          disabled={!editTodo}
          placeholder={"Enter Task Name"}
          value={title}
        />
        <Textarea
          onChange={(event) => setDescription(event.target.value)}
          required
          bordered={!editTodo}
          status={"primary"}
          label='Description'
          disabled={!editTodo}
          color={"primary"}
          placeholder={"Enter your Task Description"}
          value={description}
        />
        <br />
        <Checkbox onChange={(value) => setIsCompleted(value)} isDisabled={!editTodo} isSelected={Boolean(isCompleted)} color="success"  ><Text color='white' >Completed</Text></Checkbox>
        <br />
        {!loading ? !editTodo ? <Button onPress={() => setEditTodo(true)} color={"gradient"} size={"sm"}  >Edit</Button> : <Button onPress={() => onClickUpdateTodo()} size={"sm"} color={"primary"}  >Update</Button> : <Loading />}
        <br />
        {editTodo ? <Button onPress={() => setEditTodo(false)} disabled={loading} color={"gradient"} size={"sm"}  >Cancel</Button> : <Button onPress={() => onClickDeleteTodo()} disabled={loading} size={"sm"} color={"error"}  >Delete</Button>}


      </div >)}
    </div>
  )
}
