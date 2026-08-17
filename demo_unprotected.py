"""Demonstrate the simulated failure mode without deterministic enforcement."""

from sentinel_kernel import TaintedVariable


def delete_database_record(table: str, record_id: str) -> bool:
    """Unprotected simulated critical operation; it never modifies a database."""
    print(f"[SUCCESS] Record {record_id} deleted from {table}.")
    return True


if __name__ == "__main__":
    malicious_id = TaintedVariable("DROP TABLE users;")
    print("=== UNPROTECTED SECURITY DEMO ===")
    print("Agent attempting to execute malicious command against DB (UNPROTECTED)...")
    delete_database_record("users", malicious_id)
