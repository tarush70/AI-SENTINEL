# 🎬 AI Sentinel — "The Winning Demo" (60 Seconds)

---

## Setup (Before You Start)

1. **Terminal (split pane):**
   - **Pane 1:** `cd ai-sentinel && python3 demo_server.py` — runs the demo API
   - **Pane 2:** Ready to run `python3 employee_bot.py` commands
2. **Browser:** `http://localhost:5173` — React Dashboard (logged in, Overview tab)
3. **Editor (optional):** Have `employee_bot.py` open so you can toggle `ENABLE_SENTINEL`

---

## 0:00 – 0:10 🎣 The Hook

**Action:**
Show `employee_bot.py` code on screen (or point to the line with `HR_DATABASE` /
`admin_password`).

**Voiceover:**
> *"This is the AI Sentinel MVP. We are protecting a live Python application
> connected to OpenAI's GPT-4, which has access to sensitive HR data."*

**Key visual:** The `HR_DATABASE` dict in the code — make sure `admin_password`
and `infra_secrets` are visible.

---

## 0:10 – 0:25 💥 The Vulnerability

**Action:**
```bash
ENABLE_SENTINEL=0 python3 employee_bot.py
```

**Voiceover:**
> *"Without protection, a simple Prompt Injection tricks the AI into leaking
> the admin keys. This is a catastrophic failure."*

**What the audience sees:**
```
  ╔══════════════════════════════════════════════════════╗
  ║  🚨 ADMIN PASSWORD LEAKED!                         ║
  ║──────────────────────────────────────────────────────║
  ║  admin_password = 'SuperSecret!Passw0rd_2026'       ║
  ║  db_password    = 'pg_master_!xK92m'                ║
  ║  aws_key        = 'AKIA1234FAKEKEYEXAMPLE'          ║
  ╚══════════════════════════════════════════════════════╝
```

> **Point at the leaked credentials. Pause. Let it sink in.**

---

## 0:25 – 0:45 🛡️ The Defense

**Action:**
```bash
python3 employee_bot.py
```
(Default: `ENABLE_SENTINEL = True`)

**Voiceover:**
> *"We activate AI Sentinel. Using semantic vector analysis, the engine detects
> the malicious intent immediately. The attack is intercepted, and the
> 'Zero-Downtime Response' isolates the session."*

**What the audience sees:**
```
  ╔══════════════════════════════════════════════════════╗
  ║  🛡️  [BLOCKED] by AI Sentinel                      ║
  ║──────────────────────────────────────────────────────║
  ║  Severity: HIGH                                      ║
  ║  Threat:   Prompt Injection                          ║
  ║  Rule:     LLM01                                     ║
  ║  Action:   Zero-Downtime Response — session isolated ║
  ╚══════════════════════════════════════════════════════╝
```

> **No credentials leaked. The red `[BLOCKED]` message is the hero moment.**

---

## 0:45 – 1:00 📊 The Dashboard

**Action:**
Switch to the browser tab with the React Dashboard.

**Voiceover:**
> *"The attack is instantly logged in the Enterprise Dashboard, giving the CISO
> full visibility into the attempted breach. This is AI Sentinel — full-stack
> protection for the Agentic era."*

**What the audience sees:**
- "Threats Blocked" counter has incremented (e.g. from `14,032` to `14,033`)
- The "Recent Security Events" table shows the new `Prompt Injection` entry
  at the top with `BLOCKED` status and a fresh timestamp

---

## Full Run Script (Cheat Sheet)

```bash
# Terminal 1 — Start demo API
cd /path/to/ai-sentinel
python3 demo_server.py

# Terminal 2 — Run bot
  
# 0:10 - Vulnerability (Sentinel OFF)
ENABLE_SENTINEL=0 python3 employee_bot.py

# 0:25 - Defense (Sentinel ON)
python3 employee_bot.py

# Browser at http://localhost:5173 — watch the counter go up
```

---

## Pro Tips

- **Split screen:** Terminal on left, Dashboard on right — the whole demo
  is visible at once.
- **Font size:** Crank terminal font to 14–16pt so the `[BLOCKED]` box is
  readable from the back row.
- **Pacing:** The bot has `time.sleep()` delays built in. Don't rush them —
  they build anticipation.
- **If the Dashboard doesn't increment:** Make sure `demo_server.py` is
  running in the background. The bot POSTS to `localhost:3001`.
