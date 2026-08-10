import os
from flask import Blueprint, jsonify, request, session
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from werkzeug.security import check_password_hash, generate_password_hash
from extensions import db
from models.user import User

auth_bp = Blueprint('auth', __name__)
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

def user_payload(user):
    return {'id': user.id, 'email': user.email}

@auth_bp.post('/register')
def register():
    data = request.get_json(silent=True) or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    if not email or len(password) < 8:
        return jsonify({'error': 'Use a valid email and a password with at least 8 characters.'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'An account already exists for this email.'}), 409
    user = User(email=email, password_hash=generate_password_hash(password))
    db.session.add(user); db.session.commit()
    session.clear(); session['user_id'] = user.id
    return jsonify({'user': user_payload(user)}), 201

@auth_bp.post('/login')
def login():
    data = request.get_json(silent=True) or {}
    user = User.query.filter_by(email=data.get('email', '').strip().lower()).first()
    if not user or not check_password_hash(user.password_hash, data.get('password', '')):
        return jsonify({'error': 'Email or password is incorrect.'}), 401
    session.clear(); session['user_id'] = user.id
    return jsonify({'user': user_payload(user)})

@auth_bp.post('/logout')
def logout():
    session.clear()
    return '', 204

@auth_bp.get('/me')
def me():
    user_id = session.get('user_id')
    user = db.session.get(User, user_id) if user_id else None
    return jsonify({'user': user_payload(user) if user else None})

@auth_bp.get('/google/config')
def google_config():
    return jsonify({'clientId': GOOGLE_CLIENT_ID, 'enabled': bool(GOOGLE_CLIENT_ID)})

@auth_bp.post('/google')
def google_login():
    credential = (request.get_json(silent=True) or {}).get('credential')
    if not credential:
        return jsonify({'error': 'Google credential is required.'}), 400
    if not GOOGLE_CLIENT_ID:
        return jsonify({'error': 'Google sign-in is not configured.'}), 503
    try:
        identity = id_token.verify_oauth2_token(credential, google_requests.Request(), GOOGLE_CLIENT_ID)
    except ValueError:
        return jsonify({'error': 'Google sign-in could not be verified.'}), 401
    email = identity.get('email', '').lower()
    if not email or not identity.get('email_verified'):
        return jsonify({'error': 'A verified Google email is required.'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email, password_hash=generate_password_hash(os.urandom(32).hex()))
        db.session.add(user); db.session.commit()
    session.clear(); session['user_id'] = user.id
    return jsonify({'user': user_payload(user)})
