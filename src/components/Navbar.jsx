import React, { useEffect, useState } from 'react';
import { CalendarDays, CheckCircle2, Menu, Shield, X } from 'lucide-react';

const navigation = [
  { label: 'Threat Engine', target: 'features' },
  { label: 'Integration', target: 'integration' },
  { label: 'SOC 2', target: 'compliance' },
  { label: 'Enterprise', target: 'enterprise' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', updateScrolledState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);

  const goTo = (target) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const bookDemo = () => {
    setIsMenuOpen(false);
    setIsBooked(false);
    setIsBookingOpen(true);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl" aria-label="Main navigation">
      <div className={`backdrop-blur-md border rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50 transition-colors ${isScrolled ? 'bg-slate-950/95 border-white/15' : 'bg-slate-950/70 border-white/10'}`}>
        <button type="button" className="flex items-center gap-2 cursor-pointer group" onClick={() => goTo('hero')} aria-label="Back to the top">
          <span className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
            <Shield className="w-5 h-5 text-blue-400" />
          </span>
          <span className="font-semibold text-slate-100 tracking-tight">AI Sentinel</span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          {navigation.map(({ label, target }) => (
            <button key={target} type="button" onClick={() => goTo(target)} className="hover:text-white transition-colors">
              {label}
            </button>
          ))}
        </div>

        <button type="button" onClick={bookDemo} className="hidden md:block bg-white text-slate-950 px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors">
          Book Demo
        </button>

        <button type="button" className="md:hidden text-slate-200 p-1" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-label="Toggle navigation menu">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-2xl">
          <div className="flex flex-col gap-1">
            {navigation.map(({ label, target }) => (
              <button key={target} type="button" onClick={() => goTo(target)} className="rounded-lg px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-900 hover:text-white transition-colors">
                {label}
              </button>
            ))}
            <button type="button" onClick={bookDemo} className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors">
              Book Demo
            </button>
          </div>
        </div>
      )}

      {isBookingOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="demo-title" onMouseDown={() => setIsBookingOpen(false)}>
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-blue-500/30 bg-slate-900 shadow-2xl shadow-blue-950/60" onMouseDown={(event) => event.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"><CalendarDays className="h-4 w-4" />Private walkthrough</span><button type="button" onClick={() => setIsBookingOpen(false)} aria-label="Close booking form" className="rounded-lg p-1 hover:bg-white/15"><X /></button></div>
              <h2 id="demo-title" className="mt-3 text-2xl font-extrabold">See AI Sentinel in action.</h2>
              <p className="mt-1 text-sm text-blue-100">Tell us where to send your demo invitation.</p>
            </div>
            <div className="p-6">
              {isBooked ? (
                <div className="py-5 text-center"><CheckCircle2 className="mx-auto h-11 w-11 text-emerald-400" /><h3 className="mt-4 text-lg font-bold text-white">Request received</h3><p className="mt-2 text-sm text-slate-400">We’ll use the details you provided to arrange your walkthrough.</p><button type="button" onClick={() => setIsBookingOpen(false)} className="mt-6 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-slate-200">Done</button></div>
              ) : (
                <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setIsBooked(true); }}>
                  <label className="block text-sm font-medium text-slate-200">Work email<input required type="email" placeholder="you@company.com" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500" /></label>
                  <label className="block text-sm font-medium text-slate-200">Company <span className="font-normal text-slate-500">(optional)</span><input type="text" placeholder="Company name" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500" /></label>
                  <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-colors">Request a demo</button>
                  <button type="button" onClick={() => { setIsBookingOpen(false); goTo('waitlist'); window.setTimeout(() => document.getElementById('waitlist-form')?.focus(), 500); }} className="w-full text-sm text-slate-400 hover:text-white">Or join the early-access waitlist</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
