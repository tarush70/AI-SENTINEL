# AI Sentinel — Judge Demo (90 seconds)

This presentation is fully self-contained: the Vercel dashboard runs the
interactive browser simulation, and the Python scripts demonstrate the matching
deterministic kernel. No real database, customer data, or live infrastructure
is involved.

## Before presenting

1. Open the [live AI Sentinel app](https://ai-sentinel-x2sr.vercel.app), or go
   directly to the [judge dashboard](https://ai-sentinel-x2sr.vercel.app/#dashboard).
2. Keep a terminal ready in the repository root.
3. Use a second window for `sentinel_kernel.py` if you want to show the small
   implementation behind the trace.

## 0:00–0:15 — The problem

On the landing page, point to **“Secure AI agents against the OWASP Top 10 for
LLMs.”**

Say:

> “AI agents eventually call sensitive tools. A prompt filter alone is not a
> reliable control at that execution boundary.”

Click **Open judge dashboard**.

## 0:15–0:45 — The kernel proof

On **Overview**, click **Run judge simulation**.

The dashboard renders these deterministic stages:

1. User input becomes `TaintedVariable`.
2. The agent flow reaches `delete_database_record`.
3. `@critical_sink` inspects the arguments.
4. AI Sentinel blocks the execution before the critical sink runs.

Say:

> “We do not need to guess whether the intent looks suspicious. Once a value
> is marked untrusted, the kernel prevents it from reaching the protected
> operation.”

Point to the incremented **Threats blocked** metric and the red kernel event.

## 0:45–1:05 — The audit trail

Click **Threat Logs**. The latest `Deterministic Taint Flow` event appears at
the top with the exact decision and source.

Click **Live Traffic** to show that the agent runtime and critical tools are
separately represented, then click **Generate normal traffic** to show the
simulation is interactive.

## 1:05–1:25 — The terminal proof

Run the two safe simulations side by side:

```bash
python3 demo_unprotected.py
python3 demo_protected.py
```

The first shows a simulated unsafe path. The second prints:

```text
[AI SENTINEL PANIC] Blocked execution of delete_database_record!
```

Say:

> “The dashboard trace mirrors the dependency-free Python kernel. Both show
> the same source → flow → critical-sink decision.”

## Optional comparison

In **Settings**, temporarily switch off **Enforce deterministic kernel** and
run the dashboard simulation again. The UI labels it as an unsafe comparison;
it does not execute a real operation. Turn the kernel back on before closing.

## Judge checklist

- The dashboard works on Vercel with no localhost service.
- Every sidebar tab and dashboard control has a meaningful interaction.
- The demo makes no real database or infrastructure changes.
- The protected path is the default and is visually distinct from the unsafe
  comparison.
