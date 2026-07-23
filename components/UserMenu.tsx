"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow-md transition"
      >
        <Image
          src={session.user.image || "/default-avatar.png"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold">
            {session.user.name}
          </p>

          <p className="text-xs text-gray-500">
            {session.user.email}
          </p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white shadow-xl">
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />

              <div>
                <h3 className="font-semibold">
                  {session.user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              className="w-full rounded-lg px-4 py-2 text-left hover:bg-gray-100"
            >
              👤 Profile
            </button>

            <button
              className="w-full rounded-lg px-4 py-2 text-left hover:bg-gray-100"
            >
              ⚙️ Settings
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full rounded-lg px-4 py-2 text-left text-red-600 hover:bg-red-50"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}