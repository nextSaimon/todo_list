import React from "react";
import ToDoList from "./ToDoList";
import { getData } from "@/dataControl";

export default async function Page() {
  const initialRows = await getData.toDoList({ limit: 10, offset: 0 });
  return (
    <div>
      <ToDoList rows={initialRows} />
    </div>
  );
}
