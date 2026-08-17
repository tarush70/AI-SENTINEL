"""ARCHIVED: the network-sentry simulation is preserved in ``legacy/``.

AI Sentinel's active proof of concept is now ``sentinel_kernel.py``.
"""

import warnings

warnings.warn(
    "network_sentry.py moved to legacy/; use sentinel_kernel instead.",
    DeprecationWarning,
    stacklevel=2,
)

__all__ = []
