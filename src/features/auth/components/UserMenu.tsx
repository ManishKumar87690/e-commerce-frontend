"use client";

import Link from "next/link";
import { User, LogOut, Settings, Package, Heart } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { signOut, useSession } from "next-auth/react";

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!session) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link href={ROUTES.login}>Sign in</Link>
      </Button>
    );
  }

  const isAdmin = session?.user?.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image ?? undefined} />

            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {getInitials(session.user.name ?? "U")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <p className="font-medium text-sm">
              {session.user.name}
            </p>

            <p className="text-xs text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={ROUTES.profile}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={ROUTES.orders}
              className="cursor-pointer"
            >
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={ROUTES.accountWishlist}
              className="cursor-pointer"
            >
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={ROUTES.addresses}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              Addresses
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {isAdmin && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={ROUTES.admin}
                className="cursor-pointer text-primary"
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}