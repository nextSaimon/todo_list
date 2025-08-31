"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const userName = "User Name"; // Placeholder for user's name

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim() }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Header */}
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
              if (e.key === "Enter") {
                addTodo();
              }
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
                <span className="text-gray-800 text-lg">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
