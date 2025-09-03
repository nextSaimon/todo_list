"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import JWTWatcher from "./JWTWatcher";
import Cookies from "js-cookie";
import { client, tablesDB, account } from "@/lib/appwriteWeb";

export default function ToDoList({ initialRows, postToDo, deleteToDo }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo, setOffset, setLoading, setHasMore] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");
  const containerRef = useRef();
  const userName = "Hello";
  const jwtToken = Cookies.get("jwt");
  // console.log(jwtToken);
  client.setJWT(jwtToken);
  useEffect(() => {
    // client.set
    const chanel = "databases.db1.tables.todolist.rows";
    client.subscribe(chanel, (response) => {
      console.log(response);
    });
  }, []);

  useEffect(() => {
    if (initialRows && initialRows.length > 0) {
      setTodos(initialRows.map((r) => ({ id: r.$id, text: r.task })));
    }
  }, [initialRows]);

  const addTodo = async () => {
    await postToDo(newTodo);
    setNewTodo("");
    // if (newTodo.trim() !== "") {

    //   setTodos([...todos, { id: Date.now().toString(), text: newTodo.trim() }]);
    //   setNewTodo("");
    // }
  };
  const deleteTodo = async (id) => {
    await deleteToDo(id);
  };
  const startEditing = (todo) => {
    setEditingTodoId(todo.id);
    setEditedTodoText(todo.text);
  };
  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedTodoText.trim() } : todo
      )
    );
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-100 flex flex-col items-center py-10 overflow-auto"
      style={{ maxHeight: "100vh" }}
    >
      {/* <JWTWatcher /> */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-700">
            Hello, {userName}
          </span>
          <Link href="/account">
            <div className="cursor-pointer w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              {userName.charAt(0)}
            </div>
          </Link>
        </div>
      </header>

      {/* Add Todo Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add New Todo
        </h2>
        <div className="flex space-x-4">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-200 ease-in-out"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Todo List Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Todos
        </h2>
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add some above!</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200"
              >
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                    }}
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span
                    className="text-gray-800 text-lg cursor-pointer"
                    onClick={() => startEditing(todo)}
                  >
                    {todo.text}
                  </span>
                )}
                <div className="flex space-x-2">
                  {editingTodoId === todo.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingTodoId(null);
                          setEditedTodoText("");
                        }}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(todo)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
