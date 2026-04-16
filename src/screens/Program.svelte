<script>
  import SportMatcher from '../components/SportMatcher.svelte';
  
  let showMatcher = false;
  
  // Programme des activités (données d'exemple basées sur l'édition 2025)
  const activities = [
    {
      id: 1,
      name: "Football Inclusif",
      time: "10h00 - 12h00",
      description: "Initiations et matchs adaptés à tous les niveaux. Matériel fourni.",
      accessibility: ["Débutants", "Adapté PMR", "Mixte"],
      organizer: "Up Sport!"
    },
    {
      id: 2,
      name: "Basketball en Fauteuil",
      time: "10h30 - 11h30",
      description: "Découverte du handibasket avec des champions paralympiques.",
      accessibility: ["Tous niveaux", "Handibasket", "Matériel fourni"],
      organizer: "Handi Club Paris"
    },
    {
      id: 3,
      name: "Boxe Éducative",
      time: "11h00 - 12h00",
      description: "Initiation à la boxe française dans le respect et la bienveillance.",
      accessibility: ["Débutants", "8-80 ans", "Mixte"],
      organizer: "Boxing Solidaire"
    },
    {
      id: 4,
      name: "Yoga Adapté",
      time: "09h30 - 10h30",
      description: "Séance de yoga accessible à tous les corps et toutes les mobilités.",
      accessibility: ["Tous niveaux", "Adapté PMR", "Relaxation"],
      organizer: "Yoga Pour Tous"
    },
    {
      id: 5,
      name: "Atelier Premiers Secours",
      time: "14h00 - 15h00",
      description: "Formation aux gestes qui sauvent adaptée à tous les publics.",
      accessibility: ["Pratique", "Certification", "Gratuit"],
      organizer: "Croix Rouge"
    },
    {
      id: 6,
      name: "Danse Hip-Hop Inclusive",
      time: "15h00 - 16h00",
      description: "Expression corporelle et danse urbaine pour tous les styles.",
      accessibility: ["Créativité", "Tous âges", "Énergie"],
      organizer: "Urban Dance Collective"
    },
    {
      id: 7,
      name: "Escalade Adaptée",
      time: "13h00 - 15h00",
      description: "Mur d'escalade avec équipements adaptés et encadrement spécialisé.",
      accessibility: ["Sécurisé", "Adapté PMR", "Débutants"],
      organizer: "Vertical Paris"
    },
    {
      id: 8,
      name: "Tennis de Table",
      time: "10h00 - 17h00",
      description: "Tournoi amical et initiations en continu toute la journée.",
      accessibility: ["Continue", "Tous niveaux", "Intergénérationnel"],
      organizer: "Ping Solidaire"
    }
  ];
  
  const workshops = [
    {
      id: 1,
      name: "Sport et Inclusion",
      time: "16h00 - 17h00",
      description: "Table ronde sur les enjeux du sport inclusif avec témoignages.",
      type: "Conférence"
    },
    {
      id: 2,
      name: "Nutrition du Sportif",
      time: "14h30 - 15h30",
      description: "Conseils nutrition adaptés à chaque pratique et budget.",
      type: "Atelier"
    },
    {
      id: 3,
      name: "Bien-être Mental",
      time: "15h30 - 16h30",
      description: "Sport et santé mentale : témoignages et outils pratiques.",
      type: "Sensibilisation"
    }
  ];
</script>

<div class="program">
  <section class="hero-program">
    <div class="container">
      <h1>Programme Solimouv'</h1>
      <p class="hero-subtitle">
        Une journée complète d'activités sportives inclusives pour tous les goûts et tous les niveaux
      </p>
      <div class="program-info">
        <div class="info-item">
          <strong>📅 Date</strong>
          <span>Juillet 2026 (date à confirmer)</span>
        </div>
        <div class="info-item">
          <strong>📍 Lieu</strong>
          <span>Centre Sportif Charles Moureu, Paris</span>
        </div>
        <div class="info-item">
          <strong>🕘 Horaires</strong>
          <span>9h00 - 18h00</span>
        </div>
        <div class="info-item">
          <strong>🎫 Entrée</strong>
          <span>Gratuite pour tous</span>
        </div>
      </div>
    </div>
  </section>
  
  <section class="sport-finder">
    <div class="container">
      <div class="finder-intro">
        <h2>🎯 Trouvez Votre Sport Idéal</h2>
        <p>
          Pas sûr de quelle activité choisir ? Notre assistant intelligent vous aide à découvrir 
          les sports Solimouv' qui correspondent parfaitement à votre profil !
        </p>
        <button 
          class="btn-finder" 
          on:click={() => showMatcher = !showMatcher}
        >
          {showMatcher ? 'Masquer l\'assistant' : 'Découvrir mes sports 🚀'}
        </button>
      </div>
      
      {#if showMatcher}
        <div class="matcher-container">
          <SportMatcher />
        </div>
      {/if}
    </div>
  </section>
  
  <section class="activities">
    <div class="container">
      <h2>Activités Sportives</h2>
      <p class="section-intro">
        Découvrez notre sélection d'activités sportives adaptées à tous les profils. 
        Chaque activité est encadrée par des professionnels et adaptée aux différents niveaux.
      </p>
      
      <div class="activities-grid">
        {#each activities as activity}
          <div class="activity-card">
            <div class="activity-header">
              <h3>{activity.name}</h3>
              <span class="time">{activity.time}</span>
            </div>
            <p class="description">{activity.description}</p>
            <div class="accessibility-tags">
              {#each activity.accessibility as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
            <div class="organizer">
              <strong>Organisé par :</strong> {activity.organizer}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <section class="workshops">
    <div class="container">
      <h2>Ateliers & Sensibilisation</h2>
      <p class="section-intro">
        Au-delà du sport, participez à nos ateliers de sensibilisation et d'éducation.
      </p>
      
      <div class="workshops-grid">
        {#each workshops as workshop}
          <div class="workshop-card">
            <div class="workshop-type">{workshop.type}</div>
            <h3>{workshop.name}</h3>
            <span class="time">{workshop.time}</span>
            <p>{workshop.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <section class="practical-info">
    <div class="container">
      <h2>Infos Pratiques</h2>
      <div class="info-grid">
        <div class="info-card">
          <h3>🎯 Pour Qui ?</h3>
          <ul>
            <li>Familles avec enfants</li>
            <li>Jeunes et adolescents</li>
            <li>Seniors actifs</li>
            <li>Personnes en situation de handicap</li>
            <li>Débutants en sport</li>
            <li>Communauté LGBTQIA+</li>
          </ul>
        </div>
        
        <div class="info-card">
          <h3>🎒 À Prévoir</h3>
          <ul>
            <li>Tenue de sport confortable</li>
            <li>Bouteille d'eau</li>
            <li>Protection solaire</li>
            <li>Bonne humeur !</li>
          </ul>
          <p><em>Tout le matériel sportif est fourni</em></p>
        </div>
        
        <div class="info-card">
          <h3>♿ Accessibilité</h3>
          <ul>
            <li>Site entièrement accessible PMR</li>
            <li>Activités adaptées disponibles</li>
            <li>Accompagnement personnalisé</li>
            <li>Matériel spécialisé fourni</li>
          </ul>
        </div>
        
        <div class="info-card">
          <h3>🍽️ Restauration</h3>
          <ul>
            <li>Food trucks sur place</li>
            <li>Options végétariennes</li>
            <li>Prix solidaires</li>
            <li>Espace pique-nique</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  
  <section class="cta-program">
    <div class="container">
      <h2>Envie de Participer ?</h2>
      <p>
        L'inscription est gratuite mais recommandée pour nous aider à organiser au mieux votre accueil.
      </p>
      <div class="cta-buttons">
        <button class="btn-primary">
          S'inscrire Gratuitement
        </button>
        <button class="btn-secondary">
          Devenir Bénévole
        </button>
      </div>
    </div>
  </section>
</div>

<style>
  .program {
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero-program {
    background: linear-gradient(135deg, #1B5E20, #4CAF50);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }
  
  .hero-program h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto 3rem;
    line-height: 1.6;
  }
  
  .program-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .info-item {
    background: rgba(255,255,255,0.1);
    padding: 1rem;
    border-radius: 8px;
    text-align: left;
  }
  
  .info-item strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .info-item span {
    font-size: 0.95rem;
    opacity: 0.9;
  }
  
  .activities {
    padding: 4rem 0;
    background: white;
  }
  
  .activities h2 {
    color: #2E7D32;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .section-intro {
    text-align: center;
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto 3rem;
    color: #666;
    line-height: 1.6;
  }
  
  .activities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .activity-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid #2E7D32;
    transition: transform 0.2s;
  }
  
  .activity-card:hover {
    transform: translateY(-4px);
  }
  
  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .activity-header h3 {
    color: #2E7D32;
    font-size: 1.3rem;
    margin: 0;
  }
  
  .time {
    background: #2E7D32;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.85rem;
    font-weight: 600;
  }
  
  .description {
    color: #333;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .accessibility-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tag {
    background: #E8F5E8;
    color: #2E7D32;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .organizer {
    color: #666;
    font-size: 0.9rem;
  }
  
  .workshops {
    padding: 4rem 0;
    background: #f8f9fa;
  }
  
  .workshops h2 {
    color: #2E7D32;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .workshops-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .workshop-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    position: relative;
  }
  
  .workshop-type {
    position: absolute;
    top: -10px;
    right: 1rem;
    background: #4CAF50;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .workshop-card h3 {
    color: #2E7D32;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  .workshop-card .time {
    display: inline-block;
    margin-bottom: 1rem;
    background: #E8F5E8;
    color: #2E7D32;
  }
  
  .practical-info {
    padding: 4rem 0;
    background: white;
  }
  
  .practical-info h2 {
    color: #2E7D32;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .info-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    border-top: 4px solid #4CAF50;
  }
  
  .info-card h3 {
    color: #2E7D32;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .info-card ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;
  }
  
  .info-card li {
    padding: 0.25rem 0;
    color: #333;
    position: relative;
    padding-left: 1.5rem;
  }
  
  .info-card li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #4CAF50;
    font-weight: bold;
  }
  
  .info-card em {
    color: #666;
    font-style: italic;
  }
  
  .cta-program {
    padding: 4rem 0;
    background: #2E7D32;
    color: white;
    text-align: center;
  }
  
  .cta-program h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .cta-program p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-buttons {
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
  
  .sport-finder {
    padding: 4rem 0;
    background: linear-gradient(135deg, #E8F5E8, #F1F8E9);
  }
  
  .finder-intro {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .finder-intro h2 {
    color: #2E7D32;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .finder-intro p {
    color: #666;
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
  
  .btn-finder {
    background: linear-gradient(135deg, #4CAF50, #66BB6A);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  }
  
  .btn-finder:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }
  
  .matcher-container {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    animation: slideDown 0.5s ease;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .hero-program h1 {
      font-size: 2.5rem;
    }
    
    .program-info {
      grid-template-columns: 1fr;
    }
    
    .activities h2,
    .workshops h2,
    .practical-info h2,
    .cta-program h2 {
      font-size: 2rem;
    }
    
    .finder-intro h2 {
      font-size: 2rem;
    }
    
    .matcher-container {
      padding: 1rem;
    }
    
    .activities-grid,
    .workshops-grid {
      grid-template-columns: 1fr;
    }
    
    .activity-header {
      flex-direction: column;
      align-items: start;
    }
    
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .btn-primary,
    .btn-secondary {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
