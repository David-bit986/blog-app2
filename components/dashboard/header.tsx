"use client"
import LogoutButton from "./logout-button"; 
import { useSession } from "@/lib/auth-client";



export default function Header() {
  const { data: session, isPending } = useSession();  
  const name = session?.user?.name
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b text-black dark:bg-gray-950 dark:text-white transition-colors">
      <div className="font-medium">
        Welcome, {name}
      </div>

      <LogoutButton />
    </header>
  );
}