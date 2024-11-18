"use client";

import Link from "next/link";

import { House, LogOut, Menu, Settings } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { generateFallbackFromName } from "@/utils/misc";

import { Link as NavLink } from "@/components/organism/side/SideNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNavLink from "./SideNavLink";
import Image from "next/image";

interface SideNavHeaderProps {
  session: Session;
  links: NavLink[];
}

export default function SideNavHeader({ session, links }: SideNavHeaderProps) {
  return (
    <header className="fixed left-0 right-0 z-40 h-14 lg:h-[60px] lg:px-6 bg-white">
      <div className="flex h-full w-full items-center justify-between gap-4 bg-white px-4 md:justify-end md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="flex flex-col">
            <div className="mx-auto my-8">
              <Link
                href="/"
                className="flex text-left justify-center items-center gap-2 font-semibold"
              >
                <Image
                  src="/images/logo.png"
                  alt="Charing Cub"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <nav className="grid-gap-2 space-y-4 font-poppins">
              {links
                .filter((link) => !link.hide)
                .map((link) => (
                  <SideNavLink key={link.label} {...link} />
                ))}
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <div className="flex items-center gap-5">
            <h4 className="hidden font-semibold md:block">
              {session.user.name}
            </h4>
            <DropdownMenuTrigger asChild>
              <Button variant="tertiary" size="icon" className="rounded-full">
                <Avatar className="border border-muted">
                  <AvatarFallback className="text-gray-700">
                    {generateFallbackFromName(session.user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end" className="font-poppins">
            <DropdownMenuLabel>
              <p>{session.user.name}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/">
                <House /> Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/20"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              {" "}
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
