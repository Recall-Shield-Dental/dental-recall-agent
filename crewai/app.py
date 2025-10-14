from flask import Flask
from dotenv import load_dotenv
import os


from routes.scheduling import scheduling_bp
from routes.audit import audit_bp
from routes.ai import ai_bp

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')


app.register_blueprint(scheduling_bp)
app.register_blueprint(audit_bp)
app.register_blueprint(ai_bp)

@app.route('/')
def index():
    return 'CrewAI Backend is running!'

if __name__ == '__main__':
    app.run()
