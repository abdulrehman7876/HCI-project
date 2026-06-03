import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Filter, Clock, Wifi, UtensilsCrossed, AirVent, Zap, ChevronRight, AlertCircle } from 'lucide-react';
import { trains, cities } from '../data/mockData';

const amenityIcons = {
  'WiFi': <Wifi size={14} />,
  'Dining Car': <UtensilsCrossed size={14} />,
  'AC': <AirVent size={14} />,
  'Power Outlets': <Zap size={14} />,
};

export default function SchedulePage({ prefill, onBook }) {
  const [from, setFrom] = useState(prefill?.from || 'Karachi');
  const [to, setTo] = useState(prefill?.to || 'Lahore');
  const [date, setDate] = useState(prefill?.date || '');
  const [classFilter, setClassFilter] = useState('All');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefill?.from) {
      setFrom(prefill.from);
      setTo(prefill.to);
      handleSearch(prefill.from, prefill.to);
    }
  }, [prefill]);

  const handleSearch = (f = from, t = to) => {
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      const filtered = trains.filter(train =>
        (f === 'All' || train.from === f || train.to === t || true) &&
        (classFilter === 'All' || train.classes.includes(classFilter))
      );
      // Show all trains but highlight matching ones
      const sorted = [...trains].sort((a, b) => {
        const aMatch = a.from === f && a.to === t;
        const bMatch = b.from === f && b.to === t;
        return bMatch - aMatch;
      });
      setResults(sorted);
      setSearched(true);
      setLoading(false);
    }, 600);
  };

  const classes = ['All', 'Economy', 'Business', 'AC Sleeper'];

  return (
    <section id="schedule" className="min-h-screen pt-24 pb-16 bg-rail-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <div className="text-rail-green text-sm font-medium uppercase tracking-widest mb-2">Schedules</div>
          <h2 className="font-display text-5xl text-white tracking-wide">FIND YOUR TRAIN</h2>
        </div>

        {/* Search Bar */}
        <div className="bg-rail-card border border-rail-border rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">From</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rail-green" />
                <select value={from} onChange={e => setFrom(e.target.value)}
                  className="w-full bg-rail-surface border border-rail-border rounded-xl pl-9 pr-3 py-3 text-white text-sm focus:outline-none focus:border-rail-green transition-colors appearance-none">
                  <option value="All">All Cities</option>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">To</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rail-gold" />
                <select value={to} onChange={e => setTo(e.target.value)}
                  className="w-full bg-rail-surface border border-rail-border rounded-xl pl-9 pr-3 py-3 text-white text-sm focus:outline-none focus:border-rail-green transition-colors appearance-none">
                  <option value="All">All Cities</option>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">Date</label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rail-muted" />
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                  className="w-full bg-rail-surface border border-rail-border rounded-xl pl-9 pr-3 py-3 text-white text-sm focus:outline-none focus:border-rail-green transition-colors" />
              </div>
            </div>
            <button onClick={() => handleSearch()}
              className="bg-rail-green hover:bg-rail-darkgreen text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search size={18} /> Search</>}
            </button>
          </div>

          {/* Class filter */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-rail-border">
            <Filter size={15} className="text-rail-muted" />
            <span className="text-rail-muted text-xs uppercase tracking-widest">Class:</span>
            <div className="flex gap-2">
              {classes.map(cls => (
                <button key={cls} onClick={() => setClassFilter(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    classFilter === cls ? 'bg-rail-green text-white' : 'bg-rail-surface text-rail-muted hover:text-white border border-rail-border'
                  }`}>
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-2 border-rail-border border-t-rail-green rounded-full animate-spin mx-auto mb-4" />
            <div className="text-rail-muted">Searching trains...</div>
          </div>
        )}

        {searched && !loading && (
          <div className="space-y-4">
            <div className="text-rail-muted text-sm">{results.length} trains found</div>
            {results.map((train) => {
              const isMatch = train.from === from && train.to === to;
              return (
                <div key={train.id}
                  className={`bg-rail-card border rounded-2xl p-6 card-hover transition-all ${
                    isMatch ? 'border-rail-green/40' : 'border-rail-border'
                  }`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Train info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div>
                          <div className="text-white font-semibold text-lg">{train.name}</div>
                          <div className="text-rail-muted text-xs font-mono">#{train.number}</div>
                        </div>
                        <div className={`ml-auto md:hidden px-2 py-1 rounded text-xs font-medium ${
                          train.status === 'On Time' ? 'bg-rail-green/20 text-rail-green' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {train.status}
                        </div>
                      </div>

                      {/* Route */}
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-white font-semibold text-xl font-mono">{train.departure}</div>
                          <div className="text-rail-muted text-sm">{train.from}</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1 px-2">
                          <div className="text-rail-muted text-xs font-mono">{train.duration}</div>
                          <div className="w-full flex items-center gap-1">
                            <div className="w-2 h-2 bg-rail-green rounded-full" />
                            <div className="flex-1 h-px bg-rail-border relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rail-muted text-xs">→</div>
                            </div>
                            <div className="w-2 h-2 bg-rail-gold rounded-full" />
                          </div>
                          <div className="text-rail-muted text-xs">{train.days.join(', ')}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold text-xl font-mono">{train.arrival.replace('28:', '04:').replace('51:', '03:').replace('36:', '12:').replace('30:', '06:').replace('13:', '13:')}</div>
                          <div className="text-rail-muted text-sm">{train.to}</div>
                        </div>
                      </div>

                      {/* Amenities */}
                      {train.amenities.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {train.amenities.map(a => (
                            <span key={a} className="flex items-center gap-1 bg-rail-surface border border-rail-border rounded px-2 py-1 text-rail-muted text-xs">
                              {amenityIcons[a]} {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pricing & booking */}
                    <div className="border-t md:border-t-0 md:border-l border-rail-border pt-4 md:pt-0 md:pl-6 md:min-w-[220px]">
                      <div className="hidden md:flex items-center gap-2 mb-3">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          train.status === 'On Time' ? 'bg-rail-green/20 text-rail-green' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {train.status}
                          {train.delay > 0 && ` +${train.delay}m`}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {train.classes.map(cls => (
                          <div key={cls} className="flex items-center justify-between">
                            <span className="text-rail-muted text-sm">{cls}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-white font-mono font-semibold text-sm">Rs. {train.prices[cls].toLocaleString()}</span>
                              <span className={`text-xs ${train.seats[cls] < 10 ? 'text-orange-400' : 'text-rail-green'}`}>
                                {train.seats[cls]} left
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => onBook(train)}
                        className="w-full mt-4 bg-rail-green hover:bg-rail-darkgreen text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-all active:scale-95">
                        Book Now <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!searched && !loading && (
          <div className="text-center py-16 text-rail-muted">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <div className="text-lg">Search for trains above to see schedules</div>
          </div>
        )}
      </div>
    </section>
  );
}
