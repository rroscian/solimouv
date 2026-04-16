<script>
  export let navigate;
</script>

<div class="home">
  <section class="hero">
    <div class="hero-content">
      <h1>Solimouv'</h1>
      <h2>Le Festival du Sport pour Tous</h2>
      <p class="hero-description">
        Un événement inclusif qui rassemble toutes les communautés autour du sport. 
        Découvrez des activités adaptées à tous les profils et toutes les capacités.
      </p>
      <div class="hero-buttons">
        <button class="btn-primary" on:click={() => navigate('team-matcher')}>
          🤝 Trouvez votre équipe
        </button>
        <button class="btn-primary" on:click={() => navigate('program')}>
          Découvrir le Programme
        </button>
        <button class="btn-secondary" on:click={() => navigate('about')}>
          En Savoir Plus
        </button>
      </div>
    </div>
  </section>
  
  <section class="highlights">
    <div class="container">
      <h2>Pourquoi Solimouv' ?</h2>
      <div class="highlights-grid">
        <div class="highlight-card">
          <div class="highlight-icon">🏃‍♀️</div>
          <h3>Sport Inclusif</h3>
          <p>Des activités adaptées à tous les niveaux, tous les âges et toutes les capacités.</p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">🤝</div>
          <h3>Mixité & Solidarité</h3>
          <p>Un espace de rencontre qui rassemble toutes les communautés dans le respect.</p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">🎯</div>
          <h3>Découverte</h3>
          <p>85% des participants découvrent de nouvelles activités ou associations.</p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">❤️</div>
          <h3>Bienveillance</h3>
          <p>Un environnement bienveillant où chacun peut s'épanouir à son rythme.</p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="stats">
    <div class="container">
      <h2>L'édition 2025 en chiffres</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">500+</div>
          <div class="stat-label">Participants</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">13</div>
          <div class="stat-label">Associations</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">92%</div>
          <div class="stat-label">Veulent revenir</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">40</div>
          <div class="stat-label">Bénévoles</div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="cta">
    <div class="container">
      <h2>Rejoignez l'aventure Solimouv'</h2>
      <p>Que vous soyez participant, bénévole ou association, il y a une place pour vous.</p>
      <button class="btn-primary" on:click={() => navigate('contact')}>
        Nous Contacter
      </button>
    </div>
  </section>
</div>

<style>
  .home {
    min-height: 100vh;
  }
  
  .hero {
    background: linear-gradient(135deg, #2E7D32, #4CAF50);
    color: white;
    padding: 4rem 1rem;
    text-align: center;
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .hero-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }
  
  .hero-description {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: white;
    color: #2E7D32;
  }
  
  .btn-primary:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }
  
  .btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
  }
  
  .btn-secondary:hover {
    background: white;
    color: #2E7D32;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .highlights {
    padding: 4rem 0;
    background: #f8f9fa;
  }
  
  .highlights h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    color: #2E7D32;
  }
  
  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .highlight-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.2s;
  }
  
  .highlight-card:hover {
    transform: translateY(-4px);
  }
  
  .highlight-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .highlight-card h3 {
    color: #2E7D32;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
  
  .stats {
    padding: 4rem 0;
    background: #2E7D32;
    color: white;
  }
  
  .stats h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
  
  .stat-card {
    text-align: center;
    padding: 2rem;
  }
  
  .stat-number {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .cta {
    padding: 4rem 0;
    text-align: center;
    background: white;
  }
  
  .cta h2 {
    font-size: 2.5rem;
    color: #2E7D32;
    margin-bottom: 1rem;
  }
  
  .cta p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2.5rem;
    }
    
    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .btn-primary,
    .btn-secondary {
      width: 100%;
      max-width: 300px;
    }
    
    .highlights h2,
    .stats h2,
    .cta h2 {
      font-size: 2rem;
    }
  }
</style>
