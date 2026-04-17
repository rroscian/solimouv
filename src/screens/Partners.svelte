<script>
  // Associations partenaires selon les maquettes
  const partners = [
    "UP SPORT",
    "MAIRIE 13", 
    "SINE QUA NON",
    "RIGHT TO RUN",
    "VILLE DE PARIS",
    "MOOVE TOI",
    "NOVOSPORTS",
    "LES HIJABEUSES",
    "ALICE MILLIAT ASSO",
    "UFOLEP",
    "FONDATION PILEIE",
    "GREWSING PARIS",
    "FORÇA FOUNDATION",
    "YOGA AND SPORTS",
    "KAINOS ASSO"
  ];
</script>

<div class="partners">
  <div class="container">
    <h1 class="main-title">ASSOCIATIONS PARTENAIRES</h1>
    <p class="description">
      Des associations engagées vous accueillent pour vous faire découvrir leurs actions et partager leur vision d'un sport accessible, humain et ouvert à tous.
    </p>
    
    <div class="partners-list">
      {#each partners as partner}
        <div class="partner-item">
          <span class="partner-name">{partner}</span>
          <div class="arrow">↗</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .partners {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 2rem 0;
  }
  
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Typography */
  .main-title {
    font-family: 'League Gothic', Arial, sans-serif;
    font-size: 36px;
    font-weight: normal;
    color: #2C3E50;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .description {
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 3rem;
  }
  
  /* Partners list */
  .partners-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .partner-item {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .partner-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .partner-name {
    font-family: 'League Gothic', Arial, sans-serif;
    font-size: 24px;
    font-weight: normal;
    color: #2C3E50;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  
  .arrow {
    color: #FF5722;
    font-size: 20px;
    font-weight: bold;
    transition: transform 0.2s;
  }
  
  .partner-item:hover .arrow {
    transform: translate(3px, -3px);
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .container {
      max-width: 400px;
      padding: 0 0.75rem;
    }
    
    .partners {
      padding: 1rem 0;
    }
    
    .main-title {
      font-size: 32px;
    }
    
    .partner-name {
      font-size: 20px;
    }
    
    .partner-item {
      padding: 1.25rem;
    }
  }
</style>
