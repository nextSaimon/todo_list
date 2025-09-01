import React from "react";
import ToDoList from "./ToDoList";
import { getData, postData, deleteData } from "@/dataControl";

export default async function Page() {
  const initialRows = await getData.toDoList();

  return (
    <div>
      <ToDoList
        initialRows={initialRows}
        postToDo={postData.toDoList}
        deleteToDo={deleteData.toDoList}
      />
    </div>
  );
}
