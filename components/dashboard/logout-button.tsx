"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
 
  return (
    <button
      onClick={async () => {
        router.push("/");
        router.refresh();
        await signOut();
      }}
      className="px-4 cursor-pointer py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition"
    >
      Logout
    </button>
  );
}