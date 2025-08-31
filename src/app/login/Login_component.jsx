"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login_component({ loginAction }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      setError("Email & password required!");
      return null;
    }
    try {
      const result = await loginAction(email, password);
      console.log(result?.success);

      if (result?.success) {
        //redirect to login
        route.push("/");
      } else if (result?.error) {
        setError(result?.error);
      } else {
        setError("Something went wrong!");
      }
    } catch (error) {
      console.log("Error to login in client side..", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Login to Todo List
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200 ease-in-out"
          >
            {loading ? "Login......." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

