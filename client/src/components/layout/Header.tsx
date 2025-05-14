import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Database, Menu } from "lucide-react"; // Removed unused icons
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const navItems = [
    { path: "/", label: "Home" },
    { path: "/data-catalog", label: "Data Catalog" },
    { path: "/api-data", label: "API-Data" },
    { path: "/gallery", label: "Image Gallery" },
    
    { path: "/upload-dataset", label: "Upload Dataset" },
    { path: "/create-user", label: "Create user" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo and Title */}
        <div className="flex items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <Database className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Neoc Data Bank</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                location === item.path
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
              onClick={() => window.location.href = item.path}
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* User Action */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="default" onClick={() => window.location.href = '/auth'}>
            Login / Register
          </Button>
        </div>

        {/* Mobile Menu Button */}
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
            {navItems.map((item) => (
              <div
                key={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  location === item.path
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
                onClick={() => {
                  window.location.href = item.path;
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}
            <div
              className="text-sm font-medium text-primary cursor-pointer"
              onClick={() => {
                window.location.href = '/auth';
                setMobileMenuOpen(false);
              }}
            >
              Login / Register
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
