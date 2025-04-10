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
import { useAuth } from "@/context/AuthContext";
// Import the useAuth hook

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" }
];

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth(); // Use the auth context to get user and logout

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[#560bad] to-[#450292]">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white">
          LMS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "font-medium text-lg text-white transition-all duration-300 hover:text-yellow-400 hover:underline",
                pathname === href
                  ? "text-yellow-400 border-b-2 border-white"
                  : "text-gray-200"
              )}
            >
              {label}
            </Link>
          ))}

          {/* Conditionally render Dashboard and Logout if user is logged in */}
          {user ? (
            <>
              <Link
                href="/dashboard/home"
                className="font-medium text-lg text-white transition-all duration-300 hover:text-yellow-400 hover:underline"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-yellow-400 text-white text-base font-semibold hover:bg-yellow-500 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className={clsx(
                "px-4 py-2 rounded-full bg-yellow-400 text-white text-base font-semibold hover:bg-yellow-500 transition-colors",
                pathname === "/login"
                  ? "text-indigo-900 bg-white border border-indigo-900"
                  : "text-gray-200"
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
                <MenuIcon className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 sm:w-72 h-full bg-white text-white shadow-2xl"
            >
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-white">
                  Main Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 mt-6 px-4">
                {navLinks.map(({ label, href }) => (
                  <Link key={href} href={href} className="w-full">
                    <Button className="text-lg w-full border-b bg-transparent text-start text-[#560bad] py-3 px-6 rounded-md hover:bg-[#9b2c91] transition-all ease-in-out duration-300">
                      {label}
                    </Button>
                  </Link>
                ))}

                {/* Conditionally render Dashboard and Logout if user is logged in */}
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="py-3 px-6 text-lg text-white rounded-md bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="py-3 px-6 text-lg text-white rounded-md bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="py-3 px-6 text-lg text-white rounded-md bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300"
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
