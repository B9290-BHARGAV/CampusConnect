"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!session?.user) return null;

  const role = (session.user as { role?: string }).role;

  const handleProfileClick = () => {
    setOpen(false);

    switch (role) {
      case "student":
        router.push("/student/profile");
        break;

      case "faculty":
        router.push("/faculty/profile");
        break;

      case "admin":
        router.push("/admin/profile");
        break;

      default:
        router.push("/");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
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
        <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl">
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
              onClick={handleProfileClick}
              className="w-full rounded-lg px-4 py-2 text-left transition hover:bg-gray-100"
            >
              👤 Profile
            </button>

            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/login" });
              }}
              className="w-full rounded-lg px-4 py-2 text-left text-red-600 transition hover:bg-red-50"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}