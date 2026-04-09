document.getElementById('loginBtn').addEventListener('click', function() {
    // ID de l'application Facebook pour Android (Officiel)
    const clientId = "350685531728";
    const redirectUri = "https://www.facebook.com/connect/login_success.html";
    
    // URL d'autorisation
    const authUrl = `https://www.facebook.com/v1.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=user_posts,publish_actions,public_profile`;

    // On ouvre la fenêtre de connexion
    window.location.href = authUrl;
});
