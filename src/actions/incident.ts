"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const IncidentSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  severity: z.string(),
  priority: z.string(),
  category: z.string(),
  assignedToId: z.string().optional().nullable(),
});

export async function createIncident(values: z.infer<typeof IncidentSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validatedFields = IncidentSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { title, description, severity, priority, category, assignedToId } = validatedFields.data;

  try {
    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        severity,
        priority,
        category,
        reportedById: session.user.id!,
        assignedToId: assignedToId || null,
        status: "OPEN",
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "INCIDENT_CREATED",
        details: `Incident created by ${session.user.name}`,
        userId: session.user.id!,
        incidentId: incident.id,
      },
    });

    revalidatePath("/incidents");
    revalidatePath("/dashboard");
    return { success: true, id: incident.id };
  } catch (error) {
    return { error: "Failed to create incident" };
  }
}

export async function updateIncident(id: string, values: z.infer<typeof IncidentSchema> & { status?: string }) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const incident = await prisma.incident.update({
    where: { id },
    data: values,
  });

  await prisma.activityLog.create({
    data: {
      action: "INCIDENT_UPDATED",
      details: `Incident updated by ${session.user.name}`,
      userId: session.user.id!,
      incidentId: id,
    },
  });

  revalidatePath(`/incidents/${id}`);
  revalidatePath("/incidents");
  return { success: true };
}

export async function deleteIncident(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.incident.delete({ where: { id } });

  revalidatePath("/incidents");
  return { success: true };
}
