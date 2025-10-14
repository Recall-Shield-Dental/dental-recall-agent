from flask import Blueprint, request, jsonify


scheduling_bp = Blueprint('scheduling', __name__)

# In-memory store for demo (replace with DB later)
APPOINTMENTS = []

@scheduling_bp.route('/schedule', methods=['POST'])
def schedule_appointment():
    data = request.json
    # Basic validation
    required = ['patient_name', 'date', 'time']
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing required fields'}), 400
    try:
        # Validate date/time
        from datetime import datetime
        dt = datetime.strptime(f"{data['date']} {data['time']}", "%Y-%m-%d %H:%M")
    except Exception:
        return jsonify({'error': 'Invalid date or time format'}), 400
    appt = {
        'id': len(APPOINTMENTS) + 1,
        'patient_name': data['patient_name'],
        'date': data['date'],
        'time': data['time'],
        'notes': data.get('notes', ''),
    }
    APPOINTMENTS.append(appt)
    return jsonify({'status': 'scheduled', 'appointment': appt}), 201

@scheduling_bp.route('/schedule', methods=['GET'])
def list_appointments():
    return jsonify({'appointments': APPOINTMENTS})
