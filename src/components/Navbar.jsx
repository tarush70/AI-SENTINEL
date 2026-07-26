import React from 'react';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="bg-slate-950/70 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50">
        
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-semibold text-slate-100 tracking-tight">AI Sentinel</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Threat Engine</a>
          <a href="#compliance" className="hover:text-white transition-colors">SOC2</a>
          <a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a>
        </div>

        {/* CTA */}
        <button className="bg-white text-slate-950 px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors">
          Book Demo
        </button>
      </div>
    </nav>
  );
}
