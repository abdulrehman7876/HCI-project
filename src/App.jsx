import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SchedulePage from "./components/SchedulePage";
import BookingPage from "./components/BookingPage";
import LiveStatusPage from "./components/LiveStatusPage";
import ContactPage from "./components/ContactPage";
import RaabtaETicket from "./components/Raabta-e-ticket";
import GalleryPage from "./components/GalleryPage";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchPrefill, setSearchPrefill] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const navigate = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookTrain = (train) => {
    setSelectedTrain(train);
    navigate("booking");
  };

  return (
    <div className="min-h-screen bg-rail-bg text-rail-text font-body">
      <div className="noise-overlay" />
      <Navbar activeSection={activeSection} onNavigate={navigate} />
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
        {activeSection === "gallery" && <GalleryPage />}
        {activeSection === "rabta-e-ticket" && (
          <RaabtaETicket onNavigate={navigate} />
        )}
        {activeSection === "register" && <RegisterPage />}
      </main>
      <footer className="border-t border-rail-border bg-rail-surface py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-rail-muted text-sm">
            © 2024 Pakistan Railways. Government of Pakistan.
          </div>
          <div className="flex gap-6 text-rail-muted text-sm">
            {[
              "home",
              "schedule",
              "booking",
              "live",
              "contact",
              "rabta-e-ticket",
              "gallery",
            ].map((s) => (
              <button
                key={s}
                onClick={() => navigate(s)}
                className="hover:text-white transition-colors capitalize"
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
