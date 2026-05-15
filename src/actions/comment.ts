"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addComment(incidentId: string, content: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  if (!content || content.trim().length === 0) return { error: "Content is required" };

  try {
    await prisma.comment.create({
      data: {
        content,
        userId: session.user.id!,
        incidentId,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "COMMENT_ADDED",
        details: `${session.user.name} commented on the incident`,
        userId: session.user.id!,
        incidentId,
      },
    });

    revalidatePath(`/incidents/${incidentId}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to add comment" };
  }
}
