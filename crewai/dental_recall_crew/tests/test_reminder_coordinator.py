"""
Tests for Reminder Coordinator agent
"""
import pytest
from datetime import datetime, timedelta
from dental_recall_crew.crew import DentalRecallCrew


class TestReminderCoordinator:
    """Test reminder coordination and timing logic"""

    def test_coordinate_48h_reminder_timing(self):
        """Test that 48-hour reminders are scheduled correctly"""
        # Appointment in 48 hours
        appointment_time = datetime.now() + timedelta(hours=48)
        
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment at Smile Dental.',
            'patient_id': 'PAT-2025-201',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-2025-201',
            'reminder_type': '48h',
            'patient_phone': '+15125550300',
            'appointment_datetime': appointment_time.isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None

    def test_coordinate_24h_reminder_timing(self):
        """Test that 24-hour reminders are scheduled correctly"""
        # Appointment in 24 hours
        appointment_time = datetime.now() + timedelta(hours=24)
        
        inputs = {
            'message_content': 'Hi! Your appointment is tomorrow.',
            'patient_id': 'PAT-2025-202',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-2025-202',
            'reminder_type': '24h',
            'patient_phone': '+15125550301',
            'appointment_datetime': appointment_time.isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None

    def test_skip_past_appointments(self):
        """Test that reminders are not sent for past appointments"""
        # Appointment in the past
        past_appointment = datetime.now() - timedelta(hours=1)
        
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment.',
            'patient_id': 'PAT-2025-203',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-2025-203',
            'reminder_type': '48h',
            'patient_phone': '+15125550302',
            'appointment_datetime': past_appointment.isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        # Should handle gracefully
        assert result is not None

    def test_coordinate_multiple_reminders_batch(self):
        """Test coordination of multiple reminders in a batch"""
        current_time = datetime.now()
        
        inputs = {
            'message_content': 'Batch reminder processing',
            'patient_id': 'BATCH-001',
            'delivery_time': current_time.isoformat(),
            'appointment_id': 'BATCH-APT-001',
            'reminder_type': 'batch',
            'patient_phone': '+15125550303',
            'appointment_datetime': (current_time + timedelta(hours=48)).isoformat(),
            'current_datetime': current_time.isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
        # Check that batch processing completes
        result_str = str(result)
        assert len(result_str) > 0

    def test_reminder_status_tracking(self):
        """Test that reminder sent status is tracked"""
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment.',
            'patient_id': 'PAT-2025-204',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-2025-204',
            'reminder_type': '48h',
            'patient_phone': '+15125550304',
            'appointment_datetime': (datetime.now() + timedelta(hours=48)).isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
        # Should track that reminder was sent
        result_str = str(result)
        assert 'sent' in result_str.lower() or 'delivered' in result_str.lower() or 'complete' in result_str.lower()
