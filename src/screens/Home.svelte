<script>
  export let navigate;
</script>

<div class="home">
  <!-- Header avec message de bienvenue -->
  <section class="welcome-header">
    <div class="container">
      <h1 class="welcome-title">BIENVENUE À SOLIMOUV LUCAS !</h1>
      <p class="welcome-subtitle">
        L'événement où chaque pas, chaque mouvement, est un prétexte pour créer du lien.
      </p>
    </div>
  </section>

  <!-- Section UP TEAM -->
  <section class="up-team">
    <div class="container">
      <div class="up-team-card">
        <div class="up-team-content">
          <h2 class="up-team-title">UP TEAM</h2>
          <div class="handshake-illustration">
            <img src="/handshake.png" alt="Handshake" class="handshake-img" />
          </div>
          <p class="up-team-description">
            Ne craignez plus d'arriver seul ou de ne pas savoir où aller. 
            Nous vous matchons avec un petit groupe de participants.
          </p>
          <button class="btn-team" on:click={() => navigate('team-matcher')}>
            <span>👥</span> Trouver ma Team
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Section Programme -->
  <section class="program-section">
    <div class="container">
      <div class="section-tag">Le programme</div>
      <h2 class="section-title">BOUGER, À VOTRE RYTHME</h2>
      <p class="section-subtitle">Découvrez le programme et nos activités !</p>
      
      <div class="program-cards">
        <div class="program-card">
          <div class="program-time">
            <span>🕒</span> Aujourd'hui à 13h30
          </div>
          <div class="program-content">
            <h3>INITIATION BOXE MIXTE</h3>
            <div class="program-arrow">↗</div>
          </div>
        </div>
        
        <div class="program-card">
          <div class="program-time">
            <span>🕒</span> Aujourd'hui à 15h00
          </div>
          <div class="program-content">
            <h3>YOGA DOUX</h3>
            <div class="program-arrow">↗</div>
          </div>
        </div>
      </div>
      
      <button class="btn-program" on:click={() => navigate('program')}>
        Voir le programme <span>↗</span>
      </button>
    </div>
  </section>

  <!-- Section Associations Partenaires -->
  <section class="partners-section">
    <div class="container">
      <div class="section-tag">Associations partenaires</div>
      <h2 class="section-title">DERRIÈRE CHAQUE SPORT, UNE MAIN TENDUE.</h2>
      <p class="section-description">
        Le festival est propulsé par un réseau d'associations passionnées. 
        Découvrez les acteurs qui œuvrent au quotidien pour l'inclusion sociale et la mixité à Paris.
      </p>
      
      <div class="partner-buttons">
        <button class="btn-partner-primary">
          UP SPORT! <span>↗</span>
        </button>
        <button class="btn-partner-secondary">
          MAIRIE 13
        </button>
      </div>
      
      <button class="btn-discover" on:click={() => navigate('partners')}>
        Découvrir les assos' <span>↗</span>
      </button>
    </div>
  </section>

  <!-- Section À propos UP Sport -->
  <section class="about-up-sport">
    <div class="container">
      <div class="section-tag">À propos de UP Sport</div>
      <h2 class="section-title">L'ASSOCIATION SPORT POUR TOUS À PARIS.</h2>
      <p class="section-description">
        Depuis 2016, l'association Up Sport! accompagne chaque semaine plus de 250 
        personnes en situation de vulnérabilité. Pour nous, le sport n'est pas une 
        compétition, c'est un outil de citoyenneté et de bienveillance.
      </p>
      
      <div class="image-container">
        <div class="sport-image">
          <img src="/aboutupsport.png" alt="Up Sport" class="sport-img" />
          <div class="yellow-wave"></div>
        </div>
      </div>
      
      <button class="btn-learn-more" on:click={() => navigate('about')}>
        En savoir plus <span>↗</span>
      </button>
    </div>
  </section>

  <!-- Section Festival Solimouv -->
  <section class="about-festival">
    <div class="container">
      <div class="section-tag">À propos du Festival Solimouv</div>
      <h2 class="section-title">RENDRE LE SPORT ACCESSIBLE À TOUTES ET TOUS.</h2>
      <p class="section-description">
        Solimouv' est le festival du sport pour tous, organisé par Up Sport! et un collectif 
        d'associations parisiennes. La 1ère édition a rassemblé plus de 500 participants, 
        13 associations partenaires et une quarantaine de bénévoles.
      </p>
      
      <div class="image-container">
        <div class="accessibility-image">
          <img src="/aboutupsolimouv.png" alt="Solimouv" class="accessibility-img" />
          <div class="yellow-wave"></div>
        </div>
      </div>
      
      <button class="btn-learn-more" on:click={() => navigate('about')}>
        En savoir plus <span>↗</span>
      </button>
    </div>
  </section>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=League+Gothic:wght@400;700&family=Poppins:wght@400;500;600;700;900&display=swap');
  
  .home {
    background: white;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
  }

  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Desktop Container */
  @media (min-width: 769px) {
    .container {
      max-width: 1200px;
      padding: 0 2rem;
    }
  }

  @media (min-width: 1200px) {
    .container {
      max-width: 1400px;
      padding: 0 4rem;
    }
  }

  /* Welcome Header */
  .welcome-header {
    background: white;
    padding: 1rem 0;
  }

  .welcome-title {
    font-family: 'League Gothic', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
    line-height: 1.1;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .welcome-subtitle {
    font-size: 16px;
    color: #4a4a4a;
    line-height: 1.4;
    margin: 0 0 2rem 0;
  }

  /* UP Team Section */
  .up-team {
    margin-bottom: 2rem;
  }

  .up-team-card {
    background: #E8F4E8;
    border-radius: 16px;
    padding: 1.5rem;
    position: relative;
  }

  .up-team-title {
    font-family: 'League Gothic', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 2rem 0;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .handshake-illustration {
    position: absolute;
    top: 0;
    right: 0;
    width: 140px;
    height: 100px;
  }

  .handshake-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .up-team-description {
    font-size: 16px;
    color: #4a4a4a;
    margin: 0 0 2rem 0;
    line-height: 1.4;
    max-width: 220px;
  }

  .btn-team {
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .btn-team:hover {
    transform: translateY(-1px);
    background: #000;
  }

  /* Program Section */
  .program-section {
    margin-bottom: 2rem;
  }

  .section-tag {
    background: #FF5722;
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .section-title {
    font-family: 'League Gothic', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
    line-height: 1.2;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .section-subtitle {
    font-size: 16px;
    color: #4a4a4a;
    margin: 0 0 1.5rem 0;
  }

  .program-cards {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .program-card {
    background: #2C3E50;
    color: white;
    border-radius: 16px;
    padding: 1rem;
    min-width: 260px;
    flex-shrink: 0;
  }

  .program-time {
    font-size: 0.85rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .program-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .program-content h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    max-width: 180px;
  }

  .program-arrow {
    font-size: 1.2rem;
    margin-left: 1rem;
  }

  .btn-program {
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .btn-program:hover {
    transform: translateY(-1px);
    background: #000;
  }

  /* Partners Section */
  .partners-section {
    margin-bottom: 2rem;
  }

  .section-description {
    font-size: 16px;
    color: #4a4a4a;
    line-height: 1.4;
    margin: 0 0 1.5rem 0;
  }

  .partner-buttons {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .btn-partner-primary {
    background: #E8F4E8;
    color: #1a1a1a;
    border: none;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    flex: 1;
    justify-content: center;
  }

  .btn-partner-secondary {
    background: #f5f5f5;
    color: #1a1a1a;
    border: none;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    flex: 1;
    justify-content: center;
  }

  .btn-discover {
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .btn-discover:hover {
    transform: translateY(-1px);
    background: #000;
  }

  /* About Sections */
  .about-up-sport,
  .about-festival {
    margin-bottom: 2rem;
  }

  .image-container {
    margin: 1.5rem 0;
  }

  .sport-image,
  .accessibility-image {
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    border-radius: 16px;
    height: 180px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sport-img,
  .accessibility-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    position: relative;
    z-index: 2;
  }

  .yellow-wave {
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 120px;
    height: 120px;
    background: #FFD54F;
    border-radius: 50%;
    z-index: 1;
  }

  .btn-learn-more {
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .btn-learn-more:hover {
    transform: translateY(-1px);
    background: #000;
  }

  /* Desktop responsive */
  @media (min-width: 769px) {
    /* Global section boxes */
    .welcome-header,
    .up-team,
    .program-section,
    .partners-section,
    .about-up-sport,
    .about-festival {
      background: white;
      margin-bottom: 3rem;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border: 1px solid rgba(224, 224, 224, 0.3);
    }

    /* Welcome section enhancement */
    .welcome-header {
      padding: 5rem 0 4rem;
      background: linear-gradient(135deg, #f8fffe 0%, #f0f9f0 100%);
    }

    .welcome-title {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #1a1a1a 0%, #2C3E50 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
    }

    .welcome-subtitle {
      font-size: 1.25rem;
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem;
      color: #2C3E50;
    }

    /* Section title improvements */
    .section-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .section-tag {
      display: block;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .section-description {
      text-align: center;
      max-width: 600px;
      margin: 0 auto 3rem;
      font-size: 1.1rem;
    }

    /* UP Team section */
    .up-team {
      padding: 4rem;
    }

    .up-team-card {
      padding: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      max-width: 1000px;
      margin: 0 auto;
      position: relative;
      background: #E8F4E8;
    }

    .up-team-content {
      order: 1;
      padding: 2rem;
    }

    .handshake-illustration {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 160px;
      height: 120px;
      z-index: 10;
    }

    .up-team-title {
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    .up-team-description {
      font-size: 1.2rem;
      max-width: 350px;
      margin-bottom: 3rem;
    }

    .btn-team {
      font-size: 1.1rem;
      padding: 1rem 2rem;
    }

    /* Program section */
    .program-section {
      padding: 4rem;
    }

    .program-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .program-card {
      min-width: auto;
      padding: 2rem;
    }

    /* Partners section */
    .partners-section {
      padding: 4rem;
    }

    .partner-buttons {
      max-width: 500px;
      margin: 0 auto 3rem;
    }

    /* About sections layout */
    .about-up-sport,
    .about-festival {
      padding: 4rem;
    }

    .about-up-sport .container,
    .about-festival .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-up-sport .image-container,
    .about-festival .image-container {
      margin: 0;
    }

    .sport-image,
    .accessibility-image {
      height: 350px;
    }

    /* Button center alignment */
    .btn-program,
    .btn-discover,
    .btn-learn-more {
      display: block;
      margin: 0 auto;
      font-size: 1.1rem;
      padding: 1rem 2.5rem;
    }
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    /* Section boxes enhanced */
    .welcome-header,
    .up-team,
    .program-section,
    .partners-section,
    .about-up-sport,
    .about-festival {
      padding: 5rem;
      margin-bottom: 4rem;
      border-radius: 25px;
    }

    .welcome-title {
      font-size: 4rem;
    }
    
    .section-title {
      font-size: 3rem;
    }

    .up-team-card {
      padding: 0;
    }

    .handshake-illustration {
      top: 30px;
      right: 30px;
      width: 180px;
      height: 140px;
    }

    .program-cards {
      max-width: 1000px;
    }

    .about-up-sport .container,
    .about-festival .container {
      gap: 6rem;
    }
  }
</style>
