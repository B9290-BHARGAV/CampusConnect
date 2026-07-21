"use client";

import { FaBell, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="ml-72 flex h-20 items-center justify-between border-b bg-white px-10 shadow-sm">

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back 👋
        </p>

      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center rounded-xl border px-4 py-2">

          <FaSearch className="mr-3 text-gray-500" />

          <input
            placeholder="Search..."
            className="outline-none"
          />

        </div>

        <FaBell className="cursor-pointer text-2xl text-gray-600" />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
          B
        </div>

      </div>

    </header>
  );
}