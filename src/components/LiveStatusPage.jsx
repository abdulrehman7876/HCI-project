import { useState, useEffect } from 'react';
import { Search, Radio, MapPin, Gauge, Clock, Train, CheckCircle2, Circle } from 'lucide-react';
import { liveTrains } from '../data/mockData';

const stops = {
  'L001': ['Karachi City', 'Hyderabad', 'Nawabshah', 'Rohri Jn', 'Bahawalpur', 'Multan Cantt', 'Sahiwal', 'Lahore Jn'],
  'L002': ['Karachi City', 'Hyderabad', 'Kotri', 'Nawabshah', 'Sukkur', 'Rohri', 'Rahim Yar Khan', 'Bahawalpur', 'Multan Cantt', 'Lahore', 'Gujranwala', 'Wazirabad', 'Peshawar Cantt', 'Peshawar City'],
  'L003': ['Karachi City', 'Hyderabad', 'Nawabshah', 'Sukkur', 'Rahim Yar Khan', 'Multan', 'Lahore', 'Islamabad'],
};

export default function LiveStatusPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = liveTrains.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.number.toLowerCase().includes(query.toLowerCase()) ||
    t.from.toLowerCase().includes(query.toLowerCase()) ||
    t.to.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="live" className="min-h-screen pt-24 pb-16 bg-rail-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="text-rail-green text-sm font-medium uppercase tracking-widest mb-2">Live Tracking</div>
            <h2 className="font-display text-5xl text-white tracking-wide">TRAIN STATUS</h2>
          </div>
          <div className="flex items-center gap-2 text-rail-green text-sm bg-rail-green/10 border border-rail-green/30 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-rail-green rounded-full animate-pulse" />
            Live Updates
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-rail-muted" />
          <input type="text" placeholder="Search by train name, number, or city..."
            value={query} onChange={e => setQuery(e.target.value)}
            className="w-full bg-rail-card border border-rail-border rounded-xl pl-12 pr-4 py-3.5 text-white text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Train list */}
          <div className="space-y-4">
            {filtered.map(train => (
              <button key={train.id}
                onClick={() => setSelected(train)}
                className={`w-full text-left bg-rail-card border rounded-2xl p-5 card-hover transition-all ${
                  selected?.id === train.id ? 'border-rail-green' : 'border-rail-border'
                }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-semibold">{train.name}</div>
                    <div className="text-rail-muted text-xs font-mono">#{train.number}</div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                    train.status === 'On Time' ? 'bg-rail-green/20 text-rail-green' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    <Radio size={12} className={train.status === 'On Time' ? 'animate-pulse' : ''} />
                    {train.status}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-rail-muted mb-1.5">
                    <span>{train.from}</span>
                    <span>{train.to}</span>
                  </div>
                  <div className="h-2 bg-rail-border rounded-full overflow-hidden">
                    <div className="h-full bg-rail-green rounded-full transition-all duration-1000 relative"
                      style={{ width: `${train.progress}%` }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                    </div>
                  </div>
                  <div className="text-center text-xs text-rail-muted mt-1">{train.progress}% complete</div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-rail-surface rounded-lg p-2 text-center">
                    <div className="text-rail-muted">Location</div>
                    <div className="text-white text-xs mt-0.5 truncate">{train.currentLocation}</div>
                  </div>
                  <div className="bg-rail-surface rounded-lg p-2 text-center">
                    <div className="text-rail-muted">Speed</div>
                    <div className="text-white font-mono mt-0.5">{train.speed} km/h</div>
                  </div>
                  <div className="bg-rail-surface rounded-lg p-2 text-center">
                    <div className="text-rail-muted">Updated</div>
                    <div className="text-white mt-0.5">{train.lastUpdated}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div>
            {selected ? (
              <div className="bg-rail-card border border-rail-border rounded-2xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-white font-semibold text-lg">{selected.name}</div>
                    <div className="text-rail-muted text-xs font-mono">#{selected.number} · {selected.from} → {selected.to}</div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selected.status === 'On Time' ? 'bg-rail-green/20 text-rail-green' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {selected.status}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: <MapPin size={16} />, label: 'Current Location', value: selected.currentLocation },
                    { icon: <MapPin size={16} className="text-rail-gold" />, label: 'Next Stop', value: selected.nextStop },
                    { icon: <Clock size={16} />, label: 'Departure', value: selected.departure },
                    { icon: <Clock size={16} className="text-rail-green" />, label: 'Expected Arrival', value: selected.expectedArrival },
                    { icon: <Gauge size={16} />, label: 'Speed', value: `${selected.speed} km/h` },
                    { icon: <Train size={16} />, label: 'Stops Done', value: `${selected.stopsCompleted}/${selected.totalStops}` },
                  ].map((item, i) => (
                    <div key={i} className="bg-rail-surface rounded-xl p-3">
                      <div className="flex items-center gap-2 text-rail-muted text-xs mb-1">
                        {item.icon} {item.label}
                      </div>
                      <div className="text-white font-medium text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Stop timeline */}
                <div>
                  <div className="text-rail-muted text-xs uppercase tracking-widest mb-3">Route Progress</div>
                  <div className="space-y-0 max-h-48 overflow-y-auto">
                    {(stops[selected.id] || []).map((stop, i) => {
                      const done = i < selected.stopsCompleted;
                      const current = i === selected.stopsCompleted - 1;
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                              current ? 'bg-rail-green ring-4 ring-rail-green/30' :
                              done ? 'bg-rail-green/60' : 'bg-rail-border'
                            }`}>
                              {done ? <CheckCircle2 size={12} className="text-white" /> : <Circle size={12} className="text-rail-muted" />}
                            </div>
                            {i < (stops[selected.id] || []).length - 1 && (
                              <div className={`w-0.5 h-6 ${done ? 'bg-rail-green/60' : 'bg-rail-border'}`} />
                            )}
                          </div>
                          <div className={`pb-1 text-sm ${current ? 'text-rail-green font-semibold' : done ? 'text-white' : 'text-rail-muted'}`}>
                            {stop}
                            {current && <span className="ml-2 text-xs bg-rail-green/20 text-rail-green px-2 py-0.5 rounded">Current</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rail-card border border-rail-border rounded-2xl p-12 text-center">
                <Train size={48} className="text-rail-muted mx-auto mb-4 opacity-30" />
                <div className="text-rail-muted">Select a train to see detailed status</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
