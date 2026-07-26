import React from "react";

export default function BackgroundWrapper({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 selection:bg-cyan-500/30 overflow-x-hidden">
      {/* 1. The Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} 
      />
      
      {/* 2. The "Aurora" Glow Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 3. Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
