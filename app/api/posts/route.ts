import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Create a new post
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, message } = body;

  const post = await prisma.post.create({
    data: {
      title,
      message,
      authorId: session.user.id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(post);
}

// Get all posts or posts by specific user
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  let where = {};
  if (userId) {
    where = { authorId: userId };
  }

  const posts = await prisma.post.findMany({
    where,
    include: {
      author: {
        select: {
          name: true,
        },
      },
      likedBy: session?.user ? {
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      } : false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const postsWithLiked = posts.map(post => ({
    ...post,
    liked: session?.user ? post.likedBy.length > 0 : false,
    likedBy: undefined,
  }));

  return NextResponse.json(postsWithLiked);
}