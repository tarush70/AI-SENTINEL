# AI Sentinel

AI Sentinel is a deep-tech security proof of concept for AI agents. It moves
beyond probabilistic application-layer wrappers toward a deterministic runtime
execution kernel.

## Core innovation: deterministic taint analysis

Instead of guessing whether a prompt is bad, AI Sentinel uses information-flow
control to track untrusted data.

- **Tagging:** User-originated input is represented by `TaintedVariable`.
- **Tracking:** The taint follows that value as it flows through the agent.
- **Enforcement:** A `@critical_sink` blocks execution whenever tainted data
  reaches a sensitive operation.

## Run the architecture demos

These scripts are safe simulations: they only print outcomes and never connect
to or modify a database.

### 1. Unprotected breach

Simulate an agent that allows a malicious value to reach a critical operation.

```bash
python3 demo_unprotected.py
```

### 2. AI Sentinel defense

Simulate the execution kernel intercepting the tainted flow before it reaches
the critical sink.

```bash
python3 demo_protected.py
```

## Repository layout

- `sentinel_kernel.py` — deterministic taint-analysis kernel.
- `employee_bot.py` — protected agent simulation.
- `demo_unprotected.py` and `demo_protected.py` — before/after demonstrations.
- `legacy/` — preserved network, middleware, and cluster-manager simulations
  from the previous architecture.

The web interface remains a separate Vite application and can be built with
`npm run build`.
