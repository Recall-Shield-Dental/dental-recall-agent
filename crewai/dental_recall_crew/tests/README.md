# Dental Recall Crew Tests

## Overview
This test suite validates the HIPAA-compliant dental appointment reminder system.

## Test Structure

### `test_hipaa_compliance.py`
Tests for the HIPAA Compliance Officer agent:
- ✅ Approved messages with proper consent
- ❌ Blocked messages containing unmasked PHI
- ❌ Blocked messages outside business hours
- ✅ Pre-approved template validation

### `test_dental_scheduler.py`
Tests for the Dental Scheduler agent:
- 48-hour reminder template generation
- 24-hour reminder template generation
- Reschedule link inclusion
- Multiple appointments handling

### `test_reminder_coordinator.py`
Tests for the Reminder Coordinator agent:
- 48h and 24h reminder timing
- Skip past appointments
- Batch reminder coordination
- Status tracking

### `test_integration.py`
End-to-end workflow tests:
- Complete 48h reminder workflow
- Complete 24h reminder workflow
- Blocked message workflow
- Sequential reminders for same patient
- Missing consent handling

## Running Tests

### Run all tests:
```bash
cd /workspaces/dental-recall-agent/crewai/dental_recall_crew
pytest tests/ -v
```

### Run specific test file:
```bash
pytest tests/test_hipaa_compliance.py -v
```

### Run specific test:
```bash
pytest tests/test_hipaa_compliance.py::TestHIPAACompliance::test_approved_message_with_consent -v
```

### Run with coverage:
```bash
pytest tests/ --cov=dental_recall_crew --cov-report=html
```

## Test Fixtures

Located in `conftest.py`:
- `sample_appointment_data` - Standard 48h reminder data
- `sample_24h_reminder_data` - 24h reminder data
- `hipaa_violation_data` - Data that should trigger violations
- `outside_business_hours_data` - After-hours delivery data
- `setup_test_env` - Sets up test environment variables

## Environment Variables

Tests use mock values for:
- `GEMINI_API_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `AIRTABLE_API_KEY`

For integration testing with real APIs, update `.env` file.

## Expected Behavior

### ✅ PASS Scenarios
- Messages with masked PHI and consent
- Delivery within business hours (8am-6pm)
- Pre-approved WhatsApp templates
- Proper 48h/24h timing

### ❌ BLOCK Scenarios
- Unmasked patient names, emails, SSN
- Missing consent timestamp
- Delivery outside business hours
- Unapproved message templates

## CI/CD Integration

Add to your CI pipeline:
```yaml
- name: Run Dental Recall Tests
  run: |
    cd crewai/dental_recall_crew
    pip install pytest pytest-cov
    pytest tests/ --cov=dental_recall_crew --cov-report=xml
```

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage per agent
- **Integration Tests**: 90%+ coverage for workflows
- **HIPAA Compliance**: 100% coverage for validation logic
