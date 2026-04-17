<script>
  // Programme des activités selon le nouveau design
  const activities = [
    {
      id: 1,
      name: "HANDBALL",
      day: "Samedi à 10h30",
      type: "Efforts cardio intense",
      color: "orange"
    },
    {
      id: 2,
      name: "INITIATION BOXE MIXTE",
      day: "Samedi à 13h30",
      type: "Sport de contact",
      color: "gray"
    },
    {
      id: 3,
      name: "YOGA DOUX",
      day: "Samedi à 14h30",
      type: "Calme",
      color: "yellow"
    },
    {
      id: 4,
      name: "FOOT & CÉCIFOOT",
      day: "Samedi à 15h30",
      type: "Efforts cardio intense",
      color: "teal"
    },
    {
      id: 5,
      name: "BASKETBALL",
      day: "Samedi à 16h30",
      type: "Efforts cardio intense",
      color: "orange"
    },
    {
      id: 6,
      name: "TAÏ CHI",
      day: "Samedi à 16h30",
      type: "Calme",
      color: "gray"
    },
    {
      id: 7,
      name: "DODGEBALL",
      day: "Samedi à 17h30",
      type: "En groupe",
      color: "yellow"
    },
    {
      id: 8,
      name: "CRICKET",
      day: "Samedi à 18h30",
      type: "En groupe",
      color: "teal"
    }
  ];
</script>

<div class="program">
  <!-- Header orange avec notification -->
  <header class="program-header">
    <div class="container">
      <div class="notification">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span>Football à 10h30</span>
        <span class="notification-text">Rejoins bientôt ta team !</span>
      </div>
    </div>
  </header>

  <!-- Section principale avec titre -->
  <section class="main-hero">
    <div class="container">
      <h1 class="main-title">TOUT LE FESTIVAL,<br>DANS VOTRE POCHE.</h1>
      <p class="subtitle">30 ateliers, 13 associations, 1 seule mission : l'inclusion par le mouvement.</p>
    </div>
  </section>

  <!-- Section Programme -->
  <section class="program-section">
    <div class="container">
      <div class="program-tag">Programme</div>
      <h2 class="section-title">ACTIVITÉS PROPOSÉES PAR NOS ASSOS PARTENAIRES :</h2>
      
      <div class="activities-grid">
        {#each activities as activity}
          <div class="activity-card {activity.color}">
            <!-- Image ziguigui selon la couleur -->
            <div class="ziguigui-container">
              {#if activity.color === 'orange'}
                <img src="/ziguigui_red.png" alt="Ziguigui" class="ziguigui-img" />
              {:else if activity.color === 'gray'}
                <img src="/ziguigui_grey.png" alt="Ziguigui" class="ziguigui-img" />
              {:else if activity.color === 'yellow'}
                <img src="/ziguigui_yellow.png" alt="Ziguigui" class="ziguigui-img" />
              {:else if activity.color === 'teal'}
                <img src="/ziguigui_blue.png" alt="Ziguigui" class="ziguigui-img" />
              {/if}
            </div>
            
            <div class="card-tags">
              <div class="tag time-tag">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
                </svg>
                {activity.day}
              </div>
              <div class="tag type-tag">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2"/>
                </svg>
                {activity.type}
              </div>
            </div>
            
            <h3 class="activity-name">{activity.name}</h3>
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=League+Gothic:wght@400;700&family=Poppins:wght@400;500;600;700;900&display=swap');
  
  .program {
    min-height: 100vh;
    background: white;
    font-family: 'Poppins', sans-serif;
  }
  
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Header orange avec notification */
  .program-header {
    background: #FF5722;
    padding: 1rem 0;
    border-radius: 0 0 30px 30px;
  }
  
  .notification {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  
  .notification svg {
    stroke: white;
  }
  
  .notification-text {
    margin-left: auto;
  }
  
  /* Section principale */
  .main-hero {
    padding: 3rem 0 2rem;
    text-align: center;
  }
  
  .main-title {
    font-family: 'League Gothic', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #2C3E50;
    line-height: 1.1;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin: 0 0 1.5rem 0;
  }
  
  .subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #666;
    line-height: 1.5;
    margin: 0;
  }
  
  /* Section Programme */
  .program-section {
    padding: 2rem 0;
  }
  
  .program-tag {
    background: #FF5722;
    color: white;
    display: inline-block;
    padding: 8px 20px;
    border-radius: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-family: 'League Gothic', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #2C3E50;
    line-height: 1.2;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin: 0 0 2rem 0;
  }
  
  /* Grille des activités */
  .activities-grid {
    display: grid;
    gap: 1rem;
  }
  
  /* Cartes d'activités */
  .activity-card {
    background: #2C3E50;
    border-radius: 20px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  /* Couleurs des cartes */
  .activity-card {
    background: #2C3E50;
    position: relative;
  }

  /* Container pour les images ziguigui */
  .ziguigui-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 0 20px 0 0;
  }

  .ziguigui-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Tags des cartes */
  .card-tags {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
    align-items: flex-start;
  }
  
  .tag {
    background: rgba(255,255,255,0.9);
    color: #2C3E50;
    padding: 8px 12px;
    border-radius: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .tag svg {
    stroke: #2C3E50;
    flex-shrink: 0;
  }
  
  /* Nom de l'activité */
  .activity-name {
    font-family: 'League Gothic', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: white;
    line-height: 1.1;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin: 0;
    position: relative;
    z-index: 3;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }
    
    .main-title {
      font-size: 28px;
    }
    
    .section-title {
      font-size: 28px;
    }
    
    .activity-name {
      font-size: 22px;
    }
    
    .tag {
      font-size: 14px;
      padding: 6px 10px;
    }
  }
  
  @media (min-width: 768px) {
    .container {
      max-width: 600px;
    }
    
    .activities-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
</style>
