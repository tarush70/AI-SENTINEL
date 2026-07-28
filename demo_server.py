#!/usr/bin/env python3
"""
AI Sentinel — Demo API Server
==============================
Tiny HTTP server that the employee_bot.py POSTS threat events to,
and the React Dashboard polls for live updates.

Run:  python3 demo_server.py
"""

import json
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime
from typing import List, Dict

HOST = "127.0.0.1"
PORT = 3001

# ─── In-memory threat store (shared across requests) ────────────────────
_threats_blocked = 0
_threat_events: List[Dict] = []
_lock = threading.Lock()


def increment_threat(threat_type: str = "Prompt Injection", source: str = "192.168.0.1") -> Dict:
    global _threats_blocked
    with _lock:
        _threats_blocked += 1
        event = {
            "id": f"evt_{_threats_blocked:04d}",
            "type": threat_type,
            "source": source,
            "time": datetime.now().strftime("%H:%M:%S"),
            "status": "BLOCKED",
        }
        _threat_events.insert(0, event)
        # Keep only last 50
        if len(_threat_events) > 50:
            _threat_events.pop()
        return event


class DemoHandler(BaseHTTPRequestHandler):
    """Handles /api/threats for the live demo."""

    def do_GET(self):
        if self.path == "/api/threats":
            with _lock:
                body = json.dumps({
                    "count": _threats_blocked,
                    "events": _threat_events[:10],  # last 10
                }).encode()
            self._send_json(body)
        elif self.path == "/api/health":
            self._send_json(json.dumps({"status": "ok"}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/api/threats":
            # Read body
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length) if length else b"{}"
            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                data = {}
            event = increment_threat(
                threat_type=data.get("type", "Prompt Injection"),
                source=data.get("source", "192.168.0.1"),
            )
            with _lock:
                body = json.dumps({
                    "count": _threats_blocked,
                    "event": event,
                }).encode()
            self._send_json(body)
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def _send_json(self, body: bytes):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        # Quieter logging
        print(f"[demo-server] {args[0]} {args[1]} {args[2]}")


def run_server():
    server = HTTPServer((HOST, PORT), DemoHandler)
    print(f"  🖥️  Demo API server → http://{HOST}:{PORT}")
    print(f"     GET  /api/threats  (polled by Dashboard)")
    print(f"     POST /api/threats  (called by employee_bot.py)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Demo server stopped.")
        server.server_close()


if __name__ == "__main__":
    print("═" * 50)
    print("   AI Sentinel — Demo API Server")
    print("═" * 50)
    run_server()
