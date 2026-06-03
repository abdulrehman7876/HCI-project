import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ChevronDown, Send, CheckCircle, MessageSquare, HelpCircle } from 'lucide-react';
import { faqs, offices } from '../data/mockData';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const subjects = ['General Inquiry', 'Booking Issue', 'Refund Request', 'Lost & Found', 'Feedback', 'Other'];

  return (
    <section id="contact" className="min-h-screen pt-24 pb-16 bg-rail-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-rail-green text-sm font-medium uppercase tracking-widest mb-2">Support</div>
          <h2 className="font-display text-5xl text-white tracking-wide">CONTACT US</h2>
          <p className="text-rail-muted mt-2 max-w-xl">We're here to help. Reach out through any of the channels below or use the form.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: <Phone size={22} />, title: 'Helpline', value: '111-730-730', sub: 'Available 24/7', color: 'text-rail-green' },
            { icon: <Mail size={22} />, title: 'Email', value: 'support@pakrail.gov.pk', sub: 'Response within 24h', color: 'text-rail-gold' },
            { icon: <MessageSquare size={22} />, title: 'Live Chat', value: 'Start a Chat', sub: 'Mon–Sat 8AM–8PM', color: 'text-blue-400' },
          ].map((item, i) => (
            <div key={i} className={`bg-rail-card border border-rail-border rounded-2xl p-5 card-hover flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-xl bg-rail-surface flex items-center justify-center ${item.color} flex-shrink-0`}>
                {item.icon}
              </div>
              <div>
                <div className="text-rail-muted text-xs uppercase tracking-widest">{item.title}</div>
                <div className="text-white font-semibold mt-0.5">{item.value}</div>
                <div className="text-rail-muted text-xs mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Contact Form */}
          <div className="bg-rail-card border border-rail-border rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <Send size={18} className="text-rail-green" /> Send a Message
            </h3>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-rail-green/20 border-2 border-rail-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-rail-green" />
                </div>
                <div className="text-white font-semibold text-lg mb-2">Message Sent!</div>
                <div className="text-rail-muted text-sm">We'll get back to you at <span className="text-white">{form.email}</span> within 24 hours.</div>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 text-rail-green text-sm hover:underline">Send another message</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">Name</label>
                    <input type="text" placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors" />
                  </div>
                  <div>
                    <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">Email</label>
                    <input type="email" placeholder="you@example.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rail-green transition-colors appearance-none">
                    <option value="">Select a subject...</option>
                    {subjects.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-rail-muted text-xs uppercase tracking-widest mb-2">Message</label>
                  <textarea rows={4} placeholder="Describe your query..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-rail-surface border border-rail-border rounded-xl px-4 py-3 text-white text-sm placeholder-rail-muted focus:outline-none focus:border-rail-green transition-colors resize-none" />
                </div>
                <button onClick={handleSend}
                  className="w-full bg-rail-green hover:bg-rail-darkgreen text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={16} /> Send Message</>}
                </button>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div className="bg-rail-card border border-rail-border rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <HelpCircle size={18} className="text-rail-green" /> Frequently Asked
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`border rounded-xl overflow-hidden transition-all ${openFaq === i ? 'border-rail-green/40' : 'border-rail-border'}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-rail-surface/50 transition-colors">
                    <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-rail-muted flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180 text-rail-green' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-rail-muted text-sm border-t border-rail-border pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Office locations */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
            <MapPin size={18} className="text-rail-green" /> Booking Offices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {offices.map((office, i) => (
              <div key={i} className="bg-rail-card border border-rail-border rounded-xl p-4 card-hover">
                <div className="text-rail-green font-semibold mb-2">{office.city}</div>
                <div className="text-rail-muted text-xs space-y-1.5">
                  <div className="flex gap-2"><MapPin size={12} className="flex-shrink-0 mt-0.5" /><span>{office.address}</span></div>
                  <div className="flex gap-2"><Phone size={12} className="flex-shrink-0 mt-0.5" /><span>{office.phone}</span></div>
                  <div className="flex gap-2"><Clock size={12} className="flex-shrink-0 mt-0.5" /><span>{office.hours}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
