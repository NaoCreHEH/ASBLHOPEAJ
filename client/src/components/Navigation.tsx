import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/mission", label: "Mission" },
    { href: "/services", label: "Services" },
    { href: "/projets", label: "Projets" },
    { href: "/a-propos", label: "À propos" },
    { href: "/temoignages", label: "Témoignages" },
    { href: "/ressources", label: "Ressources" },
    { href: "/evenements", label: "Événements" },
    { href: "/contact", label: "Contact" },
  ];

  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-gradient-purple-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-3xl font-bold">HOPE</div>
              <div className="text-sm">Action Jeunesse</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-white hover:text-hope-yellow transition-colors cursor-pointer font-medium">
                  {link.label}
                </span>
              </Link>
            ))}
            {isAdmin && (
              <Link href="/admin">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple">
                  <Shield size={16} className="mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            <Link href="/faire-un-don">
              <Button className="bg-hope-yellow text-black hover:bg-hope-yellow/90">
                Faire un don
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block text-white hover:text-hope-yellow transition-colors py-2 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield size={16} className="mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link href="/faire-un-don">
                <Button
                  className="bg-hope-yellow text-black hover:bg-hope-yellow/90 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Faire un don
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
