import { writable } from 'svelte/store';

// Store pour gérer l'état PWA
export const pwaStore = writable({
  isInstallable: false,
  isInstalled: false,
  deferredPrompt: null,
  isStandalone: false,
  supportsPWA: false
});

// Fonction pour détecter si l'app est déjà installée ou en mode standalone
function checkStandaloneMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true || 
         document.referrer.includes('android-app://');
  
  console.log('Check standalone mode:', {
    matchMedia: window.matchMedia('(display-mode: standalone)').matches,
    navigatorStandalone: window.navigator.standalone,
    referrer: document.referrer,
    isStandalone
  });
  
  return isStandalone;
}

// Fonction pour détecter si le navigateur supporte les PWA
function checkPWASupport() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

// Initialisation du store PWA
export function initPWA() {
  if (typeof window === 'undefined') return;

  const isStandalone = checkStandaloneMode();
  const supportsPWA = checkPWASupport();

  pwaStore.update(state => ({
    ...state,
    isStandalone,
    supportsPWA,
    isInstalled: isStandalone
  }));

  // Écouter l'événement beforeinstallprompt
  const handleBeforeInstallPrompt = (e) => {
    console.log('beforeinstallprompt déclenché');
    // Empêcher l'affichage automatique du prompt
    e.preventDefault();
    
    pwaStore.update(state => ({
      ...state,
      isInstallable: true,
      deferredPrompt: e
    }));
  };

  // Écouter l'événement appinstalled
  const handleAppInstalled = () => {
    console.log('PWA installée avec succès');
    pwaStore.update(state => ({
      ...state,
      isInstalled: true,
      isInstallable: false,
      deferredPrompt: null
    }));
  };

  // Ajouter les listeners
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);

  // Debug: vérifier l'état initial
  console.log('PWA Store initialisé:', {
    isStandalone,
    supportsPWA,
    userAgent: navigator.userAgent
  });
}

// Fonction pour installer la PWA
export async function installPWA() {
  let currentState;
  const unsubscribe = pwaStore.subscribe(state => {
    currentState = state;
  });
  unsubscribe();

  if (!currentState.deferredPrompt) {
    return { success: false, error: 'Aucun prompt d\'installation disponible' };
  }

  try {
    // Afficher le prompt d'installation
    currentState.deferredPrompt.prompt();
    
    // Attendre la réponse de l'utilisateur
    const { outcome } = await currentState.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      pwaStore.update(state => ({
        ...state,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null
      }));
      return { success: true };
    } else {
      return { success: false, error: 'Installation refusée par l\'utilisateur' };
    }
  } catch (error) {
    console.error('Erreur lors de l\'installation PWA:', error);
    return { success: false, error: error.message };
  }
}

// Fonction utilitaire pour vérifier si l'installation est possible
export function canInstall() {
  let currentState;
  const unsubscribe = pwaStore.subscribe(state => {
    currentState = state;
  });
  unsubscribe();

  return currentState.isInstallable && 
         !currentState.isInstalled && 
         currentState.supportsPWA;
}
