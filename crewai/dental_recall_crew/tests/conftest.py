"""
Pytest configuration and fixtures for dental recall crew tests
"""
import pytest
import os
from datetime import datetime


@pytest.fixture
def sample_appointment_data():
    """Provide sample appointment data for testing"""
    return {
        'message_content': 'Hi! Reminder: You have an appointment at Smile Dental on 2025-11-20 at 10:00 AM.',
        'patient_id': 'PAT-TEST-001',
        'delivery_time': '2025-11-18 10:00:00',
        'appointment_id': 'APT-TEST-001',
        'reminder_type': '48h',
        'patient_phone': '+15125550100',
        'appointment_datetime': '2025-11-20 10:00:00',
        'current_datetime': datetime.now().isoformat()
    }


@pytest.fixture
def sample_24h_reminder_data():
    """Provide sample 24-hour reminder data"""
    return {
        'message_content': 'Hi! Your appointment at Smile Dental is tomorrow at 10:00 AM.',
        'patient_id': 'PAT-TEST-002',
        'delivery_time': '2025-11-19 14:00:00',
        'appointment_id': 'APT-TEST-002',
        'reminder_type': '24h',
        'patient_phone': '+15125550101',
        'appointment_datetime': '2025-11-20 10:00:00',
        'current_datetime': datetime.now().isoformat()
    }


@pytest.fixture
def hipaa_violation_data():
    """Provide data that should trigger HIPAA violations"""
    return {
        'message_content': 'Hi John Doe! Your appointment with Dr. Smith is tomorrow. SSN: 123-45-6789',
        'patient_id': 'PAT-TEST-003',
        'delivery_time': '2025-11-19 10:00:00',
        'appointment_id': 'APT-TEST-003',
        'reminder_type': '24h',
        'patient_phone': '+15125550102',
        'appointment_datetime': '2025-11-20 10:00:00',
        'current_datetime': datetime.now().isoformat()
    }


@pytest.fixture
def outside_business_hours_data():
    """Provide data with delivery time outside business hours"""
    return {
        'message_content': 'Hi! Reminder: You have an appointment tomorrow.',
        'patient_id': 'PAT-TEST-004',
        'delivery_time': '2025-11-18 22:00:00',  # 10 PM
        'appointment_id': 'APT-TEST-004',
        'reminder_type': '24h',
        'patient_phone': '+15125550103',
        'appointment_datetime': '2025-11-19 10:00:00',
        'current_datetime': datetime.now().isoformat()
    }


@pytest.fixture(autouse=True)
def setup_test_env():
    """Set up test environment variables"""
    # Ensure test environment has necessary config
    os.environ.setdefault('GEMINI_API_KEY', 'test_api_key')
    os.environ.setdefault('MODEL', 'gemini/gemini-2.0-flash-001')
    os.environ.setdefault('TWILIO_ACCOUNT_SID', 'test_twilio_sid')
    os.environ.setdefault('TWILIO_AUTH_TOKEN', 'test_twilio_token')
    os.environ.setdefault('AIRTABLE_API_KEY', 'test_airtable_key')
    
    yield
    
    # Cleanup if needed
    pass
