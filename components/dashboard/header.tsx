"use client";

import { useState } from "react";
import LogoutButton from "./logout-button";
import { useSession } from "@/lib/auth-client";

export default function Header() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = useSession();  
  const name = session?.user?.name

 

  
  const handleCreate = async () => {
    if (!title.trim() || !message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, message }),
      });

      if (!res.ok) throw new Error();

      setTitle("");
      setMessage("");
      alert("Post created!");
      window.dispatchEvent(new Event('posts-updated'));
    } catch {
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex flex-col w-full px-4 sm:px-6 py-4 bg-white border-b text-black dark:bg-gray-950 dark:text-white">
      
      {/* Top row */}
      <div className="flex sm:flex-row items-start sm:items-center justify-between w-full mb-3 gap-2 sm:gap-0">
        <div className="font-medium text-sm sm:text-base">
          Welcome, {name}
        </div>
        <LogoutButton />
      </div>

      {/* Separator */}
      <div className="w-full border-t border-gray-200 dark:border-gray-700 mb-3"></div>

      {/* Bottom section - Responsive layout */}
      <div className="flex flex-col md:flex-row gap-2 w-full items-stretch md:items-start">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full md:w-1/4 px-3 py-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-800 dark:border-gray-700 text-sm"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full md:flex-1 px-3 py-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-800 dark:border-gray-700 resize-none h-10 text-sm"
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 dark:bg-blue-600 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 transition text-sm whitespace-nowrap"
        >
          {loading ? "Adding..." : "Add Post"}
        </button>
      </div>

    </header>
  );
}