import React, { useState, useEffect } from 'react';
import { Shield, Terminal, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

export default function Hero({ onOpenDashboard }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', text: 'AI Sentinel Core v1.4.2 Initialized...' },
    { id: 2, type: 'success', text: 'Zero-Trust network perimeter: SECURE' }
  ]);

  // Automated threat simulation for the dashboard mockup
  useEffect(() => {
    const threatTargets = ['Database cluster', 'Auth API endpoint', 'SSH Gateway Port 22', 'S3 Backup Bucket'];
    const attackTypes = ['DDoS Flood', 'SQL Injection Attempt', 'Brute-Force Exploit', 'Malicious Payload'];

    const interval = setInterval(() => {
      const randomTarget = threatTargets[Math.floor(Math.random() * threatTargets.length)];
      const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      
      const newAlert = {
        id: Date.now(),
        type: 'alert',
        text: `CRITICAL: ${randomAttack} detected on ${randomTarget}`
      };

      const newMitigation = {
        id: Date.now() + 1,
        type: 'success',
        text: `MITIGATED: Threat isolated & autonomous patch deployed in 4ms.`
      };

      setLogs((prev) => [newAlert, newMitigation, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-12">
      {/* Background Tech Grids & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Value Proposition & Form */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-300 text-xs font-medium tracking-wide shadow-lg shadow-blue-950/40">
            <Shield className="w-3.5 h-3.5 animate-pulse" />
            Next-Gen Autonomous Cyber Defense
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Secure AI agents against the <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">OWASP Top 10 for LLMs.</span>
          </h1>

          <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
            Stop prompt injection (LLM01), sensitive-information disclosure (LLM02), and supply-chain weaknesses before they reach your model or your customers.
          </p>

          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <button type="button" onClick={onOpenDashboard} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500">Open judge dashboard</button>
            <button type="button" onClick={() => document.getElementById('kernel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:text-white">See the deterministic kernel proof</button>
          </div>

          {/* Waitlist Capture form */}
          <div id="waitlist" className="scroll-mt-28 max-w-md mx-auto lg:mx-0 pt-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800 backdrop-blur-md">
                <input
                  id="waitlist-form"
                  type="email"
                  required
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent px-4 py-3 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none flex-grow focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-6 py-3 rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-200 shrink-0"
                >
                  Join Beta Waitlist
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl backdrop-blur-md text-emerald-400 text-sm">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Secure access granted. Check your inbox shortly for setup details!</span>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-3 text-left pl-2">⚡ Zero configuration required. Fully SOC2 & ISO27001 ready.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-2 text-left">
            {[['4ms', 'Threat response'], ['24/7', 'Autonomous coverage'], ['0', 'Downtime targets']].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-3 backdrop-blur-sm"><div className="text-base font-extrabold text-white">{value}</div><div className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-500">{label}</div></div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Cyber Security Sandbox */}
        <div className="lg:col-span-6 w-full max-w-xl mx-auto">
          <div className="relative group rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-1 shadow-2xl shadow-blue-950/40">
            {/* Glowing accents */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500" />
            
            {/* Internal Window header */}
            <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="text-xs font-mono text-slate-500 ml-2 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" /> sandbox-node-04@sentinel.ai
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400 font-mono font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Cpu className="w-3 h-3 animate-pulse" /> Live Protection Active
                </div>
              </div>

              {/* Console Dashboard Area */}
              <div className="p-5 font-mono text-xs space-y-3 min-h-[260px] max-h-[260px] overflow-y-auto scrollbar-none flex flex-col-reverse justify-end">
                {logs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`flex items-start gap-2.5 p-2 rounded border transition-all duration-300 animate-fadeIn ${
                      log.type === 'alert' 
                        ? 'bg-rose-950/20 border-rose-500/20 text-rose-300' 
                        : log.type === 'success'
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    {log.type === 'alert' && <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    {log.type === 'success' && <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                    {log.type === 'info' && <Terminal className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
                    <span>{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
