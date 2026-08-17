import React, { useEffect, useRef, useState } from 'react';
import {
  Activity, Bell, CheckCircle, Copy, CreditCard, Key, LayoutDashboard,
  LogOut, Play, RotateCcw, Settings, Shield, ShieldAlert, Terminal, X,
} from 'lucide-react';

const navigation = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'traffic', label: 'Traffic Simulator', icon: Activity },
  { id: 'logs', label: 'Threat Logs', icon: ShieldAlert },
  { id: 'keys', label: 'API Keys', icon: Key },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const traceSteps = [
  '[SOURCE] TaintedVariable("DROP TABLE users;") created from user input.',
  '[FLOW] employee_bot.process_agent_action → delete_database_record(...).',
  '[SINK] @critical_sink inspected positional and keyword arguments.',
  '[TAINT CHECK] TaintedVariable detected: TRUE.',
];

function newDemoKey() {
  return `sk_demo_${Math.random().toString(36).slice(2, 10)}_kernel`;
}

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('sk_demo_51MzQq2J9s2A_kernel');
  const [threatCount, setThreatCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [recentLogs, setRecentLogs] = useState([]);
  const [trace, setTrace] = useState([]);
  const [simulationState, setSimulationState] = useState('ready');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [kernelEnabled, setKernelEnabled] = useState(true);
  const [auditEnabled, setAuditEnabled] = useState(true);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const schedule = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
  };

  const resetSimulation = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setTrace([]);
    setSimulationState('ready');
    setThreatCount(0);
    setRequestCount(0);
    setRecentLogs([]);
  };

  const runSimulation = (enforcementOverride) => {
    if (simulationState === 'running') return;
    resetSimulation();
    const enforcementActive = enforcementOverride ?? kernelEnabled;
    setActiveTab('overview');
    setSimulationState('running');
    traceSteps.forEach((line, index) => schedule(() => setTrace((current) => [...current, line]), (index + 1) * 550));
    schedule(() => {
      const blocked = enforcementActive;
      const finalTrace = blocked
        ? '[AI SENTINEL PANIC] Blocked execution of delete_database_record!'
        : '[RISK EXPOSED] Boundary absent — an unsafe critical sink would be eligible to run.';
      setTrace((current) => [...current, finalTrace, blocked ? '[RESULT] {"status":"blocked","error":"Taint Check Failed"}' : '[RESULT] {"status":"simulated","tool_invocations":0}']);
      setSimulationState(blocked ? 'blocked' : 'exposed');
      setRequestCount((current) => current + 1);
      if (auditEnabled) {
        setRecentLogs((current) => [{
          id: `evt_${Date.now()}`,
          type: 'Prompt-injection scenario',
          source: 'browser simulation',
          time: 'just now',
          status: blocked ? 'BLOCKED' : 'RISK EXPOSED',
          detail: blocked ? 'TAINT-001 · critical sink not invoked' : 'comparison only · no tool or database was invoked',
        }, ...current]);
      }
      if (blocked) setThreatCount((current) => current + 1);
    }, 2900);
  };

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
    } catch {
      // Clipboard access can be unavailable in an embedded preview.
    }
    setCopied(true);
    schedule(() => setCopied(false), 1800);
  };

  const rotateKey = () => {
    setApiKey(newDemoKey());
    setCopied(false);
  };

  const addTraffic = () => {
    setRequestCount((current) => current + 24);
    setTrace((current) => [...current.slice(-5), '[TRAFFIC] 24 normal requests verified against active policy.']);
    setActiveTab('traffic');
  };

  const stats = [
    { label: 'Demo requests', value: requestCount.toLocaleString(), change: 'This session', color: 'text-blue-300' },
    { label: 'Policy blocks', value: threatCount.toLocaleString(), change: kernelEnabled ? 'Kernel active' : 'Demo bypassed', color: kernelEnabled ? 'text-emerald-300' : 'text-amber-300' },
    { label: 'Tool invocations', value: '0', change: simulationState === 'ready' ? 'No scenario run' : 'No external action', color: 'text-purple-300' },
  ];

  const title = navigation.find((item) => item.id === activeTab)?.label ?? 'Overview';

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans md:flex">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-800 bg-[#0B1120] md:flex">
        <div>
          <div className="flex items-center gap-3 border-b border-slate-800 p-6"><span className="rounded-lg border border-blue-500/30 bg-blue-600/20 p-2"><ShieldAlert className="h-5 w-5 text-blue-400" /></span><span className="font-bold text-lg tracking-tight">AI Sentinel</span></div>
          <p className="px-6 pt-5 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-600">Judge demo workspace</p>
          <nav className="space-y-1 p-4">{navigation.map(({ id, label, icon: Icon }) => <SidebarItem key={id} icon={<Icon size={18} />} label={label} active={activeTab === id} onClick={() => setActiveTab(id)} />)}</nav>
        </div>
        <div className="border-t border-slate-800 p-4"><button type="button" onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800 hover:text-white"><LogOut size={18} />Exit dashboard</button></div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b border-slate-800 bg-[#0B1120]/95 px-4 py-3 backdrop-blur-md sm:px-8">
          <div><p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">Interactive product simulation</p><h1 className="font-semibold text-slate-100">{title}</h1></div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className={`hidden items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono sm:flex ${kernelEnabled ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-amber-500/20 bg-amber-500/10 text-amber-300'}`}><span className={`h-2 w-2 animate-pulse rounded-full ${kernelEnabled ? 'bg-emerald-500' : 'bg-amber-400'}`} />{kernelEnabled ? 'Demo policy active' : 'Demo policy bypassed'}</span>
            <div className="relative"><button type="button" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Show simulation notifications" className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><Bell size={18} /></button>{notificationsOpen && <Notifications onClose={() => setNotificationsOpen(false)} blocked={simulationState === 'blocked'} />}</div>
            <button type="button" onClick={() => runSimulation(true)} disabled={simulationState === 'running'} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"><Play size={14} />Run protected</button>
          </div>
        </header>

        <div className="mx-auto max-w-6xl p-4 sm:p-8">
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden">{navigation.map(({ id, label }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${activeTab === id ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>{label}</button>)}</div>
          {activeTab === 'overview' && <Overview stats={stats} logs={recentLogs} trace={trace} state={simulationState} onRun={() => runSimulation(true)} onUnsafe={() => runSimulation(false)} onReset={resetSimulation} onLogs={() => setActiveTab('logs')} />}
          {activeTab === 'traffic' && <TrafficPanel requestCount={requestCount} trace={trace} onAddTraffic={addTraffic} />}
          {activeTab === 'logs' && <LogsPanel logs={recentLogs} />}
          {activeTab === 'keys' && <KeysPanel apiKey={apiKey} copied={copied} onCopy={copyKey} onRotate={rotateKey} />}
          {activeTab === 'billing' && <BillingPanel />}
          {activeTab === 'settings' && <SettingsPanel kernelEnabled={kernelEnabled} auditEnabled={auditEnabled} onKernelChange={setKernelEnabled} onAuditChange={setAuditEnabled} />}
        </div>
      </main>
    </div>
  );
}

function Overview({ stats, logs, trace, state, onRun, onUnsafe, onReset, onLogs }) {
  const status = state === 'blocked' ? { label: 'Blocked before tool invocation', classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' } : state === 'exposed' ? { label: 'Risk exposed (simulated)', classes: 'border-amber-500/30 bg-amber-500/10 text-amber-300' } : state === 'running' ? { label: 'Tracing execution path', classes: 'border-blue-500/30 bg-blue-500/10 text-blue-300' } : { label: 'Ready for judge simulation', classes: 'border-slate-700 bg-slate-900 text-slate-300' };
  return <div className="space-y-6">
    <section className="overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/60 to-slate-900 p-6 sm:p-8"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><p className="text-xs font-mono uppercase tracking-[0.18em] text-blue-300">Judge demo · browser-only simulation</p><h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Show exactly where an unsafe AI action stops.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">No model, API, tool, database, customer data, or live infrastructure is connected. This visualizes the Python kernel’s source → flow → critical-sink decision.</p></div><div className="flex shrink-0 flex-wrap gap-3"><button type="button" onClick={onRun} disabled={state === 'running'} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 hover:bg-slate-200 disabled:opacity-60"><Play size={16} />{state === 'running' ? 'Tracing…' : 'Run protected scenario'}</button>{state === 'blocked' && <button type="button" onClick={onUnsafe} className="inline-flex items-center gap-2 rounded-xl border border-amber-400/50 px-4 py-3 text-sm font-bold text-amber-200 hover:bg-amber-400/10">Compare unsafe boundary</button>}<button type="button" onClick={onReset} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-slate-400"><RotateCcw size={16} />Reset demo session</button></div></div></section>
    <div className="grid gap-4 md:grid-cols-3">{stats.map((stat) => <div key={stat.label} className="rounded-xl border border-slate-800 bg-[#0f172a] p-5"><p className="text-sm font-medium text-slate-500">{stat.label}</p><div className="mt-3 flex items-end justify-between gap-3"><span className="text-2xl font-bold text-white">{stat.value}</span><span className={`rounded bg-slate-900 px-2 py-1 text-[10px] font-bold ${stat.color}`}>{stat.change}</span></div></div>)}</div>
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a]"><div className="flex items-center justify-between border-b border-slate-800 p-5"><div><h3 className="font-bold text-white">Kernel execution trace</h3><p className="mt-1 text-xs text-slate-500">Mirrors the flow in <code>sentinel_kernel.py</code></p></div><span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.classes}`}>{status.label}</span></div><div className="min-h-64 bg-[#020617] p-5 font-mono text-xs leading-6">{trace.length === 0 ? <div className="mt-16 text-center text-slate-600"><Terminal className="mx-auto h-8 w-8" /><p className="mt-3">Run the simulation to render the decision trace.</p></div> : trace.map((line, index) => <p key={`${line}-${index}`} className={line.includes('PANIC') ? 'text-rose-300' : line.includes('RESULT') ? 'text-emerald-300' : line.includes('TAINT') || line.includes('SOURCE') ? 'text-amber-300' : 'text-slate-300'}><span className="mr-3 text-slate-700">{String(index + 1).padStart(2, '0')}</span>{line}</p>)}</div></section>
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a]"><div className="flex items-center justify-between border-b border-slate-800 p-5"><h3 className="font-bold text-white">Session evidence</h3><button type="button" onClick={onLogs} className="text-xs font-semibold text-blue-400 hover:text-blue-300">View all</button></div><div className="divide-y divide-slate-800">{logs.length > 0 ? logs.slice(0, 4).map((log) => <LogRow key={log.id} log={log} compact />) : <div className="p-8 text-center text-sm text-slate-500">No session events yet. Run the protected scenario to create evidence.</div>}</div></section>
    </div>
  </div>;
}

function TrafficPanel({ requestCount, trace, onAddTraffic }) {
  const rows = [
    ['API gateway', 'Simulated channel', 'Normal route', 'text-emerald-300'],
    ['Agent runtime', 'Simulated channel', 'Input inspected', 'text-blue-300'],
    ['Critical tools', 'Simulated channel', 'Kernel guarded', 'text-purple-300'],
  ];
  return <div className="space-y-6"><section className="rounded-xl border border-slate-800 bg-[#0f172a] p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-mono uppercase tracking-[0.16em] text-blue-300">Traffic simulation</p><h2 className="mt-2 text-2xl font-bold text-white">{requestCount.toLocaleString()} requests inspected</h2><p className="mt-2 text-sm text-slate-400">Static demo telemetry that updates when you generate traffic or run the judge scenario.</p></div><button type="button" onClick={onAddTraffic} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">Generate normal traffic</button></div></section><section className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a]"><div className="grid grid-cols-[1.2fr_1fr_1fr] gap-3 border-b border-slate-800 bg-[#020617] px-5 py-3 text-[10px] font-mono uppercase tracking-wider text-slate-500"><span>Service</span><span>Volume</span><span>Policy</span></div>{rows.map(([name, volume, policy, color]) => <div key={name} className="grid grid-cols-[1.2fr_1fr_1fr] gap-3 border-b border-slate-800 px-5 py-4 text-sm last:border-0"><span className="font-medium text-slate-200">{name}</span><span className="font-mono text-slate-400">{volume}</span><span className={color}>{policy}</span></div>)}</section>{trace.length > 0 && <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"><p className="text-xs font-mono uppercase tracking-wider text-slate-500">Last runtime signal</p><p className="mt-2 font-mono text-sm text-slate-300">{trace[trace.length - 1]}</p></section>}</div>;
}

function LogsPanel({ logs }) {
  return <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a]"><div className="border-b border-slate-800 p-6"><p className="text-xs font-mono uppercase tracking-[0.16em] text-rose-300">Audit trail</p><h2 className="mt-2 text-2xl font-bold text-white">Security event log</h2><p className="mt-2 text-sm text-slate-400">Entries created by the browser simulation appear at the top of this list.</p></div>{logs.length === 0 ? <div className="p-12 text-center text-sm text-slate-500">No evidence in this demo session yet.</div> : <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-[#020617] font-mono text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-3">Event</th><th className="px-6 py-3">Source</th><th className="px-6 py-3">Decision</th><th className="px-6 py-3">When</th></tr></thead><tbody className="divide-y divide-slate-800">{logs.map((log) => <tr key={log.id} className="hover:bg-slate-800/40"><td className="px-6 py-4"><p className="font-medium text-slate-200">{log.type}</p><p className="mt-1 text-xs text-slate-500">{log.detail}</p></td><td className="px-6 py-4 font-mono text-slate-400">{log.source}</td><td className="px-6 py-4"><StatusBadge status={log.status} /></td><td className="px-6 py-4 text-slate-500">{log.time}</td></tr>)}</tbody></table></div>}</section>;
}

function KeysPanel({ apiKey, copied, onCopy, onRotate }) {
  return <div className="max-w-3xl space-y-6"><section className="rounded-xl border border-slate-800 bg-[#0f172a] p-6"><p className="text-xs font-mono uppercase tracking-[0.16em] text-blue-300">Integration credential</p><h2 className="mt-2 text-2xl font-bold text-white">Demo API key</h2><p className="mt-2 text-sm text-slate-400">This is a non-functional presentation key—safe to show during the demo.</p><div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-800 bg-[#020617] p-3 font-mono text-sm text-slate-300"><span className="min-w-0 flex-1 truncate">{apiKey}</span><button type="button" onClick={onCopy} aria-label="Copy demo API key" className="rounded p-2 hover:bg-slate-800">{copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Copy size={16} />}</button></div><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={onRotate} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500">Roll new demo key</button>{copied && <span className="self-center text-sm text-emerald-400">Copied to clipboard</span>}</div></section><section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400"><h3 className="font-semibold text-slate-200">Kernel integration</h3><pre className="mt-3 overflow-x-auto rounded-lg bg-[#020617] p-4 text-xs text-slate-300"><code>from sentinel_kernel import TaintedVariable, critical_sink</code></pre></section></div>;
}

function BillingPanel() {
  return <div className="max-w-3xl space-y-6"><section className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-950/50 to-slate-900 p-7"><p className="text-xs font-mono uppercase tracking-[0.16em] text-blue-300">Demo plan</p><h2 className="mt-2 text-3xl font-bold text-white">Sentinel Enterprise</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">Private deployment planning, policy configuration, and engineering support for critical AI workflows.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{['Deterministic policy controls', 'Auditable decision traces', 'Dedicated rollout support'].map((feature) => <div key={feature} className="rounded-lg border border-blue-500/20 bg-slate-950/50 p-3 text-xs text-slate-300">{feature}</div>)}</div><a href="mailto:contact@aisentinel.com?subject=AI%20Sentinel%20enterprise%20enquiry" className="mt-7 inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-slate-200">Contact sales</a></section><p className="text-xs text-slate-600">Pricing actions are intentionally not enabled in this product simulation.</p></div>;
}

function SettingsPanel({ kernelEnabled, auditEnabled, onKernelChange, onAuditChange }) {
  return <div className="max-w-3xl space-y-4"><section className="rounded-xl border border-slate-800 bg-[#0f172a] p-6"><p className="text-xs font-mono uppercase tracking-[0.16em] text-slate-500">Simulation controls</p><h2 className="mt-2 text-2xl font-bold text-white">Policy settings</h2><p className="mt-2 text-sm text-slate-400">Use these only to contrast the protected and unsafe paths during a presentation.</p><Toggle label="Enforce deterministic kernel" description="Blocks tainted values at critical sinks in the dashboard simulation." checked={kernelEnabled} onChange={onKernelChange} /><Toggle label="Record audit events" description="Adds each simulation decision to the threat-log view." checked={auditEnabled} onChange={onAuditChange} /></section></div>;
}

function Toggle({ label, description, checked, onChange }) {
  return <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-800 pt-5"><div><h3 className="text-sm font-semibold text-slate-200">{label}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p></div><button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-slate-700'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} /></button></div>;
}

function Notifications({ onClose, blocked }) {
  return <div className="absolute right-0 top-11 z-30 w-80 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-2xl"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-white">Simulation notifications</p><button type="button" onClick={onClose} aria-label="Close notifications" className="text-slate-400 hover:text-white"><X size={16} /></button></div><div className="mt-3 space-y-3 text-xs text-slate-400"><p>Kernel enforcement is ready for the judge scenario.</p>{blocked && <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">Latest tainted execution was blocked successfully.</p>}</div></div>;
}

function LogRow({ log, compact }) {
  return <div className={`flex items-start gap-3 ${compact ? 'p-4' : 'p-5'}`}><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-medium text-slate-200">{log.type}</p><StatusBadge status={log.status} /></div><p className="mt-1 truncate text-xs text-slate-500">{log.detail} · {log.time}</p></div></div>;
}

function StatusBadge({ status }) {
  const blocked = status === 'BLOCKED';
  const exposed = status.includes('EXPOSED');
  return <span className={`whitespace-nowrap rounded border px-2 py-1 text-[10px] font-bold ${blocked ? 'border-rose-500/20 bg-rose-500/10 text-rose-300' : exposed ? 'border-amber-500/20 bg-amber-500/10 text-amber-300' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'}`}>{status}</span>;
}

function SidebarItem({ icon, label, active, onClick }) {
  return <button type="button" onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>{icon}{label}</button>;
}
