<script>
  import { onMount } from 'svelte';
  import { pwaStore, installPWA, initPWA, canInstall } from '../utils/pwaStore.js';
  import { isAuthenticated, currentUser, authService } from '../utils/authStore.js';
  import AuthModal from './AuthModal.svelte';
  
  export let navigate;
  export let currentScreen;
  
  let isInstalling = false;
  let showAuthModal = false;
  let authMode = 'login';
  let showProfileMenu = false;
  
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

  function openAuthModal(mode = 'login') {
    authMode = mode;
    showAuthModal = true;
    showProfileMenu = false;
  }

  function closeAuthModal() {
    showAuthModal = false;
  }

  function toggleProfileMenu() {
    showProfileMenu = !showProfileMenu;
  }

  async function handleLogout() {
    await authService.logout();
    showProfileMenu = false;
  }

  function handleAuthSuccess(event) {
    console.log('Authentification réussie:', event.detail);
    showAuthModal = false;
  }

  // Fermer le menu profil en cliquant ailleurs
  function handleClickOutside(event) {
    if (!event.target.closest('.profile-container')) {
      showProfileMenu = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<header class="header">
  <div class="container">
    <button on:click={() => handleNavigate('home')} class="logo-btn">
      <img src="/logo.png" alt="Solimouv'" class="logo" />
    </button>
    
    <!-- Navigation Desktop -->
    <nav class="desktop-nav">
      <button 
        class="nav-item"
        class:active={currentScreen === 'home'}
        on:click={() => handleNavigate('home')}
      >
        <span>Accueil</span>
      </button>
      
      <button 
        class="nav-item"
        class:active={currentScreen === 'program'}
        on:click={() => handleNavigate('program')}
      >
        <span>Programme</span>
      </button>
      
      <button 
        class="nav-item"
        class:active={currentScreen === 'about'}
        on:click={() => handleNavigate('about')}
      >
        <span>À propos</span>
      </button>
      
      <button 
        class="nav-item"
        class:active={currentScreen === 'partners'}
        on:click={() => handleNavigate('partners')}
      >
        <span>Assos'</span>
      </button>
      
      <button 
        class="nav-item"
        class:active={currentScreen === 'contact'}
        on:click={() => handleNavigate('contact')}
      >
        <span>Contact</span>
      </button>
    </nav>
    
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
      
      {#if $isAuthenticated}
        <div class="profile-container">
          <button class="profile-btn" on:click={toggleProfileMenu}>
            {#if $currentUser?.avatar}
              <img src={$currentUser.avatar} alt="Avatar" class="profile-avatar" />
            {:else}
              <div class="profile-initials">
                {$currentUser?.firstName?.charAt(0) || ''}{$currentUser?.lastName?.charAt(0) || $currentUser?.username?.charAt(0) || '?'}
              </div>
            {/if}
            <svg class="profile-chevron" class:rotate={showProfileMenu} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 6l4 4 4-4"/>
            </svg>
          </button>
          
          {#if showProfileMenu}
            <div class="profile-menu">
              <div class="profile-info">
                <div class="profile-name">
                  {#if $currentUser?.firstName && $currentUser?.lastName}
                    {$currentUser.firstName} {$currentUser.lastName}
                  {:else}
                    @{$currentUser?.username}
                  {/if}
                </div>
                <div class="profile-email">{$currentUser?.email}</div>
              </div>
              
              <div class="menu-divider"></div>
              
              <button class="menu-item" on:click={() => navigate('profile')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Mon profil
              </button>
              
              <button class="menu-item" on:click={() => navigate('settings')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
                Paramètres
              </button>
              
              <div class="menu-divider"></div>
              
              <button class="menu-item logout" on:click={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg>
                Déconnexion
              </button>
            </div>
          {/if}
        </div>
      {:else}
        <div class="auth-buttons">
          <button class="auth-btn login-btn" on:click={() => openAuthModal('login')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            Connexion
          </button>
          <button class="auth-btn signup-btn" on:click={() => openAuthModal('register')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            Inscription
          </button>
        </div>
      {/if}
    </div>
  </div>
</header>

<AuthModal 
  bind:isOpen={showAuthModal}
  bind:mode={authMode}
  on:close={closeAuthModal}
  on:success={handleAuthSuccess}
/>

<style>
  .header {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }

  /* Navigation Styles */
  .desktop-nav {
    display: none;
  }

  .nav-item {
    background: none;
    border: none;
    color: #2C3E50;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 500;
    border: 2px solid transparent;
  }

  .nav-item.active {
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    color: white;
    border: 2px solid #2E7D32;
    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
    transform: translateY(-2px);
  }

  .nav-item:hover:not(.active) {
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .nav-item span {
    font-size: 1rem;
    font-weight: 600;
  }

  /* Desktop enhancements */
  @media (min-width: 769px) {
    .header {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
      border-bottom: 1px solid rgba(224, 224, 224, 0.5);
      position: sticky;
      top: 0;
      z-index: 200;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .container {
      height: 90px;
      padding: 1.5rem 2rem;
      justify-content: space-between;
    }

    .desktop-nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .logo {
      height: 54px;
      transition: transform 0.2s ease;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .header-actions {
      gap: 2rem;
    }

    .pwa-install-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 25px;
      background: linear-gradient(135deg, #2E7D32, #1B5E20);
      box-shadow: 0 2px 8px rgba(46, 125, 50, 0.25);
    }

    .pwa-install-btn:hover:not(:disabled) {
      box-shadow: 0 4px 16px rgba(46, 125, 50, 0.4);
      transform: translateY(-2px);
    }

  }

  @media (min-width: 1200px) {
    .container {
      height: 100px;
      padding: 2rem 4rem;
    }

    .desktop-nav {
      gap: 1.5rem;
    }

    .nav-item {
      padding: 1.2rem 2.5rem;
      font-size: 1.1rem;
    }

    .logo {
      height: 60px;
    }

    .header-actions {
      gap: 2.5rem;
    }

    .pwa-install-btn {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }

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

  /* Styles d'authentification */
  .auth-buttons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .auth-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: 2px solid;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
  }

  .login-btn {
    color: #2E7D32;
    border-color: #2E7D32;
    background: transparent;
  }

  .login-btn:hover {
    background: #2E7D32;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
  }

  .signup-btn {
    color: white;
    border-color: #2E7D32;
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    box-shadow: 0 2px 8px rgba(46, 125, 50, 0.25);
  }

  .signup-btn:hover {
    background: linear-gradient(135deg, #1B5E20, #0D4F14);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(46, 125, 50, 0.4);
  }

  /* Profile container */
  .profile-container {
    position: relative;
  }

  .profile-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: 2px solid #e0e0e0;
    padding: 0.5rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .profile-btn:hover {
    border-color: #2E7D32;
    background: #f8f9fa;
  }

  .profile-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-initials {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .profile-chevron {
    color: #666;
    transition: transform 0.2s ease;
  }

  .profile-chevron.rotate {
    transform: rotate(180deg);
  }

  .profile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(224, 224, 224, 0.5);
    min-width: 220px;
    z-index: 1000;
    overflow: hidden;
  }

  .profile-info {
    padding: 1rem;
    background: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
  }

  .profile-name {
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
  }

  .profile-email {
    color: #666;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }

  .menu-divider {
    height: 1px;
    background: #e0e0e0;
    margin: 0.5rem 0;
  }

  .menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    color: #333;
    text-align: left;
  }

  .menu-item:hover {
    background: #f8f9fa;
  }

  .menu-item.logout {
    color: #dc3545;
  }

  .menu-item.logout:hover {
    background: #fff5f5;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
      height: 70px;
    }
    
    .logo {
      height: 40px;
    }
    
    .pwa-install-btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
    
    .install-text {
      display: none;
    }

    .auth-buttons {
      gap: 0.5rem;
    }

    .auth-btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }

    .auth-btn svg {
      width: 14px;
      height: 14px;
    }

    .profile-avatar, .profile-initials {
      width: 28px;
      height: 28px;
    }

    .profile-initials {
      font-size: 0.8rem;
    }

    .profile-menu {
      right: -1rem;
      min-width: 200px;
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

    .auth-buttons {
      gap: 0.3rem;
    }

    .auth-btn {
      font-size: 0.75rem;
      padding: 0.3rem 0.6rem;
    }

    .profile-avatar, .profile-initials {
      width: 24px;
      height: 24px;
    }

    .profile-initials {
      font-size: 0.7rem;
    }

    .profile-menu {
      right: -1.5rem;
      min-width: 180px;
    }
  }
</style>
