"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet";
import Sidebar from "@/components/layout/Sidebar";

export const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-sidebar border-none w-72">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Navigation</SheetTitle>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
