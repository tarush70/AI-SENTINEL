import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Features() {
  const [activeTab, setActiveTab] = useState('hunting');
  const [huntStatus, setHuntStatus] = useState('idle'); 
  const [patchStatus, setPatchStatus] = useState('idle'); 
  const [responseStatus, setResponseStatus] = useState('idle'); // idle, breach, isolating, hotpatch, restored
  const [progress, setProgress] = useState(0);
  
  // Tab 1: Threat Hunting State
  const [networkNodes, setNetworkNodes] = useState([
    { id: 'Node-01', name: 'Auth API Gateway', status: 'secure', packetRate: '1.2k/s' },
    { id: 'Node-02', name: 'User Database Cluster', status: 'secure', packetRate: '4.8k/s' },
    { id: 'Node-03', name: 'Legacy SSH Portal', status: 'secure', packetRate: '210/s' },
    { id: 'Node-04', name: 'S3 Asset Pipeline', status: 'secure', packetRate: '8.9k/s' },
  ]);
  const [huntLogs, setHuntLogs] = useState([]);

  // Tab 2: Predictive Patching State
  const [patchLogs, setPatchLogs] = useState([]);
  const [agentMetrics, setAgentMetrics] = useState({
    systemIntegrity: '100%',
    activePipelines: '14 Active',
    blockedExecutions: '0 Default'
  });

  // Tab 3: Zero-Downtime Incident Response State
  const [responseLogs, setResponseLogs] = useState([]);
  const [liveTrafficLoad, setLiveTrafficLoad] = useState('100% Core Capacity');
  const [clusterState, setClusterState] = useState('NOMINAL');

  // ==========================================
  // MODULE 1 ENGINE: AUTONOMOUS THREAT HUNTING
  // ==========================================
  useEffect(() => {
    let timer;
    if (huntStatus === 'scanning') {
      setHuntLogs(['[INFO] Initializing system-wide cluster verification...', '[INFO] Mapping communication topology...']);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 40) {
            clearInterval(timer);
            setHuntStatus('analyzing');
            return 40;
          }
          return prev + 10;
        });
      }, 1000);
    } else if (huntStatus === 'analyzing') {
      setHuntLogs((prev) => [
        ...prev,
        '[WARNING] Anomaly detected in packet signature on Node-03',
        '[CRITICAL] Zero-Day Buffer Overflow signature identified (CVE-2026-X)',
        '[AI ACTION] Deploying isolated heuristic observation perimeter...'
      ]);
      setNetworkNodes((prevNodes) =>
        prevNodes.map((n) => (n.id === 'Node-03' ? { ...n, status: 'breached', packetRate: '94.2k/s' } : n))
      );
      timer = setTimeout(() => {
        setHuntStatus('resolving');
        setProgress(75);
      }, 2000);
    } else if (huntStatus === 'resolving') {
      setHuntLogs((prev) => [
        ...prev,
        '[AI ACTION] Restructuring active stack memory registers...',
        '[SUCCESS] Zero-day vector neutralized. Memory layout normalized.'
      ]);
      setNetworkNodes((prevNodes) =>
        prevNodes.map((n) => (n.id === 'Node-03' ? { ...n, status: 'secure', packetRate: '180/s' } : n))
      );
      timer = setTimeout(() => {
        setHuntStatus('resolved');
        setProgress(100);
      }, 1500);
    }
    return () => { clearInterval(timer); clearTimeout(timer); };
  }, [huntStatus]);

  // ==========================================
  // MODULE 2 ENGINE: PREDICTIVE PATCHING
  // ==========================================
  useEffect(() => {
    let timer;
    if (patchStatus === 'intercepting') {
      setPatchLogs([
        '[INBOUND] AI Agent "Data-Sync-Bot" requested OS shell access...',
        '[ANALYSIS] Intercepting generated prompt vector context structure...',
        '[ALERT] User Input detected: "Format root directory after exporting data"'
      ]);
      timer = setTimeout(() => {
        setPatchStatus('sandboxing');
        setProgress(50);
      }, 1500);
    } else if (patchStatus === 'sandboxing') {
      setPatchLogs((prev) => [
        ...prev,
        '[SANDBOX] Redirecting runtime execution to isolated virtual proxy layer...',
        '[SIMULATION] Command execution result: Destructive system filesystem wipe simulated.',
        '[CRITICAL] Indirect Prompt Injection leading to Remote Code Execution (RCE) validated.'
      ]);
      setAgentMetrics(prev => ({ ...prev, systemIntegrity: 'DEGRADED (Sandbox)' }));
      timer = setTimeout(() => {
        setPatchStatus('patched');
        setProgress(100);
      }, 2000);
    } else if (patchStatus === 'patched') {
      setPatchLogs((prev) => [
        ...prev,
        '[AI SECURITY] Real-time execution token revoked for Data-Sync-Bot.',
        '[PATCH] Synthesized context boundary rule injected into runtime environment.',
        '[SUCCESS] AI Engine hardened against payload exploit. Main pipeline uncompromised.'
      ]);
      setAgentMetrics({
        systemIntegrity: '100% SECURE',
        activePipelines: '14 Active',
        blockedExecutions: '1 Intercepted'
      });
    }
    return () => clearTimeout(timer);
  }, [patchStatus]);

  // ==========================================
  // MODULE 3 ENGINE: ZERO-DOWNTIME INCIDENT RESPONSE
  // ==========================================
  useEffect(() => {
    let timer;
    if (responseStatus === 'breach') {
      setResponseLogs([
        '[CRITICAL ALERT] Active lateral movement vector detected on Host Group Delta!',
        '[INTRUSION] Attacker running network discovery script across internal microservices.',
        '[METRIC] Main app routing delay increasing due to traffic strain...'
      ]);
      setClusterState('BREACH DETECTED');
      setLiveTrafficLoad('92% (Degraded Routing)');
      timer = setTimeout(() => {
        setResponseStatus('isolating');
        setProgress(45);
      }, 2000);
    } else if (responseStatus === 'isolating') {
      setResponseLogs((prev) => [
        ...prev,
        '[AI MITIGATION] Initiating real-time proxy traffic mirroring configuration...',
        '[ROUTING] Dynamic DNS redirection complete. Swapping ingress clusters to safe shadow container array.',
        '[SUCCESS] Infected Host Group Delta isolated completely from master network grid.'
      ]);
      setClusterState('ISOLATING THREAT');
      setLiveTrafficLoad('100% (Shadow Array Stabilized)');
      timer = setTimeout(() => {
        setResponseStatus('hotpatch');
        setProgress(80);
      }, 2500);
    } else if (responseStatus === 'hotpatch') {
      setResponseLogs((prev) => [
        ...prev,
        '[AI ENGINE] Deploying kernel-level hotpatch firmware injection to Delta cluster.',
        '[CLEANUP] Purging volatile memory logs and neutralizing unauthorized terminal keys...',
        '[VERIFICATION] Running compliance assertion audits on system layers...'
      ]);
      setClusterState('HOTPATCH INJECTING');
      timer = setTimeout(() => {
        setResponseStatus('restored');
        setProgress(100);
      }, 2500);
    } else if (responseStatus === 'restored') {
      setResponseLogs((prev) => [
        ...prev,
        '[SUCCESS] Host Group Delta successfully scrubbed and reintegrated.',
        '[SUMMARY] Incident mitigated with 0 dropped web packets. Global uptime: 100%.'
      ]);
      setClusterState('NOMINAL (HEALTHY)');
      setLiveTrafficLoad('100% Operational Capacity');
    }
    return () => clearTimeout(timer);
  }, [responseStatus]);

  return (
    <section className="relative bg-slate-950 text-slate-100 py-24 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Full-Spectrum AI Application Security Engine
          </h2>
          <p className="text-slate-400">
            AI Sentinel protects everything from network architecture anomalies to autonomous AI Agent execution parameters. Test our modules below.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            onClick={() => { setActiveTab('hunting'); setProgress(0); }}
            className={`px-5 py-2.5 rounded-lg text-sm font-mono transition-all border ${activeTab === 'hunting' ? 'bg-blue-950 border-blue-500 text-blue-400' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'}`}
          >
            01 // Autonomous Threat Hunting
          </button>
          <button 
            onClick={() => { setActiveTab('patching'); setProgress(0); }}
            className={`px-5 py-2.5 rounded-lg text-sm font-mono transition-all border ${activeTab === 'patching' ? 'bg-blue-950 border-blue-500 text-blue-400' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'}`}
          >
            02 // Predictive Agent Patching
          </button>
          <button 
            onClick={() => { setActiveTab('response'); setProgress(0); }}
            className={`px-5 py-2.5 rounded-lg text-sm font-mono transition-all border ${activeTab === 'response' ? 'bg-blue-950 border-blue-500 text-blue-400' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'}`}
          >
            03 // Zero-Downtime Incident Response
          </button>
        </div>

        {/* TAB 1: THREAT HUNTING */}
        <AnimatePresence mode="wait">
          {activeTab === 'hunting' && (
            <motion.div
              key="hunting"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                Network Layer Threat Hunting
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Monitors raw cluster infrastructure memory layouts and connection rates to instantly locate and mitigate zero-day buffer exploits natively before firewall handshakes collapse.
              </p>
              <div className="space-y-3">
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <button
                onClick={() => { setProgress(0); setHuntStatus('scanning'); }}
                disabled={huntStatus === 'scanning' || huntStatus === 'analyzing' || huntStatus === 'resolving'}
                className="w-full bg-slate-950 hover:bg-slate-900 text-blue-400 border border-blue-500/30 font-mono text-xs py-3 rounded-xl"
              >
                {huntStatus === 'idle' && '> RUN NETWORK HEURISTIC HUNT'}
                {huntStatus !== 'idle' && huntStatus !== 'resolved' ? '> RUNNING REALTIME ANALYTICS...' : '> HUNT CYCLE SYSTEM RE-RUN'}
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="p-6 bg-slate-900/30 border-b border-slate-800 grid grid-cols-2 gap-4">
                  {networkNodes.map((node) => (
                    <div key={node.id} className={`p-4 rounded-xl border transition-all duration-500 ${node.status === 'breached' ? 'bg-rose-950/20 border-rose-500' : 'bg-slate-900/60 border-slate-800'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-slate-500">{node.id}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${node.status === 'breached' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{node.status}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-200">{node.name}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">Packets: {node.packetRate}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 font-mono text-[11px] text-slate-400 h-40 overflow-y-auto space-y-1 bg-slate-950">
                  {huntLogs.length === 0 ? <div className="text-slate-600">// Standing by for execution call...</div> : huntLogs.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 2: PREDICTIVE PATCHING */}
        <AnimatePresence mode="wait">
          {activeTab === 'patching' && (
            <motion.div
              key="patching"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                AI Agent RCE Sandboxing
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                When your AI Agents gain server tool access, attackers use downstream injections to hijack terminal sessions. AI Sentinel runs predictive sandboxing to test agent outputs before they execute on production cores.
              </p>
              <div className="space-y-3">
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <button
                onClick={() => { setProgress(0); setPatchStatus('intercepting'); }}
                disabled={patchStatus === 'intercepting' || patchStatus === 'sandboxing'}
                className="w-full bg-slate-950 hover:bg-slate-900 text-emerald-400 border border-emerald-500/30 font-mono text-xs py-3 rounded-xl"
              >
                {patchStatus === 'idle' && '> TRIGGER AGENT RCE ATTACK SIMULATION'}
                {patchStatus !== 'idle' && patchStatus !== 'patched' ? '> EVALUATING EXECUTION TOKENS...' : '> SIMULATE ATTACK PIPELINE AGAIN'}
              </button>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="text-[10px] font-mono text-slate-500 mb-2">System Integrity</div>
                  <div className={`text-xs font-bold font-mono ${agentMetrics.systemIntegrity.includes('DEGRADED') ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>{agentMetrics.systemIntegrity}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="text-[10px] font-mono text-slate-500 mb-2">Agent Framework</div>
                  <div className="text-xs font-bold text-blue-400">{agentMetrics.activePipelines}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="text-[10px] font-mono text-slate-500 mb-2">RCE Intercepts</div>
                  <div className="text-xs font-bold text-rose-400">{agentMetrics.blockedExecutions}</div>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="p-4 bg-slate-900/30 border-b border-slate-800 text-xs font-mono text-slate-400">
                  SANDBOX EXECUTION LOG
                </div>
                <div className="p-4 font-mono text-[11px] h-40 overflow-y-auto space-y-1 bg-slate-950">
                  {patchLogs.length === 0 ? (
                    <div className="text-slate-600">// Awaiting execution sequence. Deploy attack simulation to view runtime sandbox logic.</div>
                  ) : (
                    patchLogs.map((l, i) => (
                      <div key={i} className={`${l.includes('CRITICAL') ? 'text-rose-400' : l.includes('SUCCESS') ? 'text-emerald-400' : l.includes('ALERT') ? 'text-amber-400' : 'text-slate-400'}`}>
                        {l}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 3: ZERO-DOWNTIME INCIDENT RESPONSE */}
        <AnimatePresence mode="wait">
          {activeTab === 'response' && (
            <motion.div
              key="response"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                Active Core Virtual Isolation Router
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                When a system node encounters direct compromise, traditional tools drop traffic to isolate the host. AI Sentinel spins up a live containerized proxy array instantly, hot-swapping operational pathways with 0ms downtime to incoming users.
              </p>
              <div className="space-y-3">
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <button
                onClick={() => { setProgress(0); setResponseStatus('breach'); }}
                disabled={responseStatus === 'breach' || responseStatus === 'isolating' || responseStatus === 'hotpatch'}
                className="w-full bg-slate-950 hover:bg-slate-900 text-purple-400 border border-purple-500/30 font-mono text-xs py-3 rounded-xl"
              >
                {responseStatus === 'idle' && '> TRIGGER LIVE SERVER INTRUSION ATTACK'}
                {responseStatus !== 'idle' && responseStatus !== 'restored' ? '> REDIRECTING ENTIRE TRAFFIC MESH...' : '> SIMULATE HOST BREACH MITIGATION AGAIN'}
              </button>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="text-[10px] font-mono text-slate-500 mb-2">Cluster Engine Health</div>
                  <div className={`text-xs font-bold font-mono ${clusterState.includes('BREACH') || clusterState.includes('HOTPATCH') ? 'text-rose-400 animate-pulse' : 'text-purple-400'}`}>{clusterState}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="text-[10px] font-mono text-slate-500 mb-2">Live End-User Uptime</div>
                  <div className="text-xs font-bold text-emerald-400">{liveTrafficLoad}</div>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="p-4 bg-slate-900/30 border-b border-slate-800 text-xs font-mono text-slate-400">
                  LIVE TRAFFIC LOG STREAM
                </div>
                <div className="p-4 font-mono text-[11px] h-40 overflow-y-auto space-y-1 bg-slate-950">
                  {responseLogs.length === 0 ? (
                    <div className="text-slate-600">// Network clusters nominal. Engage attack switch to trigger hot-swap failover procedures.</div>
                  ) : (
                    responseLogs.map((l, i) => (
                      <div key={i} className={`${l.includes('CRITICAL') || l.includes('INTRUSION') ? 'text-rose-400' : l.includes('SUCCESS') ? 'text-emerald-400' : l.includes('ROUTING') ? 'text-purple-400' : 'text-slate-400'}`}>
                        {l}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

  // ==========================================
