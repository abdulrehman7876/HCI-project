import { useState, useEffect } from "react";
import {
  Train,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { cities } from "../data/mockData";

export default function HomePage({ onNavigate, onSearchPrefill }) {
  const [from, setFrom] = useState("Karachi");
  const [to, setTo] = useState("Lahore");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
  }, []);

  const handleSearch = () => {
    onSearchPrefill({ from, to, date, passengers });
    onNavigate("schedule");
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const stats = [
    { value: "500+", label: "Routes Nationwide" },
    { value: "65,000", label: "Daily Passengers" },
    { value: "7,791 km", label: "Rail Network" },
    { value: "472", label: "Stations" },
  ];

  const cards = [
    {
      title: "Badshahi Mosque",
      desc: "Badshahi Mosque, Lahore, Punjab, Pakistan",
      img: "/badshahi.png",
    },
    {
      title: "Sunset glow over Concordia Camp",
      desc: "Sunset glow over Concordia Camp",
      img: "/sunset.png",
    },
    {
      title: "Pakistan Monument",
      desc: "Pakistan Monument, Islamabad, Pakistan",
      img: "/monument.png",
    },
    {
      title: "Badshahi Mosque",
      desc: "",
      img: "/picA.png",
    },
  ];

  const peopleCards = [
    {
      name: "Mr. Muhammad Hanif Abbasi",
      role: "Federal Minister for Railways Pakistan Railways",
      img: "/HanifAbbasi.jpeg",
    },
    {
      name: "Mr. Bilal Azhar Kayani",
      role: "State Minister for Railways Pakistan Railways",
      img: "/BilalAzharKayani.jpeg",
    },
    {
      name: "Mr. Mazhar Ali Shah",
      role: "Secretary / Chairman Railways Pakistan Railways",
      img: "/SyedMazharAliShah.jpeg",
    },
  ];

  const features = [
    {
      icon: <Shield size={24} />,
      title: "Safe Travel",
      desc: "Modern coaches with enhanced safety protocols and trained staff.",
    },
    {
      icon: <Clock size={24} />,
      title: "Live Tracking",
      desc: "Real-time GPS tracking for every train on the network.",
    },
    {
      icon: <Star size={24} />,
      title: "Comfortable",
      desc: "AC Sleeper, Business, and Economy classes for every budget.",
    },
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-rail-bg">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,166,81,0.08)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rail-green/5 rounded-full blur-[120px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#00A651 1px, transparent 1px), linear-gradient(90deg, #00A651 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero text */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 bg-rail-green/10 border border-rail-green/30 rounded-full px-4 py-2 text-rail-green text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-rail-green rounded-full animate-pulse" />
            Live Booking Available
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none tracking-wider text-glow mb-4">
            TRAVEL PAKISTAN
          </h1>
          <h1 className="font-display text-6xl md:text-8xl text-rail-green leading-none tracking-wider">
            BY RAIL
          </h1>
          <p className="mt-6 text-rail-muted text-lg max-w-xl mx-auto font-body">
            Book tickets, track trains live, and explore Pakistan's extensive
            rail network — all in one place.
          </p>
        </div>

        {/* Search Card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-rail-card border border-rail-border rounded-2xl p-6 md:p-8 glow-green">
            <h2 className="text-white font-semibold text-lg mb-6">
              Find Your Train
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              {/* From */}
              <div className="md:col-span-1">
                <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">
                  From
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-rail-green"
                  />
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-rail-surface border border-rail-border rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-rail-green transition-colors appearance-none cursor-pointer"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap */}
              <div className="hidden md:flex justify-center">
                <button
                  onClick={swap}
                  className="w-10 h-10 bg-rail-surface border border-rail-border rounded-full flex items-center justify-center hover:border-rail-green hover:text-rail-green text-rail-muted transition-all mt-6"
                  aria-label="Swap cities"
                >
                  ⇄
                </button>
              </div>

              {/* To */}
              <div className="md:col-span-1 ">
                <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">
                  To
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-rail-gold"
                  />
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-rail-surface border border-rail-border rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-rail-green transition-colors appearance-none cursor-pointer"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-1">
                <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-rail-muted"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-rail-surface border border-rail-border rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-rail-green transition-colors"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>

              {/* Search btn */}
              <div>
                <button
                  onClick={handleSearch}
                  className="w-full bg-rail-green hover:bg-rail-darkgreen text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all glow-green active:scale-95"
                >
                  Search Trains <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {cards.map((card, i) => (
            <div key={i}>
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg">
                  {card.title}
                </h3>
                <p className="text-rail-muted text-sm">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* peopleCards */}
        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {peopleCards.map((card, i) => (
            <div
              key={i}
              className="bg-rail-card border border-rail-border rounded-xl p-4"
            >
              <img
                src={card.img}
                alt={card.name}
                className="w-full h-72 object-cover rounded-xl"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg">
                  {card.name}
                </h3>
                <p className="text-rail-muted text-sm">{card.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 text-rail-muted text-sm max-w-4xl mx-auto transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Mr. Mazhar Ali Shah has more than 27 years’ experience in public and
          private sectors. Before joining civil service of Pakistan in 1998, he
          served in private sector in different capacities. His major expertise
          is in the areas of strategic planning, development of national
          transport frameworks, operation management, project management,
          disaster management, research, communication, training and
          development. He has served at national and provincial levels both on
          staff and field positions and carry varied experience of working in a
          diverse cultural environment across Pakistan. While having first
          degree in engineering in 1994, Mr. Shah completed his MBA with major
          in Finance (Gold Medallist) from Institute of Management Sciences
          Peshawar (2003) and MSc. in Management from King’s College University
          of London in 2005. He has been one of the top performers in all senior
          management training programs (MCMC, SMC and NMC) offered by National
          School of Public Policy (NSPP) for civil servants.
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 bg-rail-card/60 border border-rail-border rounded-xl"
            >
              <div className="font-display text-3xl text-rail-green">
                {stat.value}
              </div>
              <div className="text-rail-muted text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="p-5 bg-rail-card border border-rail-border rounded-xl card-hover flex gap-4"
            >
              <div className="w-12 h-12 bg-rail-green/10 rounded-xl flex items-center justify-center text-rail-green flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <div className="text-white font-semibold mb-1">{f.title}</div>
                <div className="text-rail-muted text-sm">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
