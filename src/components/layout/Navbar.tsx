"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { 
  Bell, 
  Search, 
  LogOut, 
  User as UserIcon,
  Settings,
  Plus
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";

interface NavbarProps {
  user?: User & { role?: string };
}

import { MobileSidebar } from "@/components/layout/MobileSidebar";

const Navbar = ({ user }: NavbarProps) => {
  return (
    <div className="flex items-center p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <MobileSidebar />
      <div className="flex w-full items-center justify-between">

        <div className="hidden md:flex relative max-w-sm items-center ml-auto mr-4">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search incidents..."
            className="pl-9 h-9 w-[200px] lg:w-[300px] bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>
        
        <div className="flex items-center gap-x-3 ml-auto md:ml-0">
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <Link href="/incidents/new">
              <Plus className="h-4 w-4 mr-2" />
              New Incident
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(user?.name || "U")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-[10px] mt-1 font-bold uppercase tracking-wider text-primary">
                    {user?.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-500 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
