import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostCardProps {
  name: string;
  authorId: string;
  title: string;
  message: string;
  createdAt: Date | string;
  likes: number;
  postId: string;
  liked: boolean;
  currentUserId?: string;
}

export default function PostCard({ name, authorId, title, message, createdAt, likes, postId, liked: initialLiked, currentUserId }: PostCardProps) {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const date = new Date(createdAt).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleLike = async () => {
    if (isLiked) {
      await fetch(`/api/posts/${postId}/like`, { method: "DELETE" });
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      await fetch(`/api/posts/${postId}/like`, { method: "PATCH" });
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const deletePost = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      window.dispatchEvent(new Event('posts-updated'));
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 mb-3">
      <Link 
        href={`/dashboard/${authorId}`}
        className="flex items-center justify-between rounded bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer -mx-4 -mt-4 px-4 py-2 mb-2"
      >
        <span className="font-medium text-blue-700 dark:text-blue-300">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
      </Link>
      <h3 className="font-semibold text-lg text-black dark:text-white mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{message}</p>
      <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-3 flex justify-between">
        <button onClick={handleLike} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer transition">
          {isLiked ? "♥" : "♡"} {likeCount}
        </button>
        {currentUserId === authorId && (
          <button onClick={deletePost} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer transition">✕ Delete</button>
        )}
      </div>
    </div>
  );
}
