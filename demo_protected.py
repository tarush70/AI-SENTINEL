"""Demonstrate AI Sentinel blocking a tainted critical operation."""

from employee_bot import process_agent_action


if __name__ == "__main__":
    print("=== AI SENTINEL PROTECTED DEMO ===")
    result = process_agent_action("Please delete user 123")
    print("Demo result:", result)
