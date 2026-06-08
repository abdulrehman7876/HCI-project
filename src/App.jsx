import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SchedulePage from "./components/SchedulePage";
import BookingPage from "./components/BookingPage";
import LiveStatusPage from "./components/LiveStatusPage";
import ContactPage from "./components/ContactPage";
import RaabtaETicket from "./components/Raabta-e-ticket";
import RegisterPage from "./components/RegisterPage";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchPrefill, setSearchPrefill] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.classList.toggle("light", !darkMode);
    root.setAttribute("data-theme", darkMode ? "dark" : "light");
    window.localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const navigate = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookTrain = (train) => {
    setSelectedTrain(train);
    navigate("booking");
  };

  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className="min-h-screen bg-rail-bg text-rail-text font-body transition-colors duration-300"
    >
      <div className="noise-overlay" />
      <Navbar
        activeSection={activeSection}
        onNavigate={navigate}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((d) => !d)}
      />
      <main>
        {activeSection === "home" && (
          <HomePage onNavigate={navigate} onSearchPrefill={setSearchPrefill} />
        )}
        {activeSection === "schedule" && (
          <SchedulePage prefill={searchPrefill} onBook={handleBookTrain} />
        )}
        {activeSection === "booking" && (
          <BookingPage
            selectedTrain={selectedTrain}
            onBack={() => navigate("schedule")}
          />
        )}
        {activeSection === "live" && <LiveStatusPage />}
        {activeSection === "contact" && <ContactPage />}
        {activeSection === "rabta-e-ticket" && (
          <RaabtaETicket onNavigate={navigate} />
        )}
        {activeSection === "register" && <RegisterPage />}
      </main>
      <footer className="border-t border-rail-border bg-rail-surface py-8 transition-colors duration-300">
        <div className="max-w-2xl sm:max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-rail-muted text-sm">
            © 2024 Pakistan Railways. Government of Pakistan.
          </div>
          <div className="flex gap-6 text-rail-muted text-sm flex-wrap justify-center">
            {[
              "home",
              "schedule",
              "booking",
              "live",
              "contact",
              "rabta-e-ticket",
              // "gallery",
            ].map((s) => (
              <button
                key={s}
                onClick={() => navigate(s)}
                className="hover:text-rail-text transition-colors capitalize"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
