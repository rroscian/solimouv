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
      <About />
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
  
  <Footer />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  main {
    flex: 1;
  }
</style>
