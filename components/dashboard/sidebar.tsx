"use client"
import Link from "next/link";
import ThemeToggle from "../ui/theme-toggle";
import Button from "@/components/ui/dbutton";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r text-black dark:bg-gray-950 dark:text-white transition-colors">
      <div className="p-6 font-bold text-lg">
        MyApp
      </div>

      <nav className="flex flex-col gap-2 p-4">
          <Button variant={pathname === "/dashboard" ? "primary" : "default"}><Link className="w-100p" href="/dashboard">feed</Link></Button>
          <Button variant={pathname === "/dashboard/profile" ? "primary" : "default"}><Link className="w-full" href="/dashboard/profile">profile</Link></Button>
          <ThemeToggle />
      </nav>
    </aside>
  );
}