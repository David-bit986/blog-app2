import Link from "next/link";

interface PostCardProps {
  name: string;
  authorId: string;
  title: string;
  message: string;
  createdAt: Date | string;
}

export default function PostCard({ name, authorId, title, message, createdAt }: PostCardProps) {
  const date = new Date(createdAt).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
    </div>
  );
}
