"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        <Link
          href="/"
          className="text-3xl font-bold"
        >
          Campus<span className="text-indigo-600">Connect</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">

          <Link href="/">Home</Link>

          <Link href="/events">Events</Link>

          <Link href="/resources">Resources</Link>

          <Link href="/jobs">Jobs</Link>

          <Link href="/communities">Communities</Link>

        </div>

        {session && <UserMenu />}

      </div>
    </nav>
  );
}