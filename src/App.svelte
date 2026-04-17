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
  
  <!-- Mobile Bottom Navigation Bar -->
  <div data-state={currentScreen} class="navbar">
    <div class="nav-item" class:active={currentScreen === 'home'} on:click={() => navigate('home')} on:keydown={e => e.key === 'Enter' && navigate('home')} role="button" tabindex="0">
      <div class="home-03">
        <img src="/accueil.svg" alt="Accueil" class="icon" />
      </div>
      <div><span class="accueil_span">Accueil</span></div>
    </div>
    <div class="nav-item_01" class:active={currentScreen === 'program'} on:click={() => navigate('program')} on:keydown={e => e.key === 'Enter' && navigate('program')} role="button" tabindex="0">
      <div class="calendar-heart-01">
        <img src="/programme.svg" alt="Programme" class="icon_01" />
      </div>
      <div><span class="programme_span">Programme</span></div>
    </div>
    <div class="nav-item_02" class:active={currentScreen === 'about'} on:click={() => navigate('about')} on:keydown={e => e.key === 'Enter' && navigate('about')} role="button" tabindex="0">
      <div class="info-circle">
        <img src="/apropos.svg" alt="À propos" class="icon_02" />
      </div>
      <div><span class="propos_span">À propos</span></div>
    </div>
    <div class="nav-item_03" class:active={currentScreen === 'partners'} on:click={() => navigate('partners')} on:keydown={e => e.key === 'Enter' && navigate('partners')} role="button" tabindex="0">
      <div class="heart-hand">
        <img src="/assos.svg" alt="Assos" class="icon_03" />
      </div>
      <div><span class="assos_span">Assos'</span></div>
    </div>
    <div class="nav-item_04" class:active={currentScreen === 'contact'} on:click={() => navigate('contact')} on:keydown={e => e.key === 'Enter' && navigate('contact')} role="button" tabindex="0">
      <div class="image-user">
        <img src="/contact.svg" alt="Contact" class="icon_04" />
      </div>
      <div><span class="contact_span">Contact</span></div>
    </div>
  </div>
  
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

  /* Mobile Bottom Navigation */
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
    padding-bottom: 16px;
    background: #0A111B;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
    z-index: 100;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  }

  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 2px;
    top: 2px;
    filter: brightness(0) invert(1);
  }

  .accueil_span {
    color: white;
    font-size: 12px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
  }

  .icon_01 {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 2px;
    top: 2px;
    filter: brightness(0) saturate(100%) invert(60%) sepia(10%) saturate(342%) hue-rotate(180deg) brightness(95%) contrast(87%);
  }

  .programme_span {
    color: #959DA7;
    font-size: 12px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
  }

  .icon_02 {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 2px;
    top: 2px;
    filter: brightness(0) saturate(100%) invert(60%) sepia(10%) saturate(342%) hue-rotate(180deg) brightness(95%) contrast(87%);
  }

  .propos_span {
    color: #959DA7;
    font-size: 12px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
  }

  .icon_03 {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 2px;
    top: 2px;
    filter: brightness(0) saturate(100%) invert(60%) sepia(10%) saturate(342%) hue-rotate(180deg) brightness(95%) contrast(87%);
  }

  .assos_span {
    color: #959DA7;
    font-size: 12px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
  }

  .icon_04 {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 2px;
    top: 2px;
    filter: brightness(0) saturate(100%) invert(60%) sepia(10%) saturate(342%) hue-rotate(180deg) brightness(95%) contrast(87%);
  }

  .contact_span {
    color: #959DA7;
    font-size: 12px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
  }

  .home-03 {
    width: 24px;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .calendar-heart-01 {
    width: 24px;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .info-circle {
    width: 24px;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .heart-hand {
    width: 24px;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .image-user {
    width: 24px;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .nav-item {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: inline-flex;
    cursor: pointer;
  }

  .nav-item_01 {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: inline-flex;
    cursor: pointer;
  }

  .nav-item_02 {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: inline-flex;
    cursor: pointer;
  }

  .nav-item_03 {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: inline-flex;
    cursor: pointer;
  }

  .nav-item_04 {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: inline-flex;
    cursor: pointer;
  }

  /* Active state styling */
  .nav-item.active .icon {
    filter: brightness(0) invert(1);
  }

  .nav-item.active .accueil_span {
    color: white;
  }

  .nav-item_01.active .icon_01 {
    filter: brightness(0) invert(1);
  }

  .nav-item_01.active .programme_span {
    color: white;
  }

  .nav-item_02.active .icon_02 {
    filter: brightness(0) invert(1);
  }

  .nav-item_02.active .propos_span {
    color: white;
  }

  .nav-item_03.active .icon_03 {
    filter: brightness(0) invert(1);
  }

  .nav-item_03.active .assos_span {
    color: white;
  }

  .nav-item_04.active .icon_04 {
    filter: brightness(0) invert(1);
  }

  .nav-item_04.active .contact_span {
    color: white;
  }

  /* Desktop adaptation - hide mobile nav */
  @media (min-width: 769px) {
    .navbar {
      display: none;
    }

    main {
      padding-bottom: 0;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    main {
      padding: 3rem 4rem;
    }
  }
</style>
