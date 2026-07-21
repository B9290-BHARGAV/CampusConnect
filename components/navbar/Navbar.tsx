"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Campus<span className="text-indigo-600">Connect</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/communities">Communities</Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline">Login</Button>
          <Button>Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}