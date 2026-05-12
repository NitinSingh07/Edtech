import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back, {session?.user?.name} ({session?.user?.role})
      </p>
      
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mt-4"
      >
        <Button variant="destructive">Logout</Button>
      </form>
    </div>
  );
}
