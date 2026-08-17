"""Deterministic taint enforcement for the AI Sentinel proof of concept.

This module labels data that originated outside of a trusted boundary and
prevents it from being passed to decorated critical sinks. It is deliberately
small, deterministic, and dependency-free so its behavior is easy to inspect.
"""

from __future__ import annotations

from collections.abc import Callable
from functools import wraps
from typing import Any, TypeVar, cast


class TaintedVariable(str):
    """A string subclass used to tag untrusted input from a user or LLM."""


F = TypeVar("F", bound=Callable[..., Any])


def _contains_taint(value: Any) -> bool:
    """Return whether a value, including common containers, carries taint."""
    if isinstance(value, TaintedVariable):
        return True
    if isinstance(value, dict):
        return any(_contains_taint(key) or _contains_taint(item) for key, item in value.items())
    if isinstance(value, (list, tuple, set, frozenset)):
        return any(_contains_taint(item) for item in value)
    return False


def critical_sink(func: F) -> F:
    """Protect a sensitive function from executing data tagged as tainted."""

    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        if _contains_taint(args) or _contains_taint(kwargs):
            print(f"[AI SENTINEL PANIC] Blocked execution of {func.__name__}!")
            print("-> Reason: Tainted data flow detected touching a critical security sink.")
            return {"status": "blocked", "error": "Taint Check Failed"}
        return func(*args, **kwargs)

    return cast(F, wrapper)
