"use client";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="p-12  w-full h-full flex flex-col gap-3 justify-center items-center"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submitted");
      }}
    >
      <input
        type="username"
        placeholder="username"
        className=" border-gray-600 border rounded p-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className=" border-gray-600 border rounded p-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-3 items-center justify-center">
        <button
          className="rounded p-2 pr-6 pl-6 border shadow hover:bg-gray-300 transition-all"
          onClick={() => console.log("logging in")}
        >
          Login
        </button>
        <Link
          className="text-sm text-blue-500 hover:underline"
          href={"/register"}
        >
          Register
        </Link>
      </div>
    </form>
  );
}
