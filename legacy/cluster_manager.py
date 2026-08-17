"""
AI Sentinel — Module 3: Zero-Downtime Incident Response (Orchestration)
========================================================================
Runs at the orchestration level. Acts as the "Manager" — when Module 1
detects a breach, Module 3 isolates the infected node, hot-swaps in a
shadow container, and redirects traffic with zero dropped packets.
"""

import time
from datetime import datetime
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class NodeState:
    id: str
    role: str
    status: str = "Active (Primary)"  # Active, Isolating, Patching, Standby


class ClusterManager:
    """Simulates an enterprise load-balancer / orchestrator."""

    def __init__(self):
        self.nodes: List[NodeState] = [
            NodeState("node_01", "Inference Server", "Active (Primary)"),
            NodeState("node_02", "Replica Cache",    "Active (Replica)"),
            NodeState("node_03", "Replica Cache",    "Active (Replica)"),
            NodeState("node_shadow", "Shadow Container", "Standby (Cold)"),
        ]
        self._traffic_route: List[str] = ["node_01", "node_02", "node_03"]
        self._failover_count = 0
        self._total_downtime_ms = 0  # cumulative simulated downtime

    # ── Public API ──────────────────────────────────────────────────────────

    def status(self) -> List[NodeState]:
        """Print and return the current cluster health matrix."""
        print(f"\n{'─'*50}")
        print(f"  CLUSTER HEALTH MATRIX  [{datetime.now().strftime('%H:%M:%S')}]")
        print(f"{'─'*50}")
        for n in self.nodes:
            icon = self._icon_for(n)
            print(f"  {icon} {n.id:20s}  {n.role:20s}  {n.status}")
        print(f"{'─'*50}")
        print(f"  Traffic route : {' → '.join(self._traffic_route)}")
        print(f"  Total failovers: {self._failover_count}")
        print(f"  Cumul. downtime: {self._total_downtime_ms} ms")
        print(f"{'─'*50}\n")
        return self.nodes

    def trigger_failover(self, target_node_id: str) -> bool:
        """
        Full zero-downtime failover sequence:
          1. Drain active sessions from the breached node
          2. Hot-swap shadow node into the traffic pool
          3. Verify routing

        Returns True if the failover completed successfully.
        """
        target = self._find_node(target_node_id)
        if target is None:
            print(f"[ORCHESTRATOR] ❌ Unknown node '{target_node_id}'. Abort.")
            return False

        if "Standby" in target.status:
            print(f"[ORCHESTRATOR] ⚠️  '{target_node_id}' is already standby. Nothing to do.")
            return False

        print(f"\n[ORCHESTRATOR] ⚠️  BREACH CONFIRMED ON {target_node_id.upper()}")
        print(f"[ORCHESTRATOR] 🔄 Initiating zero-downtime traffic shift...")
        time.sleep(0.5)

        # ── Step 1: Drain ────────────────────────────────────────────────
        print(f"[LOAD BALANCER] 🛑 Draining active sessions from {target_node_id}...")
        target.status = "Isolating (Breach Containment)"
        if target_node_id in self._traffic_route:
            self._traffic_route.remove(target_node_id)
        time.sleep(0.5)

        # ── Step 2: Hot-swap shadow ──────────────────────────────────────
        shadow = self._find_node("node_shadow")
        if shadow and "Standby" in shadow.status:
            print(f"[LOAD BALANCER] ⚡ Hot-swapping 'node_shadow' to replace capacity...")
            shadow.status = "Active (Shadow Instance)"
            self._traffic_route.append("node_shadow")
            # Simulate minimal route-propagation delay (~10 ms)
            self._total_downtime_ms += 10
        else:
            print(f"[LOAD BALANCER] ⚠️  No shadow instance available. Degraded mode.")
            self._total_downtime_ms += 200  # real delay if no hot spare

        time.sleep(0.5)

        # ── Step 3: Verify ───────────────────────────────────────────────
        self._failover_count += 1
        print(f"[ORCHESTRATOR] ✅ Failover complete. No dropped packets.")
        print(f"[ORCHESTRATOR] 📊 Downtime incurred: {self._total_downtime_ms} ms cumulative\n")
        self.status()
        return True

    def restore_node(self, node_id: str) -> bool:
        """Reintegrate a previously-isolated node after it's been scrubbed."""
        target = self._find_node(node_id)
        if target is None:
            print(f"[ORCHESTRATOR] ❌ Unknown node '{node_id}'.")
            return False

        if "Isolating" not in target.status:
            print(f"[ORCHESTRATOR] ⚠️  '{node_id}' is not isolated. Nothing to restore.")
            return False

        print(f"[ORCHESTRATOR] 🔧 Scrubbing & reintegrating {node_id}...")
        time.sleep(1)
        target.status = "Active (Replica)"
        self._traffic_route.append(node_id)
        print(f"[ORCHESTRATOR] ✅ {node_id} restored to active pool.")
        self.status()
        return True

    # ── Internal helpers ────────────────────────────────────────────────────

    def _find_node(self, node_id: str) -> Optional[NodeState]:
        return next((n for n in self.nodes if n.id == node_id), None)

    @staticmethod
    def _icon_for(n: NodeState) -> str:
        if "Active" in n.status:
            return "🟢"
        if "Isolating" in n.status:
            return "🔴"
        if "Patching" in n.status:
            return "🟡"
        return "⚫"


# ─── Standalone test ─────────────────────────────────────────────────────────

DEMO_SCRIPT = """
=== AI Sentinel — Module 3 (Zero-Downtime Response) ===

Simulating a live cluster with 4 nodes.
When a critical alert arrives from Module 1 (Network Sentry),
the orchestrator drains traffic from the breached node and
hot-swaps in a shadow container — users see zero disruption.
"""

if __name__ == "__main__":
    print(DEMO_SCRIPT)
    manager = ClusterManager()
    manager.status()

    print("Press ENTER to simulate a CRITICAL ALERT from Network Sentry...")
    input("  > ")

    manager.trigger_failover("node_01")

    print("\nSystem stable. Press ENTER to restore node_01 after scrubbing...")
    input("  > ")
    manager.restore_node("node_01")
