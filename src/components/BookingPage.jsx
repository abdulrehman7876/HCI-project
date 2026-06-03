import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Mail, Phone, CreditCard, CheckCircle, Train, Armchair } from 'lucide-react';

const SEAT_ROWS = 10;
const SEATS_PER_ROW = 4;

function generateSeats(available) {
  const total = SEAT_ROWS * SEATS_PER_ROW;
  const taken = total - available;
  const seats = [];
  const takenSet = new Set();
  while (takenSet.size < Math.min(taken, total - 4)) {
    takenSet.add(Math.floor(Math.random() * total));
  }
  for (let i = 0; i < total; i++) {
    seats.push({ id: i, taken: takenSet.has(i), row: Math.floor(i / 4) + 1, col: (i % 4) });
  }
  return seats;
}

export default function BookingPage({ selectedTrain, onBack }) {
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState(selectedTrain?.classes[0] || 'Economy');
  const [seats, setSeats] = useState(() => generateSeats(selectedTrain?.seats[selectedTrain?.classes[0]] || 40));
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', nic: '' });
  const [payment, setPayment] = useState({ method: 'card', cardNum: '', expiry: '', cvv: '' });
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const price = selectedTrain?.prices[selectedClass] || 0;
  const fee = Math.round(price * 0.02);
  const total = price + fee;

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setSeats(generateSeats(selectedTrain?.seats[cls] || 40));
    setSelectedSeat(null);
  };

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^[0-9]{10,11}$/)) e.phone = 'Valid phone number required';
    if (!form.nic.match(/^[0-9]{13}$/)) e.nic = 'CNIC must be 13 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setBooked(true); }, 1500);
  };

  const colLabels = ['A', 'B', '', 'C', 'D'];

  if (!selectedTrain) {
    return (
      <section id="booking" className="min-h-screen pt-24 pb-16 bg-rail-bg flex items-center justify-center">
        <div className="text-center">
          <Train size={64} className="text-rail-muted mx-auto mb-4 opacity-30" />
          <div className="text-rail-muted text-lg mb-4">No train selected</div>
          <button onClick={onBack} className="bg-rail-green text-white px-6 py-3 rounded-xl font-semibold">
            Browse Schedules
          </button>
        </div>
      </section>
    );
  }

  if (booked) {
    return (
      <section id="booking" className="min-h-screen pt-24 pb-16 bg-rail-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-rail-green/20 border-2 border-rail-green rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-green">
            <CheckCircle size={40} className="text-rail-green" />
          </div>
          <h2 className="font-display text-4xl text-white tracking-wide mb-3">BOOKING CONFIRMED</h2>
          <p className="text-rail-muted mb-6">Your ticket has been booked successfully. A confirmation has been sent to <span className="text-white">{form.email}</span></p>
          <div className="bg-rail-card border border-rail-green/30 rounded-2xl p-6 text-left space-y-3 mb-6">
            <div className="font-mono text-rail-green text-xs uppercase tracking-widest mb-4">Booking Reference</div>
            <div className="font-display text-3xl text-white tracking-widest">PR-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
            <div className="track-line my-3" />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-rail-muted text-xs">Train</div><div className="text-white">{selectedTrain.name}</div></div>
              <div><div className="text-rail-muted text-xs">Class</div><div className="text-white">{selectedClass}</div></div>
              <div><div className="text-rail-muted text-xs">From</div><div className="text-white">{selectedTrain.from}</div></div>
              <div><div className="text-rail-muted text-xs">To</div><div className="text-white">{selectedTrain.to}</div></div>
              <div><div className="text-rail-muted text-xs">Seat</div><div className="text-white font-mono">{selectedSeat !== null ? `${Math.floor(selectedSeat / 4) + 1}${['A','B','C','D'][selectedSeat % 4]}` : 'Auto'}</div></div>
              <div><div className="text-rail-muted text-xs">Amount Paid</div><div className="text-rail-green font-mono font-semibold">Rs. {total.toLocaleString()}</div></div>
            </div>
          </div>
          <button onClick={onBack} className="w-full bg-rail-surface border border-rail-border text-white py-3 rounded-xl hover:border-rail-green transition-all">
            Back to Schedule
          </button>
        </div>
      </section>
    );
  }

  const steps = ['Select Class & Seat', 'Passenger Details', 'Payment'];

  return (
    <section id="booking" className="min-h-screen pt-24 pb-16 bg-rail-bg">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="p-2 text-rail-muted hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="text-rail-green text-sm uppercase tracking-widest">Book Ticket</div>
            <h2 className="font-display text-4xl text-white tracking-wide">{selectedTrain.name}</h2>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i + 1 < step ? 'bg-rail-green text-white' :
                i + 1 === step ? 'bg-rail-green text-white ring-4 ring-rail-green/30' :
                'bg-rail-surface border border-rail-border text-rail-muted'
              }`}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm hidden md:block ${i + 1 === step ? 'text-white' : 'text-rail-muted'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i + 1 < step ? 'bg-rail-green' : 'bg-rail-border'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2">

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Class selection */}
                <div className="bg-rail-card border border-rail-border rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Select Class</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedTrain.classes.map(cls => (
                      <button key={cls} onClick={() => handleClassChange(cls)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedClass === cls ? 'border-rail-green bg-rail-green/10' : 'border-rail-border hover:border-rail-green/40'
                        }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-white font-medium">{cls}</div>
                            <div className="text-rail-muted text-sm">{selectedTrain.seats[cls]} seats available</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-mono font-bold">Rs. {selectedTrain.prices[cls].toLocaleString()}</div>
                            <div className="text-rail-muted text-xs">per person</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seat map */}
                <div className="bg-rail-card border border-rail-border rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Select Seat</h3>
                  <div className="flex gap-4 mb-4 text-xs">
                    {[['Available', 'bg-rail-surface border-rail-border'], ['Selected', 'bg-rail-green'], ['Taken', 'bg-rail-border']].map(([l, c]) => (
                      <div key={l} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded ${c} border`} />
                        <span className="text-rail-muted">{l}</span>
                      </div>
                    ))}
                  </div>
                  {/* Column headers */}
                  <div className="flex justify-center mb-2">
                    <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(5, 2rem)' }}>
                      {['A','B','','C','D'].map((l, i) => (
                        <div key={i} className="text-center text-xs text-rail-muted font-mono">{l}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 max-h-64 overflow-y-auto">
                    {Array.from({ length: SEAT_ROWS }).map((_, row) => (
                      <div key={row} className="flex items-center gap-2">
                        <span className="text-rail-muted text-xs font-mono w-5 text-right">{row + 1}</span>
                        <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(5, 2rem)' }}>
                          {[0, 1, -1, 2, 3].map((col, ci) => {
                            if (col === -1) return <div key={ci} className="w-8 h-8" />;
                            const seatId = row * 4 + col;
                            const seat = seats[seatId];
                            return (
                              <button key={ci}
                                disabled={seat.taken}
                                onClick={() => setSelectedSeat(seatId)}
                                className={`w-8 h-8 rounded-md border text-xs font-mono transition-all ${
                                  seat.taken ? 'bg-rail-border border-transparent cursor-not-allowed opacity-50' :
                                  selectedSeat === seatId ? 'bg-rail-green border-rail-green text-white' :
                                  'bg-rail-surface border-rail-border hover:border-rail-green text-rail-muted hover:text-white'
                                }`}>
                                {!seat.taken && <Armchair size={14} className="mx-auto" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedSeat !== null && (
                    <div className="mt-3 text-center text-rail-green text-sm">
                      Selected: Seat {Math.floor(selectedSeat / 4) + 1}{['A','B','C','D'][selectedSeat % 4]}
                    </div>
                  )}
                </div>

                <button onClick={() => setStep(2)}
                  className="w-full bg-rail-green hover:bg-rail-darkgreen text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                  Continue to Passenger Details <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-rail-card border border-rail-border rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><User size={18} /> Passenger Details</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'name', label: 'Full Name', placeholder: 'Muhammad Ali', icon: <User size={16} />, type: 'text' },
                      { key: 'email', label: 'Email Address', placeholder: 'you@example.com', icon: <Mail size={16} />, type: 'email' },
                      { key: 'phone', label: 'Phone Number', placeholder: '03001234567', icon: <Phone size={16} />, type: 'tel' },
                      { key: 'nic', label: 'CNIC Number', placeholder: '4210100000001', icon: <CreditCard size={16} />, type: 'text' },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">{field.label}</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-rail-muted">{field.icon}</div>
                          <input type={field.type} placeholder={field.placeholder} value={form[field.key]}
                            onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                            className={`w-full bg-rail-surface border rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-rail-muted focus:outline-none transition-colors ${
                              errors[field.key] ? 'border-red-500 focus:border-red-400' : 'border-rail-border focus:border-rail-green'
                            }`} />
                        </div>
                        {errors[field.key] && <p className="text-red-400 text-xs mt-1">{errors[field.key]}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 bg-rail-surface border border-rail-border text-white py-3 rounded-xl hover:border-rail-green transition-all">
                    Back
                  </button>
                  <button onClick={() => { if (validateForm()) setStep(3); }} className="flex-1 bg-rail-green hover:bg-rail-darkgreen text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-rail-card border border-rail-border rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><CreditCard size={18} /> Payment</h3>
                  {/* Methods */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[['card','Credit Card'],['easypaisa','EasyPaisa'],['jazzcash','JazzCash']].map(([val, label]) => (
                      <button key={val} onClick={() => setPayment({ ...payment, method: val })}
                        className={`p-3 rounded-xl border text-sm text-center transition-all ${
                          payment.method === val ? 'border-rail-green bg-rail-green/10 text-white' : 'border-rail-border text-rail-muted hover:border-rail-green/40'
                        }`}>
                        {label}
                      </button>
                    ))}
                  </div>

                  {payment.method === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                          value={payment.cardNum}
                          onChange={e => setPayment({ ...payment, cardNum: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() })}
                          className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white font-mono text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">Expiry</label>
                          <input type="text" placeholder="MM/YY" maxLength={5}
                            value={payment.expiry}
                            onChange={e => setPayment({ ...payment, expiry: e.target.value })}
                            className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white font-mono text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors" />
                        </div>
                        <div>
                          <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">CVV</label>
                          <input type="password" placeholder="•••" maxLength={3}
                            value={payment.cvv}
                            onChange={e => setPayment({ ...payment, cvv: e.target.value })}
                            className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white font-mono text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}

                  {payment.method !== 'card' && (
                    <div>
                      <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">
                        {payment.method === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} Number
                      </label>
                      <input type="tel" placeholder="03001234567"
                        className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white font-mono text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors" />
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 bg-rail-surface border border-rail-border text-white py-3 rounded-xl hover:border-rail-green transition-all">
                    Back
                  </button>
                  <button onClick={handleConfirm}
                    className="flex-1 bg-rail-green hover:bg-rail-darkgreen text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Pay Rs. {total.toLocaleString()} <ChevronRight size={18} /></>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="md:col-span-1">
            <div className="bg-rail-card border border-rail-border rounded-2xl p-5 sticky top-24">
              <div className="text-rail-muted text-xs uppercase tracking-widest mb-4">Booking Summary</div>
              <div className="space-y-3 text-sm">
                <div className="text-white font-semibold">{selectedTrain.name}</div>
                <div className="text-rail-muted font-mono text-xs">#{selectedTrain.number}</div>
                <div className="track-line my-2" />
                <div className="flex justify-between"><span className="text-rail-muted">From</span><span className="text-white">{selectedTrain.from}</span></div>
                <div className="flex justify-between"><span className="text-rail-muted">To</span><span className="text-white">{selectedTrain.to}</span></div>
                <div className="flex justify-between"><span className="text-rail-muted">Departure</span><span className="text-white font-mono">{selectedTrain.departure}</span></div>
                <div className="flex justify-between"><span className="text-rail-muted">Class</span><span className="text-white">{selectedClass}</span></div>
                {selectedSeat !== null && (
                  <div className="flex justify-between"><span className="text-rail-muted">Seat</span><span className="text-white font-mono">{Math.floor(selectedSeat / 4) + 1}{['A','B','C','D'][selectedSeat % 4]}</span></div>
                )}
                <div className="track-line my-2" />
                <div className="flex justify-between"><span className="text-rail-muted">Fare</span><span className="text-white font-mono">Rs. {price.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-rail-muted">Service Fee</span><span className="text-white font-mono">Rs. {fee.toLocaleString()}</span></div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-rail-border">
                  <span className="text-white">Total</span>
                  <span className="text-rail-green font-mono">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
