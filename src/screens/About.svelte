<script>
  export let navigate = () => {};
</script>

<div class="about">
  <!-- À PROPOS DE UP SPORT -->
  <section class="about-up-sport">
    <div class="container">
      <h1 class="main-title">À PROPOS DE UP SPORT</h1>
      <p class="description">
        L'aventure Up Sport ! a débuté il y a 10 ans avec 2 bénévoles et l'idée de rendre le sport accessible aux plus démunis.
      </p>
      
      <h2 class="subsection-title">L'ASSO' EN QUELQUES CHIFFRES</h2>
      <p class="intro-text">
        Fondée à Paris, notre association œuvre chaque jour auprès de personnes en situation de vulnérabilité sociale.
      </p>
      
      <div class="stats-list">
        <div class="stat-item">
          <div class="check-icon">✓</div>
          <span>250 bénéficiaires accompagnés chaque semaine.</span>
        </div>
        <div class="stat-item">
          <div class="check-icon">✓</div>
          <span>30 séances hebdomadaires pour tous les profils.</span>
        </div>
        <div class="stat-item">
          <div class="check-icon">✓</div>
          <span>4 programmes clés : Public exilé, sport au féminin, Activité Physique Adaptée (APA) et insertion professionnelle.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- NOS VALEURS -->
  <section class="values-section">
    <div class="container">
      <h2 class="section-title">NOS VALEURS</h2>
      
      <!-- Illustration handshake en haut à droite -->
      <div class="hands-illustration">
        <img src="/handshake.png" alt="Handshake" class="handshake-img" />
      </div>
      
      <div class="values-tags">
        <span class="value-tag">Citoyenneté</span>
        <span class="value-tag">Bienveillance</span>
        <span class="value-tag">Solidarité</span>
        <span class="value-tag">Mixité</span>
      </div>
      
      <button class="join-button" on:click={() => navigate('contact')}>
        Rejoindre l'asso' ✉
      </button>
    </div>
  </section>

  <!-- SUR LE FESTIVAL -->
  <section class="festival-section">
    <div class="container">
      <h2 class="section-title">SUR LE FESTIVAL</h2>
      <p class="description">
        Solimouv est un festival inclusif organisé par un collectif d'associations, visant à faire du sport un levier de cohésion sociale accessible à tous.
      </p>
    </div>
  </section>

  <!-- SOLIMOUV EN QUELQUES CHIFFRES -->
  <section class="solimouv-stats">
    <div class="container">
      <h2 class="section-title">SOLIMOUV EN QUELQUES CHIFFRES</h2>
      <p class="intro-text">
        Lors de notre dernière édition (Juillet 2025), ce qu'on en retient c'est :
      </p>
      
      <div class="stats-list">
        <div class="stat-item">
          <div class="check-icon">✓</div>
          <span>500+ participants</span>
        </div>
        <div class="stat-item">
          <div class="check-icon">✓</div>
          <span>13 associations sport pour tous</span>
        </div>
        <div class="stat-item">
          <div class="check-icon">✓</div>
          <span>40 bénévoles</span>
        </div>
      </div>
    </div>
  </section>

  <!-- INFOS PRATIQUES -->
  <section class="practical-info">
    <div class="container">
      <div class="info-card">
        <h3 class="info-title">INFOS PRATIQUES :</h3>
        
        <div class="info-item">
          <div class="info-icon location">📍</div>
          <span>Centre Sportif Charles Moureu, 75013 Paris</span>
        </div>
        
        <div class="info-item">
          <div class="info-icon calendar">📅</div>
          <span>Samedi 6 juin 2026 de 10h à 18h</span>
        </div>
        
        <div class="info-item">
          <div class="info-icon accessibility">♿</div>
          <span>Le site est accessible aux personnes à mobilité réduite.<br>
                Entrée gratuite, inscription sur place.</span>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .about {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 2rem 0;
  }
  
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Sections */
  .about-up-sport,
  .values-section,
  .festival-section,
  .solimouv-stats {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .values-section {
    position: relative;
  }
  
  .practical-info {
    margin-bottom: 2rem;
  }
  
  /* Typography */
  .main-title {
    font-family: 'League Gothic', Arial, sans-serif;
    font-size: 40px;
    font-weight: normal;
    color: #2C3E50;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .section-title {
    font-family: 'League Gothic', Arial, sans-serif;
    font-size: 32px;
    font-weight: normal;
    color: #2C3E50;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .subsection-title {
    font-family: 'League Gothic', Arial, sans-serif;
    font-size: 32px;
    font-weight: normal;
    color: #2C3E50;
    margin: 2rem 0 1rem 0;
    text-transform: uppercase;
  }
  
  .description {
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .intro-text {
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  /* Stats list */
  .stats-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
  }
  
  .check-icon {
    background: #FF5722;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
  
  /* Values section */
  .hands-illustration {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 80px;
  }

  .handshake-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .values-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2rem;
    justify-content: center;
  }
  
  .value-tag {
    background: #E8F5E8;
    color: #2C3E50;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 16px;
    font-weight: 500;
  }
  
  .join-button {
    background: #2C3E50;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    transition: all 0.2s;
    width: 100%;
    max-width: 250px;
  }
  
  .join-button:hover {
    background: #34495e;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }
  
  /* Practical info */
  .info-card {
    background: #E8F5E8;
    border-radius: 15px;
    padding: 1.5rem;
  }
  
  .info-title {
    font-family: 'League Gothic', Arial, sans-serif;
    font-size: 32px;
    font-weight: normal;
    color: #2C3E50;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
  
  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
  }
  
  .info-item:last-child {
    margin-bottom: 0;
  }
  
  .info-icon {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
  
  .info-icon.location {
    color: #FF5722;
  }
  
  .info-icon.calendar {
    color: #FF5722;
  }
  
  .info-icon.accessibility {
    color: #FF5722;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .container {
      max-width: 400px;
      padding: 0 0.75rem;
    }
    
    .about {
      padding: 1rem 0;
    }
    
    .about-up-sport,
    .values-section,
    .festival-section,
    .solimouv-stats {
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .main-title {
      font-size: 36px;
    }
    
    .section-title {
      font-size: 28px;
    }
  }
</style>
