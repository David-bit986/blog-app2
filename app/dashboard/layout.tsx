export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-client";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-black dark:bg-gray-950 dark:text-white transition-colors">
      {/* Sidebar at top on mobile, left side on desktop with full height */}
      <div className="w-full md:w-64 md:h-screen md:overflow-y-auto">
        <Sidebar />
      </div>

      {/* Header and main content */}
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}