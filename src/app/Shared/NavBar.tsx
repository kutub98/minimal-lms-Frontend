"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import AnimatedButton from "@/components/ui/AnimateButton";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact", href: "/contact" }
];

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          LMS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                " font-medium text-base transition-colors hover:text-primary",
                pathname === href
                  ? " text-indigo-900 px-2 py-1 rounded border border-indigo-900 "
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <Link
              className="px-2 py-1 rounded bg-indigo-900 border text-white text-base border-indigo-900"
              href="/logout"
            >
              Logout
            </Link>
          ) : (
            <Link
              className={clsx(
                " bg-indigo-900 text-white px-3 py-2 rounded font-medium text-base transition-colors hover:text-white",
                pathname === "/login"
                  ? "text-indigo-900 px-2 py-1 rounded border"
                  : "text-muted-foreground"
              )}
              href="/login"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 sm:w-72 h-full overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    // className={clsx(
                    //   "text-base font-medium text-base px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                    //   pathname === href
                    //     ? "text-primary"
                    //     : "text-muted-foreground"
                    // )}
                  >
                    <AnimatedButton className="w-auto  px-2 h-auto text-white hover:text-white">
                      {label}
                    </AnimatedButton>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
