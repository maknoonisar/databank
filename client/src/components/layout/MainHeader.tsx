import { useState } from "react";
import Link from "next/link";
import { useLocation } from "@/lib/router";

import { cn } from "@/lib/utils";
import { Menu, Database } from "lucide-react";
import { Button } from "@/components/ui";

export default function MainHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/data-catalog", label: "Data Catalog" },
    { path: "/upload-dataset", label: "Upload Dataset" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">HDX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(({ path, label }) => (
            <Link key={path} href={path}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === path
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Auth Section Removed */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth">
            <Button variant="default">Login / Register</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 border-t bg-background">
          <nav className="flex flex-col space-y-4">
            {navItems.map(({ path, label }) => (
              <Link key={path} href={path}>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === path
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {label}
                </a>
              </Link>
            ))}
            <Link href="/auth">
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-primary"
              >
                Login / Register
              </a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
