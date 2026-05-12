import { PrismaClient, Role, Severity, Status, Priority, Category } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Clear existing data
  await prisma.aiSuggestion.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleaned existing data.");

  // 2. Create Users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@resolvx.com",
      password: hashedPassword,
      role: Role.ADMIN,
      department: "Security Operations",
    },
  });

  const manager1 = await prisma.user.create({
    data: {
      name: "Sarah Manager",
      email: "sarah@resolvx.com",
      password: hashedPassword,
      role: Role.MANAGER,
      department: "Infrastructure",
    },
  });

  const manager2 = await prisma.user.create({
    data: {
      name: "James Tech Lead",
      email: "james@resolvx.com",
      password: hashedPassword,
      role: Role.MANAGER,
      department: "Core Platform",
    },
  });

  const engineer1 = await prisma.user.create({
    data: {
      name: "Alex Engineer",
      email: "alex@resolvx.com",
      password: hashedPassword,
      role: Role.ENGINEER,
      department: "SRE Team",
    },
  });

  const engineer2 = await prisma.user.create({
    data: {
      name: "Maya Dev",
      email: "maya@resolvx.com",
      password: hashedPassword,
      role: Role.ENGINEER,
      department: "Backend Team",
    },
  });

  console.log("👤 Created 5 users.");

  // 3. Create Incidents
  const incidents = [
    {
      title: "API Gateway High Latency",
      description: "API response times have increased by 200% in the US-East region. Affecting checkout service.",
      severity: Severity.HIGH,
      status: Status.INVESTIGATING,
      priority: Priority.P1,
      category: Category.PERFORMANCE,
      reportedById: engineer1.id,
      assignedToId: manager1.id,
    },
    {
      title: "PostgreSQL Connection Pool Exhaustion",
      description: "Primary database is rejecting new connections due to max pool size reached.",
      severity: Severity.CRITICAL,
      status: Status.OPEN,
      priority: Priority.P1,
      category: Category.DATABASE,
      reportedById: engineer2.id,
      assignedToId: admin.id,
    },
    {
      title: "Unauthorized Access Attempt Detected",
      description: "Multiple failed login attempts detected from a single IP block targeting admin accounts.",
      severity: Severity.CRITICAL,
      status: Status.RESOLVED,
      priority: Priority.P1,
      category: Category.SECURITY,
      reportedById: admin.id,
      assignedToId: admin.id,
      resolvedAt: new Date(),
    },
    {
      title: "Memory Leak in User Service",
      description: "User service containers are restarting every 4 hours due to OOM errors.",
      severity: Severity.MEDIUM,
      status: Status.INVESTIGATING,
      priority: Priority.P2,
      category: Category.BUG,
      reportedById: engineer1.id,
      assignedToId: manager2.id,
    },
    {
      title: "Stale Cache in CDN",
      description: "Product images are not updating on the homepage despite invalidation requests.",
      severity: Severity.LOW,
      status: Status.CLOSED,
      priority: Priority.P3,
      category: Category.NETWORK,
      reportedById: engineer2.id,
      assignedToId: engineer1.id,
      closedAt: new Date(),
    },
  ];

  for (const incData of incidents) {
    const incident = await prisma.incident.create({
      data: incData,
    });

    // Add initial activity log
    await prisma.activityLog.create({
      data: {
        action: "INCIDENT_CREATED",
        details: "Incident reported in the system.",
        userId: incData.reportedById,
        incidentId: incident.id,
      },
    });

    // Add a sample comment for the first incident
    if (incident.title === "API Gateway High Latency") {
      await prisma.comment.create({
        data: {
          content: "I'm checking the cloudwatch logs now. Seems like a surge in traffic from a specific bot.",
          userId: manager1.id,
          incidentId: incident.id,
        },
      });
      
      await prisma.activityLog.create({
        data: {
          action: "COMMENT_ADDED",
          details: "Manager added a comment regarding logs.",
          userId: manager1.id,
          incidentId: incident.id,
        },
      });
    }

    // Add AI Suggestion for the critical DB issue
    if (incident.title === "PostgreSQL Connection Pool Exhaustion") {
      await prisma.aiSuggestion.create({
        data: {
          incidentId: incident.id,
          aiSeverity: Severity.CRITICAL,
          confidence: 0.95,
          suggestions: [
            "Check for long-running uncommitted transactions.",
            "Increase max_connections in postgresql.conf temporarily.",
            "Verify if pg_bouncer is healthy and handling connections correctly.",
            "Investigate recent deployments for potential connection leaks in the application code."
          ],
          rootCause: "A recent deployment in the Payments service appears to be missing a client.release() call in the retry logic.",
        },
      });
    }
  }

  console.log("🔥 Seeded 5 incidents with comments and logs.");
  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
