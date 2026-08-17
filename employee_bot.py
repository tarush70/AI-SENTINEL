"""A safe, simulated enterprise agent protected by the AI Sentinel kernel."""

from sentinel_kernel import TaintedVariable, critical_sink


@critical_sink
def delete_database_record(table: str, record_id: str) -> bool:
    """Simulate a critical operation; this demo never connects to a database."""
    print(f"[SUCCESS] Record {record_id} deleted from {table}.")
    return True


def process_agent_action(user_prompt: str) -> bool | dict[str, str]:
    """Simulate an agent extracting an unsafe database action from a prompt."""
    print(f"Agent processing prompt: {user_prompt}")

    # The extracted command is tainted because it originated from untrusted input.
    malicious_id = TaintedVariable("DROP TABLE users;")

    print("Agent attempting to execute command...")
    return delete_database_record("users", malicious_id)
