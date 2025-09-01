import React from "react";
import ToDoList from "./ToDoList";
import { getData } from "@/dataControl";

export default async function page() {
  await getData.toDoList();
  return (
    <div>
      <ToDoList />
    </div>
  );
}
