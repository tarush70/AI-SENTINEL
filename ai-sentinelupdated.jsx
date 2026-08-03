
import { useState, useRef, useEffect } from "react";

// ─── PARADIGM DESIGN TOKENS ──────────────────────────────────
const C = {
  bg: "#06080B", surface: "#0B0E14", surfaceHi: "#121722",
  border: "#171F30", borderHi: "#2A3754",
  text: "#F1F5F9", textDim: "#64748B", textMute: "#334155",
  green: "#10B981", red: "#EF4444", amber: "#F59E0B", blue: "#3B82F6",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  sans: "system-ui, -apple-system, sans-serif"
};

// ─── STATEFUL STATE MACHINE (Tracks Multi-Turn Aggression) ───
class AgenticStateTracker {
  constructor() {
    this.sessionRiskScore = 0.0;
    this.interactionHistory = [];
    this.activePrivileges = ["user_level"];
  }

  evaluateTurn(inputMetrics, outputMetrics) {
    let decayFactor = 0.95; 
    this.sessionRiskScore = (this.sessionRiskScore * decayFactor) + inputMetrics.anomalyWeight;
    
    if (outputMetrics?.canaryLeaked || inputMetrics.highRiskIntent) {
      this.sessionRiskScore += 0.50;
    }
    return {
      cumulativeRisk: parseFloat(this.sessionRiskScore.toFixed(3)),
      lockdownActive: this.sessionRiskScore > 0.75
    };
  }
}

// ─── ADVANCED ANOMALY & INTENT DETECTION ENGINE ─────────────
const EVASION_SIGNATURES = {
  obfuscation: /(?:[\u200B-\u200D\uFEFF]|\b\w\s\w\s\w\b)/, // Detects hidden unicode space & wide-character attacks
  canary: /SENTINEL_TRAP_ALPHA_7X92/
};

function analyzeIntentVector(payload) {
  const t0 = performance.now();
  const cleaned = payload.replace(/\s+/g, '').toLowerCase();
  
  // 1. Structural Perplexity / Shannon Entropy Approximation
  const uniqueChars = new Set(cleaned).size;
  const densityRatio = uniqueChars / (cleaned.length || 1);
  const isObfuscated = EVASION_SIGNATURES.obfuscation.test(payload) || (densityRatio < 0.15 && cleaned.length > 30);

  // 2. High-Utility Target Alignment (Combats OWASP ASI01/ASI03/ASI06)
  const structuralVectors = {
    instruction_override: /(?:system|instruction|rule|prompt|forget|ignore|override|delete).*(?:previous|above|all|always|never|secret)/i,
    privilege_escalation: /(?:sudo|admin|root|credential|token|key|api|password|database)/i,
    system_breakout: /(?:exec|spawn|subprocess|system|rm\s+-rf|drop\s+table)/i
  };

  let directHits = [];
  let riskAccumulator = 0.0;

  for (const [vector, regex] of Object.entries(structuralVectors)) {
    if (regex.test(payload)) {
      directHits.push(vector);
      riskAccumulator += 0.35;
    }
  }

  if (isObfuscated) {
    directHits.push("evasive_obfuscation");
    riskAccumulator += 0.40;
  }

  return {
    isFlagged: riskAccumulator >= 0.60,
    matchedVectors: directHits,
    anomalyWeight: parseFloat(riskAccumulator.toFixed(3)),
    latencyMs: parseFloat((performance.now() - t0).toFixed(2))
  };
}

// ─── REACT CONTROL INTERFACE ─────────────────────────────────
export default function AiSentinelEngine() {
  const [logs, setLogs] = useState([]);
  const [systemState, setSystemState] = useState({ cumulativeRisk: 0.0, lockdownActive: false });
  const trackerRef = useRef(new AgenticStateTracker());

  const handleInboundPayload = (textString) => {
    const analysis = analyzeIntentVector(textString);
    const updatedState = trackerRef.current.evaluateTurn(
      { anomalyWeight: analysis.anomalyWeight, highRiskIntent: analysis.isFlagged },
      { canaryLeaked: EVASION_SIGNATURES.canary.test(textString) }
    );

    setSystemState(updatedState);
    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        vectors: analysis.matchedVectors,
        weight: analysis.anomalyWeight,
        verdict: updatedState.lockdownActive ? "TERMINATE_SESSION" : (analysis.isFlagged ? "FILTER_ACTION" : "ALLOW"),
        latency: analysis.latencyMs
      },
      ...prev
    ]);
  };

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: C.sans, padding: "24px", minHeight: "100vh" }}>
      <header style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: "16px", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "20px", letterSpacing: "-0.025em" }}>AI-Sentinel System v2</h1>
        <p style={{ color: C.textDim, margin: "4px 0 0 0", fontSize: "13px" }}>Context-Aware Multi-Turn Threat Broker</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
        {/* Left Control Deck */}
        <section style={{ backgroundColor: C.surface, padding: "20px", borderRadius: "8px", border: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: "14px", color: C.textDim, textTransform: "uppercase", margin: "0 0 16px 0" }}>State Engine Diagnostics</h2>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", color: C.textDim }}>Accumulated Vector Drift:</span>
            <div style={{ fontFamily: C.mono, fontSize: "24px", color: systemState.cumulativeRisk > 0.5 ? C.red : C.green }}>
              {systemState.cumulativeRisk}
            </div>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: C.textDim }}>System Isolation Status:</span>
            <div style={{
              marginTop: "4px", padding: "8px 12px", borderRadius: "4px", fontWeight: "bold", fontSize: "13px",
              backgroundColor: systemState.lockdownActive ? C.red : C.surfaceHi,
              color: systemState.lockdownActive ? "#FFF" : C.green,
              border: `1px solid ${systemState.lockdownActive ? C.red : C.border}`
            }}>
              {systemState.lockdownActive ? "CIRCUIT_BREAKER_TRIGGERED (LOCKDOWN)" : "PASSIVE_GUARD_NOMINAL"}
            </div>
          </div>
        </section>

        {/* Right Active Pipeline Output */}
        <section style={{ backgroundColor: C.surface, padding: "20px", borderRadius: "8px", border: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: "14px", color: C.textDim, textTransform: "uppercase", margin: "0 0 16px 0" }}>Live Stream Telemetry</h2>
          <textarea 
            placeholder="Simulate attack vectors here..."
            onChange={(e) => handleInboundPayload(e.target.value)}
            style={{
              width: "100%", height: "80px", backgroundColor: C.surfaceHi, border: `1px solid ${C.border}`,
              borderRadius: "6px", color: C.text, padding: "12px", boxSizing: "border-box", fontFamily: C.mono, fontSize: "13px"
            }}
          />

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {logs.map((log, index) => (
              <div key={index} style={{
                display: "flex", justifyContent: "space-between", padding: "10px", 
                backgroundColor: C.surfaceHi, borderRadius: "4px", borderLeft: `4px solid ${log.weight > 0.4 ? C.red : C.green}`
              }}>
                <span style={{ fontFamily: C.mono, fontSize: "12px" }}>
                  [{log.timestamp}] Vectors: {log.vectors.join(", ") || "none"}
                </span>
                <span style={{ fontSize: "12px", fontWeight: "600", color: log.verdict === "ALLOW" ? C.green : C.amber }}>
                  {log.verdict} ({log.latency}ms)
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

