"use client";

export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import PostCard from "@/components/dashboard/post-card";

interface Post {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  authorId: string;
  likes: number;
  liked: boolean;
  author: {
    name: string;
  };
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!isPending && !session) {
    redirect("/");
  }

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [refreshKey]);

  useEffect(() => {
    const handleRefresh = () => setRefreshKey(k => k + 1);
    window.addEventListener('posts-updated', handleRefresh);
    return () => window.removeEventListener('posts-updated', handleRefresh);
  }, []);

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-black dark:text-white">Main Feed</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            authorId={post.authorId}
            name={post.author.name}
            title={post.title}
            message={post.message}
            createdAt={post.createdAt}
            likes={post.likes}
            liked={post.liked}
            currentUserId={session?.user?.id}
          />
        ))
      )}
    </div>
  );
}