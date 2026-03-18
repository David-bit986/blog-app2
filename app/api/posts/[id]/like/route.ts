import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId: id,
      },
    },
  });

  if (existingLike) {
    return NextResponse.json({ error: "Already liked" }, { status: 400 });
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      likes: { increment: 1 },
      likedBy: {
        create: {
          userId: session.user.id,
        },
      },
    },
  });

  return NextResponse.json({ likes: post.likes, liked: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId: id,
      },
    },
  });

  if (!existingLike) {
    return NextResponse.json({ error: "Not liked" }, { status: 400 });
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      likes: { decrement: 1 },
      likedBy: {
        delete: {
          id: existingLike.id,
        },
      },
    },
  });

  return NextResponse.json({ likes: post.likes, liked: false });
}
