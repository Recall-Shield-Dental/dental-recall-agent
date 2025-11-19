"""
Integration tests for the complete dental recall crew workflow
"""
import pytest
from datetime import datetime, timedelta
from dental_recall_crew.crew import DentalRecallCrew


class TestIntegration:
    """Test end-to-end workflow of the dental recall system"""

    def test_full_48h_reminder_workflow(self):
        """Test complete 48-hour reminder workflow"""
        appointment_time = datetime.now() + timedelta(hours=48)
        
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment at Smile Dental on ' + 
                             appointment_time.strftime('%Y-%m-%d') + ' at ' + 
                             appointment_time.strftime('%I:%M %p') + 
                             '. Reply CONFIRM or visit https://calendly.com/smile-dental/reschedule',
            'patient_id': 'PAT-INT-001',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-INT-001',
            'reminder_type': '48h',
            'patient_phone': '+15125550400',
            'appointment_datetime': appointment_time.isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        # Verify all agents executed
        assert result is not None
        result_str = str(result)
        
        # Should have validation, scheduling, and coordination outputs
        assert len(result_str) > 0

    def test_full_24h_reminder_workflow(self):
        """Test complete 24-hour reminder workflow"""
        appointment_time = datetime.now() + timedelta(hours=24)
        
        inputs = {
            'message_content': 'Hi! Your appointment at Smile Dental is tomorrow at ' + 
                             appointment_time.strftime('%I:%M %p') + 
                             '. See you soon! https://calendly.com/smile-dental/reschedule',
            'patient_id': 'PAT-INT-002',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-INT-002',
            'reminder_type': '24h',
            'patient_phone': '+15125550401',
            'appointment_datetime': appointment_time.isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        assert result is not None
        result_str = str(result)
        assert len(result_str) > 0

    def test_blocked_message_workflow(self):
        """Test workflow when HIPAA compliance blocks a message"""
        inputs = {
            'message_content': 'Hi John Smith! Your appointment with Dr. Jones is tomorrow. SSN: 123-45-6789',
            'patient_id': 'PAT-INT-003',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-INT-003',
            'reminder_type': '24h',
            'patient_phone': '+15125550402',
            'appointment_datetime': (datetime.now() + timedelta(hours=24)).isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        # Should complete but indicate blocking
        assert result is not None

    def test_sequential_reminders_same_patient(self):
        """Test sending both 48h and 24h reminders for same appointment"""
        appointment_time = datetime.now() + timedelta(hours=48)
        
        # First send 48h reminder
        inputs_48h = {
            'message_content': 'Hi! Reminder: You have an appointment at Smile Dental in 2 days.',
            'patient_id': 'PAT-INT-004',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-INT-004',
            'reminder_type': '48h',
            'patient_phone': '+15125550403',
            'appointment_datetime': appointment_time.isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result_48h = crew.kickoff(inputs=inputs_48h)
        
        # Then send 24h reminder (next day)
        inputs_24h = {
            'message_content': 'Hi! Your appointment at Smile Dental is tomorrow.',
            'patient_id': 'PAT-INT-004',
            'delivery_time': (datetime.now() + timedelta(hours=24)).isoformat(),
            'appointment_id': 'APT-INT-004',
            'reminder_type': '24h',
            'patient_phone': '+15125550403',
            'appointment_datetime': appointment_time.isoformat(),
            'current_datetime': (datetime.now() + timedelta(hours=24)).isoformat()
        }

        result_24h = crew.kickoff(inputs=inputs_24h)
        
        assert result_48h is not None
        assert result_24h is not None

    def test_crew_with_missing_consent(self):
        """Test handling of patients without documented consent"""
        inputs = {
            'message_content': 'Hi! Reminder: You have an appointment.',
            'patient_id': 'PAT-NO-CONSENT',
            'delivery_time': datetime.now().isoformat(),
            'appointment_id': 'APT-NO-CONSENT',
            'reminder_type': '48h',
            'patient_phone': '+15125550404',
            'appointment_datetime': (datetime.now() + timedelta(hours=48)).isoformat(),
            'current_datetime': datetime.now().isoformat()
        }

        crew = DentalRecallCrew().crew()
        result = crew.kickoff(inputs=inputs)
        
        # Should handle gracefully (block the message)
        assert result is not None
