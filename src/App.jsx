import React, { useState } from 'react';
import Hero from "./components/hero";
import Features from "./components/Features";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Implementation from "./components/Implementation";
import Dashboard from "./components/Dashboard";
import KernelDemo from "./components/KernelDemo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If user is logged in, show the SaaS Dashboard
  if (isLoggedIn) {
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  // Otherwise, show the Marketing Website
  return (
    <BackgroundWrapper>
      <Navbar onLoginClick={() => setIsLoggedIn(true)} />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <KernelDemo />
        <Implementation />
        <div id="features">
          <Features />
        </div>
        <section id="compliance" className="scroll-mt-28 border-t border-slate-900 bg-slate-950 px-6 py-20 text-slate-100">
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-[1.2fr_1fr] items-center">
            <div><p className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400">Compliance ready</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">Security evidence your team can use.</h2><p className="mt-4 text-slate-400">Map Sentinel activity to the controls your customers and auditors expect, with clear incident records and review-ready reporting.</p></div>
            <div className="grid grid-cols-2 gap-3 text-sm">{['SOC 2 alignment', 'ISO 27001 ready', 'Audit trail exports', 'Role-based access'].map((item) => <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-slate-300">{item}</div>)}</div>
          </div>
        </section>
        <section id="enterprise" className="scroll-mt-28 border-t border-slate-900 bg-slate-950 px-6 py-20 text-slate-100">
          <div className="max-w-5xl mx-auto rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-slate-900/60 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-7"><div><p className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400">Enterprise</p><h2 className="mt-3 text-3xl font-extrabold">Built for critical AI infrastructure.</h2><p className="mt-3 max-w-xl text-slate-400">Get a tailored rollout plan, private deployment options, and a dedicated security engineering partner.</p></div><a href="mailto:contact@aisentinel.com?subject=AI%20Sentinel%20enterprise%20enquiry" className="inline-flex justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:bg-slate-200">Contact sales</a></div>
        </section>
      </main>
      <Footer />
    </BackgroundWrapper>
  );
}

export default App;
