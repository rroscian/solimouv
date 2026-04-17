<script>
  import { onMount } from 'svelte';
  import { pwaStore, installPWA, initPWA, canInstall } from '../utils/pwaStore.js';
  
  export let navigate;
  export let currentScreen;
  
  let isInstalling = false;
  
  function handleNavigate(screen) {
    navigate(screen);
  }
  
  // initPWA() est déjà appelé dans PWAInstallBanner
  
  async function handleInstallPWA() {
    if (!canInstall()) return;
    
    isInstalling = true;
    try {
      const result = await installPWA();
      if (result.success) {
        console.log('PWA installée avec succès');
      }
    } catch (error) {
      console.error('Erreur installation PWA:', error);
    } finally {
      isInstalling = false;
    }
  }
</script>

<header class="header">
  <div class="container">
    <button on:click={() => handleNavigate('home')} class="logo-btn">
      <img src="/logo.png" alt="Solimouv'" class="logo" />
    </button>
    
    <div class="header-actions">
      {#if canInstall()}
        <button 
          class="pwa-install-btn"
          on:click={handleInstallPWA}
          disabled={isInstalling}
          title="Installer l'application"
        >
          {#if isInstalling}
            <div class="loading-spinner"></div>
          {:else}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span class="install-text">Installer</span>
          {/if}
        </button>
      {/if}
      
      <div class="profile-icon">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="white" stroke="#E0E0E0" stroke-width="2"/>
        <circle cx="24" cy="24" r="18" fill="#FF5722"/>
        <circle cx="19" cy="20" r="2" fill="white"/>
        <circle cx="29" cy="20" r="2" fill="white"/>
        <path d="M16 28 C18 32, 30 32, 32 28" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</header>

<style>
  .header {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }
  
  .logo-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 48px;
    width: auto;
    object-fit: contain;
  }
  
  .profile-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .profile-icon:hover {
    transform: scale(1.05);
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .pwa-install-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #2E7D32;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .pwa-install-btn:hover:not(:disabled) {
    background: #1B5E20;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
  }
  
  .pwa-install-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
      height: 70px;
    }
    
    .logo {
      height: 40px;
    }
    
    .profile-icon svg {
      width: 40px;
      height: 40px;
    }
    
    .pwa-install-btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
    
    .install-text {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 0.5rem 1rem;
      height: 60px;
    }
    
    .logo {
      height: 36px;
    }
    
    .profile-icon svg {
      width: 36px;
      height: 36px;
    }
    
    .header-actions {
      gap: 0.5rem;
    }
    
    .pwa-install-btn {
      padding: 0.3rem 0.6rem;
      font-size: 0.75rem;
    }
    
    .pwa-install-btn svg {
      width: 20px;
      height: 20px;
    }
  }
</style>
