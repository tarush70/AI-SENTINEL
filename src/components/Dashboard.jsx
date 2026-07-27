import React, { useState } from 'react';
import {
  LayoutDashboard, ShieldAlert, Activity, Key, CreditCard,
  Settings, LogOut, Copy, CheckCircle, Bell
} from 'lucide-react';

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  // Simulation Data (This would come from your real database later)
  const stats = [
    { label: "Total Requests", value: "1.2M", change: "+12%", color: "text-blue-400" },
    { label: "Threats Blocked", value: "14,032", change: "+5.3%", color: "text-emerald-400" },
    { label: "Avg Latency", value: "14ms", change: "-2ms", color: "text-purple-400" },
  ];

  const recentLogs = [
    { id: 'evt_01', type: 'Prompt Injection', source: '192.168.0.4', time: '2m ago', status: 'BLOCKED' },
    { id: 'evt_02', type: 'SQL Injection', source: '45.22.19.11', time: '14m ago', status: 'BLOCKED' },
    { id: 'evt_03', type: 'PII Leak (Email)', source: '10.0.0.55', time: '1h ago', status: 'REDACTED' },
    { id: 'evt_04', type: 'Jailbreak Attempt', source: '88.12.4.9', time: '3h ago', status: 'BLOCKED' },
  ];

  const copyKey = () => {
    navigator.clipboard.writeText("sk_live_51MzQq2J9s2A_protected_x8291");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden">

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-slate-800 bg-[#0B1120] flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-bold text-lg tracking-tight">AI Sentinel</span>
          </div>

          <nav className="p-4 space-y-1">
            <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon={<Activity size={18} />} label="Live Traffic" active={activeTab === 'traffic'} onClick={() => setActiveTab('traffic')} />
            <SidebarItem icon={<ShieldAlert size={18} />} label="Threat Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
            <SidebarItem icon={<Key size={18} />} label="API Keys" active={activeTab === 'keys'} onClick={() => setActiveTab('keys')} />
            <SidebarItem icon={<CreditCard size={18} />} label="Billing" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
            <SidebarItem icon={<Settings size={18} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg w-full transition-all text-sm font-medium">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-[#0B1120]/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
          <h1 className="font-semibold text-slate-200 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Systems Operational
            </div>
            <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">

          {/* 1. API KEY SECTION (The Product) */}
          <section className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Your Secret API Key</h2>
                <p className="text-sm text-slate-400">Use this key to initialize the AI Sentinel SDK in your Python/Node apps.</p>
              </div>
              <button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded border border-slate-700 transition-colors">
                Roll New Key
              </button>
            </div>
            <div className="flex items-center gap-2 bg-[#020617] p-3 rounded-lg border border-slate-800 font-mono text-sm text-slate-300 relative group">
              <span className="flex-1 truncate">sk_live_51MzQq2J9s2A_protected_x8291</span>
              <button onClick={copyKey} className="p-2 hover:bg-slate-800 rounded transition-colors">
                {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </section>

          {/* 2. STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl">
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className={`text-xs font-bold ${stat.color} bg-slate-900 px-2 py-1 rounded`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3. RECENT ATTACK LOGS */}
          <section className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-white">Recent Security Events</h3>
              <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#020617] text-slate-500 uppercase font-mono text-xs">
                  <tr>
                    <th className="px-6 py-3">Event Type</th>
                    <th className="px-6 py-3">Source IP</th>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {recentLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-2">
                        <ShieldAlert size={14} className="text-rose-400" />
                        {log.type}
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono">{log.source}</td>
                      <td className="px-6 py-4 text-slate-500">{log.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                          log.status === 'BLOCKED'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// Helper Component for Sidebar
function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
