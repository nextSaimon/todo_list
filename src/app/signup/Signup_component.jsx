"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage({ signupAcction }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signupAcction(name, email, password);
      if (result?.success) {
        e.target.reset();
        setSuccess(
          "Signup successful! Please check your email for verification."
        );
      } else if (result?.error) {
        setError(result?.error);
      } else {
        setError("Something went wrong!");
      }
    } catch (error) {
      console.log("Error to signup in client side..", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Sign Up for Todo List
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              disabled={loading}
              type="text"
              id="name"
              name="name"
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              disabled={loading}
              type="email"
              id="email"
              name="email"
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
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
              disabled={loading}
              type="password"
              id="password"
              name="password"
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
}
