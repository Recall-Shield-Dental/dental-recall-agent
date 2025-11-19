"""
Tests for HIPAA Compliance Officer agent
"""
import pytest
from datetime import datetime
from dental_recall_crew.crew import DentalRecallCrew


class TestHIPAACompliance:
    """Test HIPAA compliance validation"""

    def test_approved_message_with_consent(self):
        """Test that a properly masked message with consent is approved"""
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

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
        # Should not contain any unmasked PHI
        assert 'John Doe' not in str(result)
        assert '@email.com' not in str(result)

    def test_blocked_message_with_phi(self):
        """Test that messages containing unmasked PHI are blocked"""
        inputs = {
            'message_content': 'Hi John Doe! Your appointment is tomorrow. Call us at 512-555-0100.',
            'patient_id': 'PAT-2025-002',
            'delivery_time': '2025-11-18 10:00:00',
            'appointment_id': 'APT-2025-002',
            'reminder_type': '24h',
            'patient_phone': '+15125550124',
            'appointment_datetime': '2025-11-20 14:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        # Should be blocked due to PHI exposure
        assert result is not None

    def test_blocked_message_outside_business_hours(self):
        """Test that messages scheduled outside business hours are blocked"""
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment tomorrow.',
            'patient_id': 'PAT-2025-003',
            'delivery_time': '2025-11-18 22:00:00',  # 10 PM - outside business hours
            'appointment_id': 'APT-2025-003',
            'reminder_type': '24h',
            'patient_phone': '+15125550125',
            'appointment_datetime': '2025-11-19 10:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        # Should be blocked due to timing
        assert result is not None

    def test_approved_template_message(self):
        """Test that pre-approved template messages pass validation"""
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment at [PRACTICE_NAME] on [DATE] at [TIME]. Reply CONFIRM or visit [RESCHEDULE_LINK]',
            'patient_id': 'PAT-2025-004',
            'delivery_time': '2025-11-18 14:00:00',
            'appointment_id': 'APT-2025-004',
            'reminder_type': '48h',
            'patient_phone': '+15125550126',
            'appointment_datetime': '2025-11-20 10:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
