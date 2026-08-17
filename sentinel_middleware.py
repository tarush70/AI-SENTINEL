"""ARCHIVED: the probabilistic middleware is preserved in ``legacy/``.

AI Sentinel's active proof of concept is now ``sentinel_kernel.py``.
"""

import warnings

warnings.warn(
    "sentinel_middleware.py moved to legacy/; use sentinel_kernel instead.",
    DeprecationWarning,
    stacklevel=2,
)

__all__ = []
