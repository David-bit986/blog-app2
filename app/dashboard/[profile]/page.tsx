"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import PostCard from "@/components/dashboard/post-card";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
  };
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const params = useParams();
  const profileId = params.profile as string;

  useEffect(() => {
    fetch(`/api/posts?userId=${profileId}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [profileId]);

  return (
    <div>
      {session?.user.id === profileId ? (
         <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Your Posts!</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">User Posts</h1>
      )}
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            authorId={post.authorId}
            name={post.author.name}
            title={post.title}
            message={post.message}
            createdAt={post.createdAt}
          />
        ))
      )}
    </div>
  );
}

