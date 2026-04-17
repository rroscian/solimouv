<script>
  import { onMount } from 'svelte';
  import { pwaStore, installPWA, initPWA } from '../utils/pwaStore.js';
  
  let showBanner = false;
  let isInstalling = false;
  let showSuccess = false;
  
  $: {
    // Afficher le banner seulement si l'installation est possible
    showBanner = $pwaStore.isInstallable && 
                 !$pwaStore.isInstalled && 
                 $pwaStore.supportsPWA;
  }
  
  onMount(() => {
    // Initialiser le store PWA
    initPWA();
  });
  
  async function handleInstall() {
    isInstalling = true;
    
    try {
      const result = await installPWA();
      
      if (result.success) {
        showSuccess = true;
        setTimeout(() => {
          showSuccess = false;
          showBanner = false;
        }, 3000);
      } else {
        console.warn('Installation PWA échouée:', result.error);
      }
    } catch (error) {
      console.error('Erreur installation PWA:', error);
    } finally {
      isInstalling = false;
    }
  }
  
  function dismissBanner() {
    showBanner = false;
    // Stocker la préférence de l'utilisateur
    localStorage.setItem('pwa-banner-dismissed', 'true');
  }
  
  // Vérifier si le banner a été fermé précédemment
  onMount(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed === 'true') {
      showBanner = false;
    }
  });
</script>

{#if showBanner && !showSuccess}
  <div class="pwa-banner" class:installing={isInstalling}>
    <div class="banner-content">
      <div class="banner-icon">📱</div>
      <div class="banner-text">
        <h3>Installez Solimouv'</h3>
        <p>Accédez à l'app directement depuis votre écran d'accueil</p>
      </div>
      <div class="banner-actions">
        <button 
          class="install-btn" 
          on:click={handleInstall}
          disabled={isInstalling}
        >
          {#if isInstalling}
            <span class="loading-spinner"></span>
            Installation...
          {:else}
            Installer
          {/if}
        </button>
        <button class="dismiss-btn" on:click={dismissBanner}>✕</button>
      </div>
    </div>
  </div>
{/if}

{#if showSuccess}
  <div class="success-banner">
    <div class="success-content">
      <div class="success-icon">✅</div>
      <div class="success-text">
        <h3>Installation réussie!</h3>
        <p>Solimouv' a été ajouté à votre écran d'accueil</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .pwa-banner {
    position: fixed;
    bottom: 90px; /* Au-dessus de la navigation bottom */
    left: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #2E7D32, #4CAF50);
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 1000;
    transform: translateY(0);
    transition: all 0.3s ease;
    animation: slideUp 0.5s ease-out;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .pwa-banner.installing {
    pointer-events: none;
    opacity: 0.8;
  }
  
  .banner-content {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  }
  
  .banner-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }
  
  .banner-text {
    flex: 1;
    min-width: 0;
  }
  
  .banner-text h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .banner-text p {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    opacity: 0.9;
  }
  
  .banner-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  
  .install-btn {
    background: rgba(255,255,255,0.2);
    color: white;
    border: 1px solid rgba(255,255,255,0.3);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }
  
  .install-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }
  
  .install-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .dismiss-btn {
    background: none;
    color: rgba(255,255,255,0.7);
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  
  .dismiss-btn:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }
  
  .loading-spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .success-banner {
    position: fixed;
    bottom: 90px;
    left: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #2E7D32, #4CAF50);
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideUp 0.5s ease-out, fadeOut 0.5s ease-out 2.5s;
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  
  .success-content {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  }
  
  .success-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }
  
  .success-text h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .success-text p {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    opacity: 0.9;
  }
  
  /* Adaptation desktop */
  @media (min-width: 769px) {
    .pwa-banner,
    .success-banner {
      bottom: 2rem;
      left: auto;
      right: 2rem;
      max-width: 400px;
    }
  }
  
  /* Adaptation mobile */
  @media (max-width: 480px) {
    .banner-content,
    .success-content {
      padding: 0.75rem;
    }
    
    .banner-text h3,
    .success-text h3 {
      font-size: 0.9rem;
    }
    
    .banner-text p,
    .success-text p {
      font-size: 0.8rem;
    }
    
    .install-btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
  }
</style>
