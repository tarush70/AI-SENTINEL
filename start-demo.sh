#!/usr/bin/env bash
set -euo pipefail

echo "AI Sentinel — deterministic-kernel demo"
echo
echo "Production dashboard: https://ai-sentinel-x2sr.vercel.app"
echo "Python proof scripts:"
echo "  python3 demo_unprotected.py"
echo "  python3 demo_protected.py"
echo
echo "Starting the local Vite preview at http://127.0.0.1:5173"
exec npm run dev -- --host 127.0.0.1
