"""
AI Sentinel — Module 1: Autonomous Threat Hunting (Network Layer)
==================================================================
Runs at the infrastructure level. Watches raw TCP/IP packet flows
for data exfiltration, DDoS, and anomalous heartbeat patterns.
"""

import time
import random
from datetime import datetime
from dataclasses import dataclass
from typing import List, Dict, Set, Optional


@dataclass
class ThreatReport:
    status: str              # "SECURE" | "WARNING" | "CRITICAL"
    threat_type: str         # e.g. "Data Exfiltration", "DDoS"
    source: str              # e.g. "Model-Node-Alpha"
    target: str              # e.g. "Unverified-IP (45.33.22.11)"
    payload_size: str        # e.g. "4.2 GB"
    raw_bytes: int           # bytes transferred in this window
    timestamp: str = ""

    def __post_init__(self):
        self.timestamp = datetime.now().strftime("%H:%M:%S")


# Simulated cluster topology
NODE_TOPOLOGY: List[Dict[str, object]] = [
    {"id": "Model-Node-Alpha",      "role": "Inference Server",  "baseline_kbps": 1200},
    {"id": "Vector-DB-Shard-04",    "role": "Vector Database",   "baseline_kbps": 800},
    {"id": "Auth-API-Gateway-02",   "role": "API Gateway",       "baseline_kbps": 2400},
    {"id": "S3-Asset-Pipeline",     "role": "Storage Pipeline",  "baseline_kbps": 4800},
    {"id": "Legacy-SSH-Portal",     "role": "Admin Interface",   "baseline_kbps": 210},
]


class NetworkSentry:
    """Sniffs simulated network flows and raises threat alerts."""

    def __init__(self, anomaly_threshold: float = 1.8):
        self.baseline_traffic = 50  # MB/s aggregate baseline
        self.sus_ips: Set[str] = {"192.168.1.105", "10.0.0.99", "45.33.22.11"}
        self.anomaly_threshold = anomaly_threshold
        self.observation_window: List[float] = []
        self.alerts_raised = 0

    def analyze_packet_flow(self) -> ThreatReport:
        """
        Simulate a packet-sniffing cycle over the cluster.
        In production this would use Scapy: from scapy.all import sniff, IP, TCP
        """
        print(
            f"[{datetime.now().strftime('%H:%M:%S')}] "
            f"📡 SENTRY: Sniffing {len(NODE_TOPOLOGY)} cluster nodes..."
        )

        # Random traffic spike simulation
        risk_roll = random.randint(1, 10)
        current_payload = random.randint(50, 500)

        if risk_roll > 8:
            # Critical event — data exfiltration or DDoS
            src = random.choice(NODE_TOPOLOGY)
            target_ip = random.choice(list(self.sus_ips))
            exfil_size_gb = round(random.uniform(0.5, 50), 1)
            self.alerts_raised += 1
            return ThreatReport(
                status="CRITICAL",
                threat_type=random.choice([
                    "Data Exfiltration",
                    "DDoS Amplification",
                    "Reverse Shell Connection",
                    "DNS Tunneling",
                ]),
                source=src["id"],  # type: ignore[arg-type]
                target=f"Unverified-IP ({target_ip})",
                payload_size=f"{exfil_size_gb} GB",
                raw_bytes=current_payload,
            )
        elif risk_roll > 6:
            # Warning — anomalous heartbeat / port scan
            src = random.choice(NODE_TOPOLOGY)
            return ThreatReport(
                status="WARNING",
                threat_type=random.choice([
                    "Abnormal Heartbeat",
                    "Port Scan Detected",
                    "Unusual Outbound TLS Handshake",
                    "Non-compliant Protocol Frame",
                ]),
                source=src["id"],  # type: ignore[arg-type]
                target="Internal-Gateway",
                payload_size="12 KB",
                raw_bytes=current_payload,
            )

        return ThreatReport(
            status="SECURE",
            threat_type="Normal Operation",
            source="—",
            target="—",
            payload_size=f"{current_payload} MB",
            raw_bytes=current_payload,
        )

    def run_continuous_scan(self, interval: float = 2.0, max_cycles: int = 10):
        """Run N sniffing cycles and print results (used in standalone mode)."""
        print("\n" + "=" * 60)
        print("   NETWORK SENTRY — Continuous Threat Scan")
        print("=" * 60 + "\n")
        for cycle in range(1, max_cycles + 1):
            print(f"── Cycle {cycle} ──")
            report = self.analyze_packet_flow()
            self._print_report(report)
            if report.status == "CRITICAL":
                print(f"  🚨 ALERT: {report.threat_type} from {report.source}!")
            else:
                print(f"  ✅ NETWORK NORMAL: {report.payload_size} throughput")
            print()
            time.sleep(interval)

    @staticmethod
    def _print_report(r: ThreatReport):
        print(f"  Status       : {r.status}")
        print(f"  Type         : {r.threat_type}")
        print(f"  Source       : {r.source}")
        print(f"  Target       : {r.target}")
        print(f"  Payload      : {r.payload_size}")


# ─── Standalone test ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    sentry = NetworkSentry()
    sentry.run_continuous_scan(interval=1.5, max_cycles=6)
    print(f"\nAlerts raised during session: {sentry.alerts_raised}")
