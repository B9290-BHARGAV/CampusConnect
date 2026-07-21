import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Navbar />

      <main className="ml-72 mt-20 min-h-screen bg-slate-100 p-10">
        {children}
      </main>
    </>
  );
}