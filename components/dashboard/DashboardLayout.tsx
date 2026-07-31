interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="pt-28 pb-8">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}