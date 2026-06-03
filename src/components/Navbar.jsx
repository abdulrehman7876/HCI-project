import { useState, useEffect } from "react";
import { Train, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "schedule", label: "Schedule" },
    { id: "booking", label: "Book Ticket" },
    { id: "live", label: "Live Status" },
    { id: "contact", label: "Contact" },
    { id: "gallery", label: "Gallery" },
    { id: "rabta-e-ticket", label: "Raabt-e-Ticket" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-rail-bg/95 backdrop-blur-md border-rail-border border-b"
          : "bg-transparent border-b-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-50 px-4 h-12 rounded-lg flex items-center justify-center transition-colors">
            <img
              className="w-full h-full object-cover"
              src="/logo.png"
              alt=""
            />
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === link.id
                  ? "bg-rail-green text-white"
                  : "text-rail-muted hover:text-white hover:bg-rail-surface"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate("booking")}
            className="flex items-center gap-2 bg-rail-green hover:bg-rail-darkgreen text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all glow-green"
          >
            Book Now <ChevronRight size={16} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-rail-surface border-t border-rail-border px-6 py-4 space-y-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeSection === link.id
                  ? "bg-rail-green text-white"
                  : "text-rail-muted hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
