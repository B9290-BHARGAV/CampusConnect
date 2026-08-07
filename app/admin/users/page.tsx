"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Eye,
  ShieldCheck,
  ShieldOff,
  ArrowLeft,
} from "lucide-react";

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  role: "student" | "faculty" | "admin" | null;
  department: string;
  enrollmentNumber: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (roleFilter) params.set("role", roleFilter);
      params.set("page", String(page));
      params.set("limit", "10");

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounced search
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  async function handleRoleChange(userId: string, newRole: string) {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, role: newRole as UserData["role"] } : u
          )
        );
      } else {
        alert(data.message || "Failed to update role");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  async function handleVerifyToggle(userId: string, isVerified: boolean) {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: !isVerified }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, isVerified: !isVerified } : u
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(userId: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setTotal((prev) => prev - 1);
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  const roleBadgeStyles: Record<string, string> = {
    student:
      "bg-blue-100 text-blue-700",
    faculty:
      "bg-emerald-100 text-emerald-700",
    admin:
      "bg-amber-100 text-amber-700",
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Manage Users
              </h1>
              <p className="mt-2 text-slate-500">
                {total} total user{total !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or enrollment number..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600">
                    User
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-600">
                    Role
                  </th>
                  <th className="hidden px-6 py-4 font-semibold text-slate-600 md:table-cell">
                    Department
                  </th>
                  <th className="hidden px-6 py-4 font-semibold text-slate-600 lg:table-cell">
                    Verified
                  </th>
                  <th className="hidden px-6 py-4 font-semibold text-slate-600 lg:table-cell">
                    Joined
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.image || "/default-avatar.png"}
                            alt={user.fullName}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {user.fullName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <select
                          value={user.role || ""}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                            roleBadgeStyles[user.role || ""] || "bg-slate-100 text-slate-600"
                          } border-0 cursor-pointer transition`}
                        >
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      {/* Department */}
                      <td className="hidden px-6 py-4 text-slate-600 md:table-cell">
                        {user.department || "—"}
                      </td>

                      {/* Verified */}
                      <td className="hidden px-6 py-4 lg:table-cell">
                        <button
                          onClick={() =>
                            handleVerifyToggle(user._id, user.isVerified)
                          }
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            user.isVerified
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          {user.isVerified ? (
                            <>
                              <ShieldCheck size={14} /> Verified
                            </>
                          ) : (
                            <>
                              <ShieldOff size={14} /> Unverified
                            </>
                          )}
                        </button>
                      </td>

                      {/* Joined */}
                      <td className="hidden px-6 py-4 text-slate-500 lg:table-cell">
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/users/${user._id}`}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(user._id, user.fullName)
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
              <p className="text-sm text-slate-500">
                Page {page} of {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
