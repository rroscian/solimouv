import App from './App.svelte'
import { initPWA } from './utils/pwaStore.js'

const app = new App({
  target: document.getElementById('app'),
})

// Enregistrement manuel du Service Worker
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('✅ Service Worker enregistré:', registration);
      
      // Vérifier les mises à jour
      registration.addEventListener('updatefound', () => {
        console.log('� Mise à jour SW détectée');
      });
      
    } catch (error) {
      console.warn('❌ Échec enregistrement SW:', error);
    }
  } else {
    console.warn('⚠️ Service Worker non supporté');
  }
}

// Initialiser PWA et SW après le chargement
window.addEventListener('load', async () => {
  await registerSW();
  initPWA();
  console.log('🚀 PWA initialisée');
});

export default app
