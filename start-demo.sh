#!/bin/bash
# AI Sentinel — Demo Launcher
# Starts both the Demo API server and the React Dashboard.

echo "╔══════════════════════════════════════════════════╗"
echo "║   AI Sentinel — Starting Demo Environment       ║"
echo "╚══════════════════════════════════════════════════╝"

# Kill any leftover processes
pkill -f "demo_server.py" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 1

# Start demo API server (port 3001)
echo ""
echo "  [1/2] Starting Demo API server (port 3001)..."
python3 "$(dirname "$0")/demo_server.py" &
sleep 1

# Start Vite dev server (port 5173) — fully detached
echo "  [2/2] Starting React Dashboard (port 5173)..."
cd "$(dirname "$0")"
npx vite --host 127.0.0.1 --port 5173 &
sleep 2

echo ""
echo "  ✅ Demo ready!"
echo "     Dashboard : http://localhost:5173"
echo "     API       : http://localhost:3001"
echo ""
echo "  ▶ Run the demo:"
echo "    ENABLE_SENTINEL=0 python3 employee_bot.py   # LEAK"
echo "    python3 employee_bot.py                      # BLOCKED"
echo ""
