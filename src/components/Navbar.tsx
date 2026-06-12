import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
const logoPath = "/Logo.png";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { name: "Facilities", action: () => scrollToSection("facilities") },
    { name: "Rooms", action: () => scrollToSection("rooms") },
    { name: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={logoPath} alt="Phoenix Logo" className="w-12 h-12 object-contain" />
          <span className="font-display font-bold text-xl hidden sm:block text-foreground tracking-wide">
            PHOENIX PG
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
          <Link href="/booking" className="inline-block">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold rounded-full px-6 shadow-[0_0_15px_rgba(255,107,0,0.5)] border-0">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl p-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                {link.name}
              </button>
            ))}
            <Link href="/booking" className="inline-block w-full">
              <Button className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow-[0_0_15px_rgba(255,107,0,0.5)] border-0">
                Book Now
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
