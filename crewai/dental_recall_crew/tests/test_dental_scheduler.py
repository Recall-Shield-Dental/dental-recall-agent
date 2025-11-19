"""
Tests for Dental Scheduler agent
"""
import pytest
from datetime import datetime
from dental_recall_crew.crew import DentalRecallCrew


class TestDentalScheduler:
    """Test dental appointment scheduling functionality"""

    def test_48h_reminder_template(self):
        """Test 48-hour reminder message generation"""
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment at Smile Dental on 2025-11-20 at 10:00 AM. Reply CONFIRM or visit https://calendly.com/smile-dental/reschedule',
            'patient_id': 'PAT-2025-101',
            'delivery_time': '2025-11-18 10:00:00',
            'appointment_id': 'APT-2025-101',
            'reminder_type': '48h',
            'patient_phone': '+15125550200',
            'appointment_datetime': '2025-11-20 10:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
        # Check that reminder type is preserved
        result_str = str(result)
        assert '48h' in result_str or 'reminder' in result_str.lower()

    def test_24h_reminder_template(self):
        """Test 24-hour reminder message generation"""
        inputs = {
            'message_content': 'Hi! Your appointment at Smile Dental is tomorrow at 10:00 AM. See you soon! https://calendly.com/smile-dental/reschedule',
            'patient_id': 'PAT-2025-102',
            'delivery_time': '2025-11-19 14:00:00',
            'appointment_id': 'APT-2025-102',
            'reminder_type': '24h',
            'patient_phone': '+15125550201',
            'appointment_datetime': '2025-11-20 10:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
        result_str = str(result)
        assert '24h' in result_str or 'tomorrow' in result_str.lower()

    def test_reschedule_link_included(self):
        """Test that reschedule link is included in reminders"""
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment at Smile Dental on 2025-11-20 at 10:00 AM. Visit https://calendly.com/smile-dental/reschedule to reschedule.',
            'patient_id': 'PAT-2025-103',
            'delivery_time': '2025-11-18 10:00:00',
            'appointment_id': 'APT-2025-103',
            'reminder_type': '48h',
            'patient_phone': '+15125550202',
            'appointment_datetime': '2025-11-20 10:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
        # Reschedule link should be preserved
        result_str = str(result)
        assert 'calendly' in result_str.lower() or 'reschedule' in result_str.lower()

    def test_multiple_appointments_same_day(self):
        """Test handling multiple appointments for different patients"""
        inputs_patient1 = {
            'message_content': 'Hi! Reminder: You have an appointment at Smile Dental on 2025-11-20 at 10:00 AM.',
            'patient_id': 'PAT-2025-104',
            'delivery_time': '2025-11-18 10:00:00',
            'appointment_id': 'APT-2025-104',
            'reminder_type': '48h',
            'patient_phone': '+15125550203',
            'appointment_datetime': '2025-11-20 10:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        inputs_patient2 = {
            'message_content': 'Hi! Reminder: You have an appointment at Smile Dental on 2025-11-20 at 11:00 AM.',
            'patient_id': 'PAT-2025-105',
            'delivery_time': '2025-11-18 10:00:00',
            'appointment_id': 'APT-2025-105',
            'reminder_type': '48h',
            'patient_phone': '+15125550204',
            'appointment_datetime': '2025-11-20 11:00:00',
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result1 = crew.kickoff(inputs=inputs_patient1)
        result2 = crew.kickoff(inputs=inputs_patient2)
        
        assert result1 is not None
        assert result2 is not None
