"use client";

import { signOut } from "@/lib/auth-client";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 text-sm bg-black text-white rounded"
    >
      Logout
    </button>
  );
}