import React, { useState } from 'react';
import { Modal, Button, Text, Input, Checkbox, Textarea, Loading } from "@nextui-org/react";

import styles from "../styles/components.module.css";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { TodoItem } from '../types/todo';
import { onCreateTodo } from '../redux/actionCreators/todoActions';
import { Router, useRouter } from 'next/router';


export default function CreateTodoForm({ setCreateNewTodo, createNewTodo }: { setCreateNewTodo: Function, createNewTodo: boolean }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userId = useAppSelector(state => state.auth)._id;
  const { loading, statusCode } = useAppSelector(state => state.auth);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const onClickSave = async () => {
    const newTodo: TodoItem = { title, description, userId: userId + "", isCompleted: false, _id: "" };
    await dispatch(onCreateTodo(newTodo));
    if (!loading) {
      setTitle("");
      setDescription("");
      setCreateNewTodo(false);
    }


  }


  return (
    <div  >
      <Modal
        closeButton
        style={{ backgroundColor: "rgb(18, 18, 45)", color: "white" }}
        aria-labelledby="modal-title"
        open={createNewTodo}
        onClose={() => { }}
      >
        <Modal.Header  >
          <div className={styles.logo}>
            <h3>Create New Todo</h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Input
            onChange={(event) => { setTitle(event.target.value) }}
            value={title} status="primary" label='Title' style={{ width: 300 }}
            placeholder={"Enter Task Name"}
          />
          <Textarea
            onChange={(event) => { setDescription(event.target.value) }}
            value={description}
            status="primary" label='Description'
            placeholder={"Enter your Task Description"}
          />
          <br />
          <Checkbox isDisabled color="success"  ><Text color='white' >Completed</Text></Checkbox>
          <br />
          {loading ? <Loading /> : <Button disabled={!(title && description)} onPress={() => onClickSave()} color={"primary"}  >Save</Button>}
        </Modal.Body>
      </Modal>
    </div >
  )
}
