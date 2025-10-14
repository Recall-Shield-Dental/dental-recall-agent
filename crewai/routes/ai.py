from flask import Blueprint, request, jsonify

ai_bp = Blueprint('ai', __name__)

from services.recallshield_ai import suggest_appointment

@ai_bp.route('/ai/schedule', methods=['POST'])
def ai_schedule():
    data = request.json
    patient_name = data.get('patient_name', 'Patient')
    history = data.get('history')
    suggestion = suggest_appointment(patient_name, history)
    return jsonify({'ai_suggestion': suggestion})
