"use client";

import Link from "next/link";
import {
  FaHome,
  FaUserFriends,
  FaCalendarAlt,
  FaBriefcase,
  FaBook,
  FaComments,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", icon: <FaHome />, href: "/student" },
  { name: "Network", icon: <FaUserFriends />, href: "#" },
  { name: "Events", icon: <FaCalendarAlt />, href: "#" },
  { name: "Jobs", icon: <FaBriefcase />, href: "#" },
  { name: "Resources", icon: <FaBook />, href: "#" },
  { name: "Messages", icon: <FaComments />, href: "#" },
  { name: "Profile", icon: <FaUserCircle />, href: "#" },
  { name: "Settings", icon: <FaCog />, href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white shadow-2xl">

      <div className="border-b border-slate-700 p-8">
        <h1 className="text-3xl font-bold text-indigo-400">
          CampusConnect
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Student Portal
        </p>
      </div>

      <nav className="mt-8 px-5">

        {menu.map((item) => (

          <Link
            key={item.name}
            href={item.href}
            className="mb-3 flex items-center gap-4 rounded-xl px-4 py-4 transition duration-300 hover:bg-indigo-600"
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span className="text-lg">
              {item.name}
            </span>

          </Link>

        ))}

      </nav>

    </aside>
  );
}