import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-sidebar">
        <Sidebar role={session.user.role as any} />
      </div>
      <main className="md:pl-64 flex flex-col min-h-screen">
        <Navbar user={session.user} />
        <div className="flex-1 p-6 md:p-8 bg-background/50">
          {children}
        </div>
      </main>
    </div>
  );
}
