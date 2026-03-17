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
    <div className="flex h-screen bg-gray-100 text-black dark:bg-gray-950 dark:text-white transition-colors">
      

      <div className="flex flex-col flex-1">
       

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}