"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
 
  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/login");
        router.refresh();
      }}
      className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded"
    >
      Logout
    </button>
  );
}