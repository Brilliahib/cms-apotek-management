"use client";

import { PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  Settings2Icon,
  LucideIcon,
  Newspaper,
  Handshake,
  Users,
  HousePlus,
  HandCoins,
  MessageCircleMore,
  UserRound,
  CalendarCheck,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";
import { Session } from "next-auth";
import SideNavL from "@/components/atoms/sidenav/SideNavL";
import SideNavHeader from "@/components/atoms/sidenav/SideNavHeader";

export interface Link {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  hide?: boolean;
}

interface SidenavProps extends PropsWithChildren {
  session: Session;
}

export default function Sidenav({ children, session }: SidenavProps) {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      ...(session?.user.role === "admin"
        ? [
            {
              href: "/dashboard/admin",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/admin",
            },
            {
              href: "/dashboard/admin/purchases",
              label: "Purchase",
              icon: ShoppingCart,
              active: pathname.startsWith("/dashboard/admin/purchases"),
            },
            {
              href: "/dashboard/sales",
              label: "Sale",
              icon: ShoppingBag,
              active: pathname.startsWith("/dashboard/sales"),
            },
          ]
        : session?.user.role === "daycare"
        ? [
            {
              href: "/dashboard/daycare",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/daycare",
            },
            {
              href: "/dashboard/daycare/nannies",
              label: "Nannies",
              icon: UserRound,
              active: pathname.startsWith("/dashboard/daycare/nannies"),
            },
          ]
        : session?.user.role === "nannies"
        ? [
            {
              href: "/dashboard/nannies",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/nannies",
            },
            {
              href: "/dashboard/nannies/bookings",
              label: "Booking",
              icon: CalendarCheck,
              active: pathname.startsWith("/dashboard/nannies/bookings"),
            },
          ]
        : [
            {
              href: "/dashboard",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard",
            },
            {
              href: "/dashboard/bookings",
              label: "Booking",
              icon: CalendarCheck,
              active: pathname.startsWith("/dashboard/bookings"),
            },
          ]),
      // {
      //   href: "/dashboard/messages",
      //   label: "Message",
      //   active: pathname.startsWith("/dashboard/messages"),
      //   icon: MessageCircleMore,
      // },
      {
        href: "/dashboard/settings",
        label: "Setting",
        active: pathname.startsWith("/dashboard/settings"),
        icon: Settings2Icon,
      },
    ],
    [session, pathname]
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNavL links={links} />
      <div className="flex max-h-screen flex-col overflow-y-auto bg-white">
        <SideNavHeader session={session} links={links} />
        <main className="mt-16 flex flex-1 bg-white flex-col gap-4 p-4 md:px-10 md:py-6 lg:gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}