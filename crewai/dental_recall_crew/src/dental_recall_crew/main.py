#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from dental_recall_crew.crew import DentalRecallCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    """
    Run the crew with sample appointment data.
    """
    inputs = {
        'message_content': 'Hi! Reminder: You have an appointment at Smile Dental on 2025-11-20 at 10:00 AM.',
        'patient_id': 'PAT-2025-001',
        'delivery_time': '2025-11-18 10:00:00',
        'appointment_id': 'APT-2025-001',
        'reminder_type': '48h',
        'patient_phone': '+15125550123',
        'appointment_datetime': '2025-11-20 10:00:00',
        'current_datetime': datetime.now().isoformat()
    }

    try:
        result = DentalRecallCrew().crew().kickoff(inputs=inputs)
        print("\n" + "="*50)
        print("DENTAL RECALL CREW EXECUTION COMPLETE")
        print("="*50)
        print(result)
        sys.exit(0)
    except Exception as e:
        print(f"An error occurred while running the crew: {e}", file=sys.stderr)
        sys.exit(1)


def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {
        'message_content': 'Test reminder message',
        'patient_id': 'TEST-001',
        'delivery_time': datetime.now().isoformat(),
        'current_datetime': datetime.now().isoformat()
    }
    try:
        DentalRecallCrew().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)
        sys.exit(0)
    except Exception as e:
        print(f"An error occurred while training the crew: {e}", file=sys.stderr)
        sys.exit(1)

def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        DentalRecallCrew().crew().replay(task_id=sys.argv[1])
        sys.exit(0)
    except Exception as e:
        print(f"An error occurred while replaying the crew: {e}", file=sys.stderr)
        sys.exit(1)

def test():
    """
    Test the crew execution and returns the results.
    """
    inputs = {
        'message_content': 'Test reminder message',
        'patient_id': 'TEST-001',
        'delivery_time': datetime.now().isoformat(),
        'current_datetime': datetime.now().isoformat()
    }
    try:
        DentalRecallCrew().crew().test(n_iterations=int(sys.argv[1]), openai_model_name=sys.argv[2], inputs=inputs)
        sys.exit(0)
    except Exception as e:
        print(f"An error occurred while testing the crew: {e}", file=sys.stderr)
        sys.exit(1)

def run_with_trigger():
    """
    Run the crew with trigger payload from Flask API.
    """
    import json

    if len(sys.argv) < 2:
        raise Exception("No trigger payload provided. Please provide JSON payload as argument.")

    try:
        trigger_payload = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        raise Exception("Invalid JSON payload provided as argument")

    # Extract appointment data from trigger
    inputs = {
        "message_content": trigger_payload.get("message_content", ""),
        "patient_id": trigger_payload.get("patient_id", ""),
        "delivery_time": trigger_payload.get("delivery_time", ""),
        "appointment_id": trigger_payload.get("appointment_id", ""),
        "reminder_type": trigger_payload.get("reminder_type", ""),
        "patient_phone": trigger_payload.get("patient_phone", ""),
        "appointment_datetime": trigger_payload.get("appointment_datetime", ""),
        "current_datetime": datetime.now().isoformat()
    }

    try:
        result = DentalRecallCrew().crew().kickoff(inputs=inputs)
        print(result)
        sys.exit(0)
    except Exception as e:
        print(f"An error occurred while running the crew with trigger: {e}", file=sys.stderr)
        sys.exit(1)
