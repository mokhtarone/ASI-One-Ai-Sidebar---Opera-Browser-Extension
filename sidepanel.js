// Elements
const iframe = document.getElementById('content-frame');
const loader = document.getElementById('loader');
const errorOverlay = document.getElementById('error-overlay');
const debugControls = document.getElementById('debug-controls');

let loadTimeout;
let loadAttempts = 0;
const MAX_ATTEMPTS = 2;

// Vérifier si le bypass est activé
chrome.runtime.sendMessage({ action: 'checkBypass' }, (response) => {
    console.log('Bypass status:', response);
});

// Masquer le loader quand l'iframe est chargée
iframe.addEventListener('load', () => {
    console.log('✅ Iframe chargée avec succès');
    clearTimeout(loadTimeout);
    
    // Attendre un peu pour s'assurer que le contenu est bien chargé
    setTimeout(() => {
        try {
            // Tester l'accès au contenu de l'iframe
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML.length > 100) {
                // Contenu chargé avec succès
                loader.classList.add('hidden');
                console.log('✅ Contenu vérifié et accessible');
            } else {
                // Contenu vide ou bloqué
                console.warn('⚠️ Contenu iframe vide ou bloqué');
                handleLoadError();
            }
        } catch (e) {
            // Accès bloqué par CORS/X-Frame-Options
            console.log('ℹ️ Impossible de vérifier le contenu (CORS) - On suppose que ça marche');
            loader.classList.add('hidden');
        }
    }, 1500);
});

// Gérer les erreurs de chargement
iframe.addEventListener('error', (e) => {
    console.error('❌ Erreur de chargement iframe:', e);
    handleLoadError();
});

// Timeout de sécurité
loadTimeout = setTimeout(() => {
    console.log('⏱️ Timeout de chargement');
    
    // Si le loader est toujours visible après 10 secondes
    if (!loader.classList.contains('hidden')) {
        // On masque le loader et on laisse l'iframe visible
        // Il se peut qu'elle ait chargé malgré tout
        loader.classList.add('hidden');
        console.log('ℹ️ Loader masqué après timeout - iframe visible');
    }
}, 10000);

// Gestion des erreurs
function handleLoadError() {
    clearTimeout(loadTimeout);
    loadAttempts++;
    
    if (loadAttempts < MAX_ATTEMPTS) {
        console.log(`🔄 Tentative ${loadAttempts + 1}/${MAX_ATTEMPTS}`);
        setTimeout(() => {
            iframe.src = iframe.src; // Recharger
        }, 1000);
    } else {
        loader.classList.add('hidden');
        errorOverlay.style.display = 'flex';
        console.log('❌ Échec après plusieurs tentatives');
    }
}

// Fonction pour ouvrir dans un nouvel onglet
function openInNewTab() {
    chrome.runtime.sendMessage({ 
        action: 'openTab', 
        url: 'https://asi1.ai' 
    });
}

// Fonction pour réessayer le chargement
function retryLoading() {
    errorOverlay.style.display = 'none';
    loader.classList.remove('hidden');
    loadAttempts = 0;
    
    // Recharger l'iframe
    iframe.src = 'about:blank';
    setTimeout(() => {
        iframe.src = 'https://asi1.ai';
    }, 100);
    
    // Nouveau timeout
    loadTimeout = setTimeout(() => {
        loader.classList.add('hidden');
    }, 10000);
}

// Fonction pour recharger l'iframe
function reloadIframe() {
    console.log('🔄 Rechargement manuel de l\'iframe');
    loader.classList.remove('hidden');
    errorOverlay.style.display = 'none';
    iframe.src = iframe.src;
    
    loadTimeout = setTimeout(() => {
        loader.classList.add('hidden');
    }, 10000);
}

// Toggle debug controls
function toggleDebug() {
    const isVisible = debugControls.style.display === 'block';
    debugControls.style.display = isVisible ? 'none' : 'block';
}

// Raccourcis clavier
document.addEventListener('keydown', (e) => {
    // Shift + D pour le debug
    if (e.shiftKey && e.key === 'D') {
        toggleDebug();
    }
    
    // Shift + R pour recharger
    if (e.shiftKey && e.key === 'R') {
        reloadIframe();
    }
    
    // Shift + O pour ouvrir dans un nouvel onglet
    if (e.shiftKey && e.key === 'O') {
        openInNewTab();
    }
});

// Sauvegarder l'état
window.addEventListener('beforeunload', () => {
    chrome.storage.local.set({ 
        lastVisit: new Date().toISOString(),
        loadAttempts: loadAttempts
    });
});

// Logger au démarrage
console.log('🚀 ASI:One Sidebar initialisée');
console.log('🛡️ Bypass X-Frame-Options: ACTIF');
console.log('⌨️ Raccourcis: Shift+D (debug), Shift+R (reload), Shift+O (new tab)');
