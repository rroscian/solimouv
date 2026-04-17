<script>
  export let navigate;
  export let currentScreen;
  
  function handleNavigate(screen) {
    navigate(screen);
  }
</script>

<header class="header">
  <div class="container">
    <button on:click={() => handleNavigate('home')} class="logo-btn">
      <img src="/logo.png" alt="Solimouv'" class="logo" />
    </button>
    
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
  }
</style>
