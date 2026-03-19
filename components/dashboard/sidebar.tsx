"use client"
import Link from "next/link";
import ThemeToggle from "../ui/theme-toggle";
import Button from "@/components/ui/dbutton";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();  
  const name = session?.user?.id;
  return (
    <aside className="w-full h-[stretch]  bg-white border-b md:border-b-0 md:border-r text-black dark:bg-gray-950 dark:text-white transition-colors">
      <div className="p-6 font-bold text-lg">
        MyApp
      </div>

      <nav className="flex flex-col gap-2 p-4">
          <Button variant={pathname === "/dashboard" ? "primary" : "default"}><Link className="px-4 py-2 block w-100p" href="/dashboard">feed</Link></Button>
          <Button variant={pathname === `/dashboard/${name}` ? "primary" : "default"}><Link className="px-4 py-2 block w-100p" href={`/dashboard/${name}`}>profile</Link></Button>
          <ThemeToggle />
      </nav>
    </aside>
  );
}