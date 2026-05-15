"use server";

import { analyzeIncident } from "@/lib/ai";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getAiInsights(incidentId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const incident = await prisma.incident.findUnique({
    where: { id: incidentId },
  });

  if (!incident) return { error: "Incident not found" };

  try {
    const analysis = await analyzeIncident(incident.title, incident.description);

    // Store the suggestion in DB
    const suggestion = await prisma.aISuggestion.create({
      data: {
        incidentId,
        aiSeverity: analysis.severity,
        confidence: analysis.confidence,
        rootCause: analysis.rootCause,
        suggestions: JSON.stringify(analysis.suggestions), // SQLite string fix
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "AI_ANALYSIS_COMPLETED",
        details: "AI generated new insights and resolution steps",
        userId: session.user.id!,
        incidentId,
      },
    });

    revalidatePath(`/incidents/${incidentId}`);
    return { success: true, data: suggestion };
  } catch (error) {
    console.error("AI Error:", error);
    return { error: "AI Analysis failed. Check API key configuration." };
  }
}
