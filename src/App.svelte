<script>
  import { onMount } from 'svelte';
  import Home from './screens/Home.svelte';
  import About from './screens/About.svelte';
  import Program from './screens/Program.svelte';
  import Partners from './screens/Partners.svelte';
  import Contact from './screens/Contact.svelte';
  import TeamMatcher from './screens/TeamMatcher.svelte';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import PWAInstallBanner from './components/PWAInstallBanner.svelte';

  // Simple router
  let currentScreen = 'home';
  
  function navigate(screen) {
    currentScreen = screen;
    window.history.pushState({ screen }, '', `#${screen}`);
  }
  
  function handlePopstate() {
    const hash = window.location.hash.slice(1);
    currentScreen = hash || 'home';
  }
  
  onMount(() => {
    window.addEventListener('popstate', handlePopstate);
    handlePopstate(); // Set initial screen
    
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  });
</script>

<svelte:head>
  <title>
    {currentScreen === 'home' ? 'Solimouv\' - Festival du Sport pour Tous' :
     currentScreen === 'about' ? 'À Propos - Solimouv\'' :
     currentScreen === 'program' ? 'Programme - Solimouv\'' :
     currentScreen === 'partners' ? 'Associations Partenaires - Solimouv\'' :
     currentScreen === 'contact' ? 'Contact - Solimouv\'' :
     currentScreen === 'team-matcher' ? 'Trouvez Votre Équipe - Solimouv\'' : 'Solimouv\''}
  </title>
</svelte:head>

<div class="app">
  <Header {navigate} {currentScreen} />
  
  <main>
    {#if currentScreen === 'home'}
      <Home {navigate} />
    {:else if currentScreen === 'about'}
      <About {navigate} />
    {:else if currentScreen === 'program'}
      <Program />
    {:else if currentScreen === 'partners'}
      <Partners />
    {:else if currentScreen === 'contact'}
      <Contact />
    {:else if currentScreen === 'team-matcher'}
      <TeamMatcher />
    {/if}
  </main>
  
  <!-- Bottom Navigation Bar -->
  <nav class="bottom-nav">
    <button 
      class="nav-item"
      class:active={currentScreen === 'home'}
      on:click={() => navigate('home')}
    >
      <div class="nav-icon">🏠</div>
      <span>Accueil</span>
    </button>
    
    <button 
      class="nav-item"
      class:active={currentScreen === 'program'}
      on:click={() => navigate('program')}
    >
      <div class="nav-icon">📅</div>
      <span>Programme</span>
    </button>
    
    <button 
      class="nav-item"
      class:active={currentScreen === 'about'}
      on:click={() => navigate('about')}
    >
      <div class="nav-icon">🕒</div>
      <span>À propos</span>
    </button>
    
    <button 
      class="nav-item"
      class:active={currentScreen === 'partners'}
      on:click={() => navigate('partners')}
    >
      <div class="nav-icon">🤝</div>
      <span>Assos'</span>
    </button>
    
    <button 
      class="nav-item"
      class:active={currentScreen === 'contact'}
      on:click={() => navigate('contact')}
    >
      <div class="nav-icon">👤</div>
      <span>Contact</span>
    </button>
  </nav>
  
  <Footer />
  
  <!-- PWA Install Banner -->
  <PWAInstallBanner />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  main {
    flex: 1;
    padding-bottom: 80px; /* Space for bottom nav on mobile */
  }

  /* Bottom Navigation */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2C3E50;
    display: flex;
    justify-content: space-around;
    padding: 0.5rem 0;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    z-index: 100;
  }

  .nav-item {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    transition: all 0.2s;
    opacity: 0.7;
    font-size: 0.75rem;
  }

  .nav-item.active {
    opacity: 1;
    color: #FFD54F;
  }

  .nav-item:hover {
    opacity: 1;
  }

  .nav-icon {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }

  .nav-item span {
    font-size: 0.7rem;
    font-weight: 500;
  }

  /* Desktop adaptation - show as horizontal bar at top */
  @media (min-width: 769px) {
    .bottom-nav {
      position: relative;
      top: 0;
      bottom: auto;
      background: white;
      border-bottom: 1px solid #e0e0e0;
      padding: 1rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
      box-shadow: none;
    }

    main {
      padding-bottom: 0;
    }

    .nav-item {
      flex-direction: row;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      color: #2C3E50;
      font-size: 1rem;
    }

    .nav-item.active {
      background: #E8F5E8;
      color: #2C3E50;
    }

    .nav-item:hover {
      background: #f0f0f0;
    }

    .nav-icon {
      font-size: 1rem;
      margin-bottom: 0;
    }

    .nav-item span {
      font-size: 1rem;
    }
  }
</style>
