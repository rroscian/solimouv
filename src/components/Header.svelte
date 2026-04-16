<script>
  export let navigate;
  export let currentScreen;
  
  let mobileMenuOpen = false;
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function handleNavigate(screen) {
    navigate(screen);
    mobileMenuOpen = false;
  }
</script>

<header class="header">
  <div class="container">
    <div class="logo">
      <button on:click={() => handleNavigate('home')} class="logo-btn">
        <h1>Solimouv'</h1>
        <span class="tagline">Festival du Sport pour Tous</span>
      </button>
    </div>
    
    <nav class="nav-desktop">
      <button 
        class:active={currentScreen === 'home'}
        on:click={() => handleNavigate('home')}
      >
        Accueil
      </button>
      <button 
        class:active={currentScreen === 'about'}
        on:click={() => handleNavigate('about')}
      >
        À Propos
      </button>
      <button 
        class:active={currentScreen === 'program'}
        on:click={() => handleNavigate('program')}
      >
        Programme
      </button>
      <button 
        class:active={currentScreen === 'team-matcher'}
        on:click={() => handleNavigate('team-matcher')}
      >
        Trouvez votre équipe
      </button>
      <button 
        class:active={currentScreen === 'partners'}
        on:click={() => handleNavigate('partners')}
      >
        Partenaires
      </button>
      <button 
        class:active={currentScreen === 'contact'}
        on:click={() => handleNavigate('contact')}
      >
        Contact
      </button>
    </nav>
    
    <button class="mobile-menu-btn" on:click={toggleMobileMenu}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  
  {#if mobileMenuOpen}
    <nav class="nav-mobile">
      <button on:click={() => handleNavigate('home')}>Accueil</button>
      <button on:click={() => handleNavigate('about')}>À Propos</button>
      <button on:click={() => handleNavigate('program')}>Programme</button>
      <button on:click={() => handleNavigate('team-matcher')}>Trouvez votre équipe</button>
      <button on:click={() => handleNavigate('partners')}>Partenaires</button>
      <button on:click={() => handleNavigate('contact')}>Contact</button>
    </nav>
  {/if}
</header>

<style>
  .header {
    background: #2E7D32;
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }
  
  .logo-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    text-align: left;
  }
  
  .logo h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
  }
  
  .tagline {
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .nav-desktop {
    display: flex;
    gap: 2rem;
  }
  
  .nav-desktop button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;
    font-size: 1rem;
  }
  
  .nav-desktop button:hover,
  .nav-desktop button.active {
    background: rgba(255,255,255,0.1);
  }
  
  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .mobile-menu-btn span {
    width: 25px;
    height: 2px;
    background: white;
    transition: all 0.2s;
  }
  
  .nav-mobile {
    background: #1B5E20;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-mobile button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 1rem;
    text-align: left;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .nav-mobile button:hover {
    background: rgba(255,255,255,0.1);
  }
  
  @media (max-width: 768px) {
    .nav-desktop {
      display: none;
    }
    
    .mobile-menu-btn {
      display: flex;
    }
  }
</style>
