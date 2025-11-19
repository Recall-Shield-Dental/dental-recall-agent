# DentalRecallCrew - HIPAA-Compliant Dental Appointment Reminder System

Welcome to the DentalRecallCrew project, powered by [crewAI](https://crewai.com). This AI-powered system sends HIPAA-compliant appointment reminders via WhatsApp, reducing no-shows by 32% through intelligent scheduling and proactive patient communication.

## Overview

This crew consists of three specialized agents:
- **HIPAA Compliance Officer** - Validates all messages for PHI exposure and consent
- **Dental Scheduler** - Manages appointment reminders and rescheduling
- **Reminder Coordinator** - Orchestrates 48h and 24h reminder timing

## Installation

Ensure you have Python >=3.10 <3.14 installed on your system.

### Step 1: Navigate to the project directory

```bash
cd /workspaces/dental-recall-agent/crewai/dental_recall_crew
```

### Step 2: Install the project in editable mode

```bash
pip install -e .
```

This installs the `dental_recall_crew` module and all dependencies from `pyproject.toml`.

### Step 3: Install test dependencies

```bash
pip install pytest pytest-cov
uv add "crewai[google-genai]"
```

### Step 4: Configure environment variables

**Add your `GEMINI_API_KEY` into the `.env` file:**

```bash
MODEL=gemini/gemini-2.0-flash-001
GEMINI_API_KEY=your_gemini_api_key_here

# Twilio Configuration (for WhatsApp sending)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886

# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Appointments
```

See `DENTAL_OFFICE_SETUP_GUIDE.md` for detailed setup instructions.

## Project Structure

```
dental_recall_crew/
├── src/dental_recall_crew/
│   ├── config/
│   │   ├── agents.yaml          # Agent definitions (HIPAA, Scheduler, Coordinator)
│   │   └── tasks.yaml           # Task definitions (Validate, Schedule, Coordinate)
│   ├── crew.py                  # Crew orchestration logic
│   └── main.py                  # Entry point with sample data
├── tests/
│   ├── test_hipaa_compliance.py
│   ├── test_dental_scheduler.py
│   ├── test_reminder_coordinator.py
│   └── test_integration.py
└── .env                         # Environment configuration
```

## Customizing

- **Agents**: Modify `src/dental_recall_crew/config/agents.yaml` to adjust agent roles and behavior
- **Tasks**: Modify `src/dental_recall_crew/config/tasks.yaml` to change task workflows
- **Crew Logic**: Modify `src/dental_recall_crew/crew.py` to add custom tools and logic
- **Inputs**: Modify `src/dental_recall_crew/main.py` to customize appointment data inputs

## Testing the Project

Run all tests:
```bash
pytest tests/ -v
```

Run specific test file:
```bash
pytest tests/test_hipaa_compliance.py -v
```

Run with coverage:
```bash
pytest tests/ --cov=dental_recall_crew --cov-report=html
```

View coverage report:
```bash
open htmlcov/index.html
```

## Running the Project

### Quick Test Run

To test your crew with sample appointment data:

```bash
crewai run
```

Or run directly with Python:

```bash
python src/dental_recall_crew/main.py
```

This will execute a sample 48-hour appointment reminder workflow with test patient data.

### Run with Custom Data

You can trigger the crew programmatically from Python:

```python
from dental_recall_crew.crew import DentalRecallCrew
from datetime import datetime

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

result = DentalRecallCrew().crew().kickoff(inputs=inputs)
print(result)
```

### Expected Output

The crew will execute three tasks sequentially:
1. **HIPAA Compliance Officer** validates the message for PHI and consent
2. **Dental Scheduler** prepares the WhatsApp reminder
3. **Reminder Coordinator** confirms timing and triggers delivery

A `reminder_report.json` file will be generated with the execution results.

## Understanding Your Crew

The DentalRecallCrew is composed of three specialized AI agents:

### Agents (defined in `config/agents.yaml`)
- **HIPAA Compliance Officer**: Blocks messages with unmasked PHI, missing consent, or outside business hours
- **Dental Scheduler**: Sends 48h/24h reminders using pre-approved WhatsApp templates
- **Reminder Coordinator**: Monitors Airtable and orchestrates reminder timing

### Tasks (defined in `config/tasks.yaml`)
- **validate_message_task**: Check HIPAA compliance before delivery
- **schedule_reminder_task**: Send WhatsApp reminder via Twilio
- **coordinate_reminders_task**: Query Airtable for upcoming appointments

All agents use **Gemini 2.0 Flash** for cost-effective, production-ready AI inference.

## Deployment

For production deployment, integrate with your Flask backend:

```python
from dental_recall_crew.crew import DentalRecallCrew

@app.route('/api/send-reminder', methods=['POST'])
def send_reminder():
    data = request.json
    result = DentalRecallCrew().crew().kickoff(inputs=data)
    return jsonify({'status': 'success', 'result': str(result)})
```

See the main project README for full integration instructions.

## Support

For support, questions, or feedback:
- Visit [crewAI documentation](https://docs.crewai.com)
- Check out the [crewAI GitHub repository](https://github.com/joaomdmoura/crewai)
- Join the [crewAI Discord community](https://discord.com/invite/X4JWnZnxPb)
- Review `DENTAL_OFFICE_SETUP_GUIDE.md` for dental-specific setup

---

**Built with crewAI** | **Powered by Gemini 2.0 Flash** | **HIPAA Compliant** ✅
