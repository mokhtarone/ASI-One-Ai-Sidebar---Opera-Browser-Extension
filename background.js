// Service Worker pour gérer l'extension

// Activer les règles de modification des headers au démarrage
chrome.runtime.onInstalled.addListener(async () => {
  console.log('ASI:One Extension installée - Bypass X-Frame-Options activé');
  
  // Sauvegarder les informations d'installation
  await chrome.storage.local.set({
    installedAt: new Date().toISOString(),
    version: chrome.runtime.getManifest().version,
    bypassEnabled: true
  });
  
  // Vérifier que les règles sont bien activées
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  console.log('Règles actives:', rules);
});

// Gérer les clics sur l'icône
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension cliquée');
});

// Écouter les messages de la sidebar
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkBypass') {
    chrome.storage.local.get(['bypassEnabled'], (result) => {
      sendResponse({ enabled: result.bypassEnabled || true });
    });
    return true;
  }
  
  if (request.action === 'openTab') {
    chrome.tabs.create({ url: request.url });
    sendResponse({ success: true });
    return true;
  }
  
  if (request.action === 'reloadFrame') {
    sendResponse({ success: true });
    return true;
  }
});

// Logger les erreurs
chrome.runtime.onStartup.addListener(() => {
  console.log('ASI:One Extension démarrée');
});

// Gestion des erreurs
self.addEventListener('error', (event) => {
  console.error('Erreur dans le service worker:', event.error);
});
