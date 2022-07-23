import { Button, Checkbox } from "@nextui-org/react";
import React, { useEffect } from "react";
import { TodoItem } from "../types/todo";

import styles from "../styles/components.module.css";
import { useRouter } from "next/router";

export default function TodoCard({
  todo,
  index,
}: {
  todo: TodoItem;
  index: number;
}): JSX.Element {
  const router = useRouter();

  useEffect(() => {}, [todo]);

  return (
    <div className={styles.card}>
      <h4 style={{ width: "60%", textAlign: "center" }}>
        {index + 1}. {todo.title}
        
      </h4>
      {/* <div className={styles.flexItems}>
        {todo.description.substring(0, 20 || "")}...
      </div> */}
      <Checkbox
      style={{ width: "30%" }}
          isDisabled={true}
          isSelected={Boolean(todo.isCompleted)}
          color="success"
        >
          Completed
        </Checkbox>

      <Button
        onPress={() => router.push(`/todos/${todo._id}`)}
        bordered
      >
        View
      </Button>
    </div>
  );
}

/*
<div >
        <h4>{todo.title}</h4>
        <Checkbox defaultSelected={true} color="success"  >Completed</Checkbox>
      </div>
      <br />
      <div className={styles.flexItems} >
        {todo.description.substring(0, 20)}...
      </div>
      <br />
      <div>
        <Link
          href={{ pathname: "/todos/:id", query: { todo: JSON.stringify(todo) } }}
          as={`/todos/${todo._id}`} ><Button bordered size={"sm"} >View</Button>
        </Link>
        <br />
        <Button size={"sm"} color={"error"} >Delete</Button>
      </div>
*/
